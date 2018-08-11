function convertToDropdownElement(givenElement, options) {
	
}

function getDropdowns() {
	var dropdowns = document.getElementsByClassName("eventDropdown");
	for(var i=0; i<dropdowns.length; i++) {
		switch(dropdowns[i].id) {
			case "repeatIntervalType":
			case "accountName":
			case "categoryTag":
			default:
				convertToDropdownElement(dropdowns[i], ["no dropdown options"]);
		}
	}
}