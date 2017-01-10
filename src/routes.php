<?php

Flight::route('GET /', function(){
    echo define('ROOTPATH', __DIR__);
});

Flight::route('GET /calculator', function(){
	include './src/templates/calculator.php';
});

Flight::route('GET /primenumber', function(){
	include './src/templates/primenumber.php';
});

Flight::route('GET /rest/search', function(){
	echo primeNumberCheck();
});

Flight::route('GET /rest/list', function(){
	echo listPrimeNumbers();
});

Flight::route('GET /rest/between', function(){
	echo primeNumbersBetween();
});

?>