$(document).ready(function() {


})

// Calculate the hours available for the day
function calculateTime(day) {

	var From = $('#' + day + 'From')[0].value;
	var To = $('#' + day + 'To')[0].value;

	// if both fields are filled in
	if(From != 0 && To != 0) {

		// split time into two parts, hours and minutes
		From = From.split(":");
		To = To.split(":");

		// if toggle is flipped to PM, add 12 to hours
		if($('#' + day + 'FromToggle').is(":checked")) {
			From[0] = parseInt(From[0]) + 12;
		}

		var fromDate = new Date(0, 0, 0, From[0], From[1] || 0, 0);
		var toDate = new Date(0, 0, 0, To[0], To[1] || 0, 0);

		// calculate diference in time
		var diff = toDate.getTime() - fromDate.getTime();

		// Make sure time difference is positive, else 0
		if (diff < 0) diff = 0;

		var hours = diff/ 1000/ 60/ 60;
		$('#' + day + 'Total').text(round(hours, 2));
		calculateTotalAvailability();
	}
	// if both fields are not filled in
	else {
		// hours available = 0
		$('#' + day + 'Total').text(0);
		calculateTotalAvailability();
	}

}

// Calculate hours available for the week
function calculateTotalAvailability() {

	// Array of all dates in the week
	var days = ["Monday", "Tuesday"];
	var totalHours = 0;

	// Loop to add up all hours
	for(count = 0; count < days.length; count++) {
		var text = $('#' + days[count] + 'Total').html();
		totalHours += parseFloat(text);
	}

	$('#Total').text(totalHours);
}

function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}