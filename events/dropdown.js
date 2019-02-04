function convertToDropdownElement(givenElement, options) {
	var selectedField = getDropdownField("select an option");
	selectedField.open = false;
	selectedField.onclick = function() {
		selectedField.open = !selectedField.open;
		if (selectedField.open) {
			for(var i=0; i<options.length; i++){
				let optionField = getDropdownField(options[i]);
				optionField.onclick = function() {
					selectedField.textContent = optionField.textContent;
					if (givenElement.id === "repeatIntervalType") {
						toggleValueFieldEnabled(optionField.textContent);
					}
					selectedField.open = !selectedField.open;
					for (var i2=givenElement.children.length-1; i2>0; i2--) {
						givenElement.removeChild(givenElement.children[i2]);
					}
				};
				givenElement.appendChild(optionField);
			}
		} else {
			for (var i2=givenElement.children.length-1; i2>0; i2--) {
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

function toggleValueFieldEnabled(intervalOption) {
	var intervalValueField = document.getElementById("repeatIntervalValue");

	if (["daily", "weekly - every same day of the week", "monthly - every Nth day of the month"].includes(intervalOption)){
		intervalValueField.value = "";
		intervalValueField.disabled = true;
	}else{
		intervalValueField.disabled = false;
	}
}

function getDropdowns() {
	var dropdowns = document.getElementsByClassName("eventDropdown");
	for(var i=0; i<dropdowns.length; i++) {
		switch(dropdowns[i].id) {
			case "repeatIntervalType":
				convertToDropdownElement(dropdowns[i], [
					"daily",
					"weekly - every same day of the week",
					"monthly - every Nth day of the month",
					"interval - every N days",
					"interval - every N weeks on the same day of the week",
					"interval - every N Months on the same day of the month"
					]);
				break;
			case "accountName":
			case "categoryTag":
			default:
				convertToDropdownElement(dropdowns[i], ["no dropdown options"]);
		}
	}
}
getDropdowns();