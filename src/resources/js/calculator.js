(function() {
	'use strict';

	$(document).ready(function() {
		var namespace = '.calculator';
		var calc = new Calculator();
		calc.init();
		
	})

	/**
	 * Simple calculator
	 */
	function Calculator() {
		this.value = 0;
		this.string = '';
		this.pattern = /[?\(\d\.?\)]+|[+-\\*\\/]/mig;
		this.screen = document.getElementById('screen');
		this.namespace = '.calculator';
		this.turn = true;

		this.init = function() {
			this.bindButtons();
		},

		/**
		 * Bind events for the Calculator
		 */
		this.bindButtons = function() {
			var self = this;
			$('body')
				.on('click' + this.namespace, '#total', function() {
					self.calculate();
				})
				.on('click' + this.namespace, '#undo', function() {
					self.undo();
				})
				.on('click' + this.namespace, '#clear', function() {
					self.clear();
				})
				.on('click' + this.namespace, '#dot', function() {
					self.dot(this);
				})
				.on('click' + this.namespace, '.operator', function() {
					self.setOperator(this.innerHTML);
				})
				.on('click' + this.namespace, '.int', function() {
					self.setInteger(this.innerHTML);
				})
				.on('keydown' + this.namespace, function(event) {
					self.numpadEvents(event);					
				});
		},

		/**
		 * Numeric pad events for calculator
		 * @param  {Object} event
		 */
		this.numpadEvents = function(e) {
			if (e.which >= 96 && e.which <= 105) {
				this.setInteger(e.which - 96);
			} else if (e.which === 106 || e.which === 107 || e.which === 109 || e.which === 111) {
				this.setOperator(e.key);
			} else if (e.which === 13) {
				this.calculate();
			} else if (e.which === 27) {
				this.clear();
			} else if (e.which === 8) {
				this.undo();
			} else if (e.which === 110) {
				this.dot();
			}
		},

		/**
		 * Calculate given string without eval
		 */
		this.calculate = function() {
			if (this.string) {
				var last = this.string.substring(this.string.length, this.string.length - 1);
				if (!this.isOperator(last)) {
					var array = this.string.match(this.pattern),
						total = this.string,
						method;

					for (var i = array.length - 1; i >= 0; i--) {
						if (isNaN(array[i])) {
							method = this.determineOperator(array[i]);
							total = method(total, array[i + 1]);
						}
					}

					this.turn = false;
					this.string = total.toString();
					this.print();
				}
			}
		},

		/**
		 * Remove one character from end of the string
		 */
		this.undo = function() {
			if (this.string.length) {
				this.turn = true;
				this.string = this.string.substring(0, this.string.length - 1);
				this.print();
			}
		},

		/**
		 * Clear all the data
		 */
		this.clear = function() {
			this.turn = true;
			this.string = '';
			this.screen.value = '';
		},

		/**
		 * Add dot to the calculation
		 */
		this.dot = function() {
			if (this.string.length) {
				var array = this.string.match(this.pattern),
					last = array[array.length - 1];
					inIt = last.includes('.');

				if (inIt) {
					this.string = this.string.substring(0, this.string.length - 1);
				}
			}

			this.turn = true;
			this.set('.');
			this.print();
		},

		/**
		 * Add any numeric value to the calculation
		 * @param  {String|Integer} value
		 */
		this.setInteger = function(value) {
			this.turn ? this.set(value) : this.string = value;
			this.turn = true;
			this.print();
		},

		/**
		 * Add operator to the calculation
		 * @param {String} value
		 */
		this.setOperator = function(value) {
			if (this.string.length > 0) {
				var last = this.string.substring(this.string.length, this.string.length - 1);
				if (this.isOperator(last)) {
					this.string = this.string.substring(0, this.string.length - 1);
				}

				var operator = value;
				this.turn = true;
				this.set(operator);
				this.print()
			}
		},

		/**
		 * Check whether the given value is operator
		 * @param  {String}  o - operator
		 * @return {Array|null}
		 */
		this.isOperator = function(o) {
			return o.match(/[\+\-\*\/]/);
		},

		/**
		 * Choose correct function for each operator
		 * @param  {String} o - operator
		 * @return {Function}
		 */
		this.determineOperator = function(o) {
			if (o === "+") {
				return this.plus;
			} else if (o === "-") {
				return this.minus;
			} else if (o === "*") {
				return this.multiply;
			} else if (o === "/") {
				return this.divide;
			}
		},

		/**
		 * Set string value
		 * @param {String} char - given character
		 */
		this.set = function(char) {
			this.string += char.toString();
		},

		/**
		 * Print calculated value or computational operation to screen
		 */
		this.print = function() {
			var string = '';
			if (this.string.length > 0) {
				var array = this.string.match(this.pattern);
				string = array.join(' ');
			}
			this.screen.value = string;
		},

		this.plus = function(a, b) {
			return parseFloat(a) + parseFloat(b);
		},

		this.minus = function(a, b) {
			return parseFloat(a) - parseFloat(b);
		},

		this.multiply = function(a, b) {
			return parseFloat(a) * parseFloat(b);
		},

		this.divide = function(a, b) {
			return parseFloat(a) / parseFloat(b);
		}
	}

})();
