$(document).ready(function() {

	console.log("Ready");

	insertColon();

})

// Calculate the hours available for the day
function calculateTime(day) {

	// variables for hours available
	var available = 0;
	var available1 = 0;

	// first availability slot
	var From = $('#' + day + 'From')[0].value;
	var To = $('#' + day + 'To')[0].value;

	// second availability slot
	var From1 = $('#' + day + 'From1')[0].value;
	var To1 = $('#' + day + 'To1')[0].value;

	// if both fields in first availability slot are filled in
	if(From != 0 && To != 0) {

		// split time into two parts, hours and minutes
		From = From.split(":");
		To = To.split(":");

		if(From[0] == "" || To[0] == "") {
			available = 0;
		}
		else {
			// if toggle is flipped to PM, add 12 to hours
			if($('#' + day + 'FromToggle').is(":checked")) {
				From[0] = parseInt(From[0]) + 12;
			}
			if($('#' + day + 'ToToggle').is(":checked")) {
				To[0] = parseInt(To[0]) + 12;
			}

			var fromDate = new Date(0, 0, 0, From[0], From[1] || 0, 0);
			var toDate = new Date(0, 0, 0, To[0], To[1] || 0, 0);

			// calculate diference in time
			var diff = toDate.getTime() - fromDate.getTime();

			// Make sure time difference is positive, else 0
			if (diff < 0) diff = 0;

			var hours = diff/ 1000/ 60/ 60;
			available = round(hours, 2);
		}
	}

	// if second availability slot is filled in
	if(From1 != 0 && To1 != 0) {

		From1 = From1.split(":");
		To1 = To1.split(":");

		if(From1[0] == "" || To1[0] == "") {
			available1 = 0;
		}
		else {
			if($('#' + day + 'From1Toggle').is(":checked")) {
				From1[0] = parseInt(From1[0]) + 12;
			}
			if($('#' + day + 'To1Toggle').is(":checked")) {
				To1[0] = parseInt(To1[0]) + 12;
			}

			var from1Date = new Date(0, 0, 0, From1[0], From1[1] || 0, 0);
			var to1Date = new Date(0, 0, 0, To1[0], To1[1] || 0, 0);

			var diff1 = to1Date.getTime() - from1Date.getTime();

			if(diff1 < 0) diff1 = 0;

			var hours1 = diff1/ 1000 / 60 / 60;
			available1 = round(hours1, 2);
		}
	}

	// Apply special style if hour(s) = 0
	if(available + available1 == 0) {
		$('#' + day + 'Line').addClass('greyedout');
		$('#' + day + 'Hour').text("hours");
	}
	else {
		$('#' + day + 'Line').removeClass('greyedout');
		if(available + available1 != 1) {
			$('#' + day + 'Hour').text("hours");
		}
		else {
			$('#' + day + 'Hour').text("hour");
		}
	}

	$('#' + day + 'Total').text(available + available1);
	calculateTotalAvailability();

}

// Calculate hours available for the week
function calculateTotalAvailability() {

	// Array of all dates in the week
	var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
	var totalHours = 0;

	// Loop to add up all hours
	for(count = 0; count < days.length; count++) {
		var text = $('#' + days[count] + 'Total').html();
		totalHours += parseFloat(text);
	}

	$('#total').text(totalHours);
}

function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

// Automatically inserts a colon when an input field is selected
// based on http://codepen.io/jackocnr/pen/xuLri
function insertColon() {

	var input = $("input[class='time calc--center']");
	var prefix = ":"

	input.focus(function(e) {
  		if (!$(this).val()) {
    		$(this).val(prefix);
  	}
	});

	input.mousedown(function(e) {
  		// mousedown decides where the cursor goes, so if we're focusing
  		// we must prevent this from happening
  		if (!$(this).is(":focus") && !$(this).val()) {
    		e.preventDefault();
    		// but this also cancels the focus, so we must trigger that manually
    		$(this).focus();
    		putCursorAtFront($(this));
  		}
	});

	input.blur(function() {
  		if ($(this).val() == prefix) {
    		$(this).val("");
  		}
	});

	// based on http://css-tricks.com/snippets/jquery/move-cursor-to-end-of-textarea-or-input/
	var putCursorAtFront = function(jQueryInput) {
		var input = jQueryInput[0];
		// works for Chrome, FF, Safari, IE9+
		if (input.setSelectionRange) {
			input.setSelectionRange(0, 0);
		}
	};
}