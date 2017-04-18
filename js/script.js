

function calculateTime(day) {
	var From = document.getElementById(day + 'From').value;
	var To = document.getElementById(day + 'To').value;

	// if both fields are filled in
	if(From != 0 && To != 0) {
		var diff = To - From

		// if time difference is positive
		if(diff < 0) {
			diff = 0;
		}
		document.getElementById(day + 'Total').innerHTML = diff;
		calculateTotalAvailability();
	}
	else {
		document.getElementById(day + 'Total').innerHTML = 0;
		calculateTotalAvailability();
	}

}

function calculateTotalAvailability() {
	var Monday = document.getElementById('MondayTotal').innerHTML;
	var Tuesday = document.getElementById('TuesdayTotal').innerHTML;

	document.getElementById('Total').innerHTML = parseInt(Monday) + parseInt(Tuesday);
}