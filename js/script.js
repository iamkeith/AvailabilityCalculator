$(document).ready(function() {


})

function calculateTime(day) {

	var From = $('#' + day + 'From')[0].value;
	var To = $('#' + day + 'To')[0].value;

	// if both fields are filled in
	if(From != 0 && To != 0) {

		// split time into two parts, hours and minutes
		From = From.split(":");
		To = To.split(":");

		var fromDate = new Date(0, 0, 0, From[0], From[1] || 0, 0);
		var toDate = new Date(0, 0, 0, To[0], To[1] || 0, 0);

		// calculate diference in time
		var diff = toDate.getTime() - fromDate.getTime();

		// Make sure time difference is positive, else 0
		if (diff < 0) diff = 0;

		var hours = Math.floor(diff / 1000 / 60 / 60);
		diff -= hours * 1000 * 60 * 60;
		var minutes = Math.floor(diff / 1000 / 60);

		$('#' + day + 'Total').text((hours < 9 ? "0" : "") + hours + ":" + (minutes < 9 ? "0" : "") + minutes)
		calculateTotalAvailability();
	}
	// if both fields are not filled in
	else {
		// hours available = 0
		$('#' + day + 'Total').text(0);
		calculateTotalAvailability();
	}

}

function calculateTotalAvailability() {

	// Array of all dates in the week
	var days = ["Monday", "Tuesday"];
	var totalHours = 0;
	var standard = new Date(0, 0, 0, 0, 0, 0);

	// Loop to add up all hours
	for(count = 0; count < days.length; count++) {
		var text = $('#' + days[count] + 'Total').html();
		text = text.split(":");
		var dailyHours = new Date(0, 0, 0, text[0], text[1] || 0, 0);
		totalHours += dailyHours.getTime() - standard.getTime();
	}

	var hours =  Math.floor(totalHours / 1000 / 60 / 60);
	totalHours -= hours * 1000 * 60 * 60;
	var minutes = Math.floor(totalHours / 1000 / 60);

	// Change text of total availability 
	$('#Total').text((hours < 9 ? "0" : "") + hours + ":" + (minutes < 9 ? "0" : "") + minutes);
}