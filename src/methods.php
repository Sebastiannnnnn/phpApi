<?php

/**
 * Check whether number is prime or not
 * @param  [Integer]
 * @return boolean
 */
function isPrimeNumber($value) {
    for ($i = 2; $i < $value; $i++) {
        if ($value % $i === 0) {
            return false;
        }
    }
    return $value > 1 ? true : false;
}

/**
 * Increment base value
 * @param  [Integer]
 * @param  [Integer]
 * @return [Integer]
 */
function increment($a, $b) {
	return $a + $b;
}

/**
 * Decrement base value
 * @param  [Integer]
 * @param  [Integer]
 * @return [Integer]
 */
function decrement($a, $b) {
	return $a - $b;
}

/**
 * Multiply base value
 * @param  [Integer]
 * @param  [Integer]
 * @return [Integer]
 */
function multiply($a, $b) {
	return $a * $b;
}

/**
 * Divide base value
 * @param  [Integer]
 * @param  [Integer]
 * @return [Integer]
 */
function divide($a, $b) {
	return $a / $b;
}

/**
 * Choose operator for the calculation
 * @param  [String] operator - + | - | * | /
 * @return [String] function name
 */
function chooseOperator($operator) {
	switch ($operator) {
		case '+':
			return 'increment';
		case '-':
			return 'decrement';
		case '*';
			return 'multiply';
		case '/':
			return 'divide';
	}
}

/**
 * Validate pattern for the calculation procedure
 * @param  [String] $procedure - calculation procedure
 * @return [Boolean]
 */
function validateCalculation($procedure) {
	$pattern = '/^([\d]+?(\b[\+|\-|\*|\/]\b)?)+$/';
	$test = preg_match($pattern, $procedure);
	if (!$test) {
		return true;
	}
}

/**
 * Break calculation procedure to array and calculate it
 * @param  [String] $result - valid calculation procedure
 * @return [Number]
 */
function calculateTotal($result) {
	// Splice String into array
	preg_match_all('/([\d]+|[+-\/\*])/', $result, $matches);
	// Assign subarray to a list variable
	$list = $matches[0];
	// Set first entry to a variable
	$total = $list[0];
	for ($i = 0; $i < count($list); $i++) {
		// Match operators
		if (!is_numeric($list[$i])) {
			$total = call_user_func(
				chooseOperator($list[$i]),
				$total,
				$list[$i + 1]
			);
		}
	}
	return $total;
}

/**
 * Check whether number is a prime number
 * @return [json] array
 */
function primeNumberCheck() {
	if (isset($_GET['calc'])) {
		// Get url parameter calc
		$result = rawurldecode($_GET['calc']);

		$error = validateCalculation($result);

		if (!$error) {		
			$total = calculateTotal($result);

			$result = array(
				'value' => $total,
				'prime' => isPrimeNumber($total),
				'message' => 'Number ' . $total . ' is ' . (!isPrimeNumber($total) ? 'not' : '') . ' a prime number'
			);

		} else {
			$result = array(
				'prime' => false,
				'message' => 'The search criteria was invalid'
			);
		}
		return json_encode($result);
	}
}

/**
 * List X amount of prime numbers (restricted to 999)
 * @return [json] array
 */
function listPrimeNumbers() {
	$numb = array();
	if (isset($_GET['amount']) && is_numeric($_GET['amount'])) {
		$amount = $_GET['amount'];
		if ($amount == 0) {
			return false;
		}

		if ($amount > 999) {
			$amount = 999;
		} 
		
	    $i = 0;
	    while(count($numb) <= ($amount - 1)) {
	        if (isPrimeNumber($i) == true) {
	            $numb[] = $i;
	        }
	        $i++;
	    }
	}
	return json_encode($numb);
}

/**
 * Search prime numbers between start and end position
 * @return [json] array
 */
function primeNumbersBetween() {
	$numb = array();
	if (isset($_GET['start']) && is_numeric($_GET['start'])
		&& isset($_GET['end']) && is_numeric($_GET['end'])) {

		$start = $_GET['start'];
		$end = $_GET['end'];

		if ($start == $end) {
			if (isPrimeNumber($start) == true) {
	            $numb[] = $start;
	        }
		} else if ($start < $end) {
			for ($i = $start; $i < $end; $i++) {
				if (isPrimeNumber($i) == true) {
		            $numb[] = $i;
		        }
			}
		}
	}
	return json_encode($numb);
}

?>