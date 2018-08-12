function convertToDropdownElement(givenElement, options) {
	var selectedField = getDropdownField("select an option");
	selectedField.open = false;
	selectedField.onclick = function() {
		selectedField.open = !selectedField.open;
		if (selectedField.open) {
			for(var i=0; i<options.length; i++){
				var optionField = getDropdownField(options[i]);
				optionField.onclick = function() {
					selectedField.textContent = optionField.textContent;
					for (var i2=1; i2<givenElement.children.length; i2++) {
						givenElement.removeChild(givenElement.children[i2]);
					}
				};
				givenElement.appendChild(optionField);
			}
		} else {
			for (var i2=1; i2<givenElement.children.length; i2++) {
				givenElement.removeChild(givenElement.children[i2]);
			}
		}
	};
	givenElement.appendChild(selectedField);
}

function getDropdownField(fieldValue) {
	var dropdownField = document.createElement("div");
	dropdownField.style.borderStyle = "solid";
	dropdownField.style.height = "40px";
	dropdownField.style.width = "200px";
	dropdownField.style.backgroundColor = "#eeeeee";
	dropdownField.textContent = fieldValue;
	return dropdownField;
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