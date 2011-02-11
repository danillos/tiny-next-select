TinyNextSelect
===========

Simple and tiny plugin for load data for a next select. (Mootools)


![Screenshot](http://www.danillocesar.com.br/images/labs/tinynextselect.png)


How to use
----------

Include on page:

	<script src="mootools-core.js" type="text/javascript"></script>
	<script src="tiny_next_select.js" type="text/javascript"></script>

Simple example:

	// Javascript
	window.addEvent('domready',function() {
		
		$('simple_contries').tinyNextSelect({
			next: $('simple_states'),
			url: 'data_states.php'
		})
		
	});

Html:
	
	<!-- HTML -->
	<label for="">Country:</label>
	<select id="simple_contries">
		<option value=''>Select your country</option>
		<option value='1'>Country 1</option>
		<option value='2'>Country 2</option>
	</select>

	<br>

	<label for="">State:</label>
	<select id="simple_states">
			<option>Select country first</option>
	</select>
	
Server Side PHP:
	
	<?php
		// value from selected option
		$value = $_GET['value'];
		// echo <option>...</option>
		//..
	?>

	
See Demo and Documentation for more detail.

[DEMO](http://www.danillocesar.com.br/labs/tiny-next-select "TinyNextSelect DEMO") | [DOCUMENTATION](http://github.com/danillos/tinyalert/blob/master/Docs/TinyNextSelect.md "View Documentation") | [DOWNLOAD](http://github.com/danillos/tinynextselect/downloads)