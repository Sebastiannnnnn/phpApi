(function() {
	'use strict';

	$(document).ready(function() {
		init();
	});

	function init() {
		bindEvents();
	}

	function bindEvents() {
		$('body')
			.on('click.search', '#search .init', function(e) {
				e.preventDefault();
				var el = $(this),
					value = getData(el) || 0;

				calculatePrimeNumber(el, encodeURIComponent(value));
			})
			.on('click.list', '#list .init', function(e) {
				e.preventDefault();
				var el = $(this);
				var value = $(this).parent().find('input').val();
				getListOfPrimeNumbers(el, value);
			})
			.on('click.between', '#between .init', function(e) {
				e.preventDefault();
				var el = $(this),
					limits = getData(el);

				searchBetweenNumbers(el, limits);
			})
			.on('click.clear', '.clear', function(e) {
				e.preventDefault();
				clear(this);
			});
	}

	/**
	 * Prepare query to check for a prime number 
	 * @param  {jQuery Object} el - clicked element
	 * @param  {String} val - input value
	 */
	function calculatePrimeNumber(el, val) {
		var req = {
			url: "http://localhost/rest/search?calc=" + val,
			method: "GET",
			dataType: "json",
			success: function(res) {
				clearInput(el);
				printMessage(res);
			},
			error: function(xhr, textStatus, errorThrown) {
				console.log(xhr);
			}
		};
		$.ajax(req);
	}

	/**
	 * Prepare query to request X number of prime numbers
	 * @param  {jQuery Object} el - clicked element
	 * @param  {String} val - input value
	 */
	function getListOfPrimeNumbers(el, val) {
		var req = {
			url: "http://localhost/rest/list/?amount=" + val,
			method: "GET",
			dataType: "json",
			success: function(res) {
				clearInput(el);
				print(el, res);
			},
			error: function(xhr, textStatus, errorThrown) {
				console.log(xhr);
			}
		};
	    $.ajax(req);
	}

	/**
	 * Prepare query to request prime numbers that reside between two numbers
	 * @param  {jQuery Object} el - clicked element
	 * @param  {String} val - input value
	 */
	function searchBetweenNumbers(el, limits) {
		var req = {
			url: "http://localhost/rest/between/?start=" + limits[0] + '&end=' + limits[1],
			method: "GET",
			dataType: "json",
			success: function(res) {
				clearInput(el);
				print(el, res);
			},
			error: function(xhr, textStatus, errorThrown) {
				console.log(xhr);
			}
		};
		$.ajax(req);
	}

	/**
	 * Get input data to array
	 * @param  {jQuery Object} el - clicked element
	 * @return {Array} containing numbers;
	 */
	function getData(el) {
		var inputs = $(el).closest('.row').find('input');

		return $.map(inputs, function(key) {
			return _.escape($(key).val());
		});
	}

	/**
	 * Clear inputs from text
	 * @param  {jQuery Object} el - clicked element
	 */
	function clearInput(el) {
		$(el).closest('.row').find('input').each(function(key, val) {
			$(val).val('');
		});
	}

	/**
	 * Print message after getting response
	 * @param  {Object} res - response from server
	 */
	function printMessage(res) {
		var el = document.createElement("span");
	    var text = document.createTextNode(res.message);
	    el.appendChild(text);
	    el.className = res.prime ? 'success' : 'failure';

		$('.message').html('').append(el);
	}

	/**
	 * Clear the section in question
	 * @param  {DOM element} el - clicked element´´
	 */
	function clear(el) {
		var wrapper = $(el).closest('.item');
		wrapper.find('.head').html('');
		wrapper.find('.body').html('');
	}

	/**
	 * Print head and body section
	 * @param  {jQuery Object} el - clicked element
	 * @param  {Object} res - data
	 */
	function print(el, res) {
		printListHead(el, res);
		printListBody(el, res);
	}

	/**
	 * Print head section
	 * @param  {jQuery Object} el - clicked element
	 * @param  {Object} res - data
	 */
	function printListHead(el, res) {
		var type = (Boolean(res.length) ? 'success' : 'failure'),
			head = '<span class="' + type + '">You got ' + res.length + ' results!</span>';

		el.closest('.item')
			.find('.head')
			.html('')
			.append(head);
	}

	/**
	 * Print body section of the entry
	 * @param  {jQuery Object} el - clicked element
	 * @param  {Object} res - data
	 */
	function printListBody(el, res) {
		el.closest('.item').find('.body').html('');
		if (res.length) {
			var list = '<ul><li>' + res.join('</li><li>') + '</ul></li>';
			el.closest('.item')
				.find('.body')
				.html('')
				.append(list);
		}
	}

})();
