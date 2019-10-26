function convertToMultiSelectDropdownElement(givenElement, options) {
	givenElement.style.border = "solid";
	givenElement.style.borderColor = "black";
    givenElement.style.width = "240px";

	for (var i = givenElement.children.length - 1; i >= 0; i--) {
        givenElement.removeChild(givenElement.children[i]); 
    }
    var titleField = getDropdownField("select an option"); 
    titleField.style.width = "240px";
	givenElement.selectedFields = [];
	titleField.open = false;
	titleField.onclick = function () {
        titleField.open = !titleField.open;
		if (titleField.open) {
            titleField.textContent = "apply selected options";
			for (var optionsKey in options) {
				var optionField = {};
				if (Array.isArray(options)) {
					/* [ "fieldname" ] */
					optionField = getMultiSelectDropdownField(options[optionsKey]);
				} else {
					/* {
						"fieldname": true
					} */
					optionField = getMultiSelectDropdownField(optionsKey);
				}
				givenElement.appendChild(optionField);
			}
		} else {
            titleField.textContent = "select an option";
            givenElement.selectedFields = [];
			for (var i2 = givenElement.children.length - 1; i2 > 0; i2--) {
                if (givenElement.children[i2].children[0].checked) {
                    givenElement.selectedFields.push(givenElement.children[i2].children[1].textContent);
                }
				givenElement.removeChild(givenElement.children[i2]); 
            }
		}
	};
	givenElement.appendChild(titleField);
}

function getMultiSelectDropdownField(fieldValue) {
    var dropdownField = document.createElement("div");
    dropdownField.className = "grid-container";
    dropdownField.style.display = "grid";
    dropdownField.style.gridTemplateColumns = "auto auto";

    var dropdownFieldCheckBox = getDropdownCheckbox();
    dropdownFieldCheckBox.className = "grid-item";

	var dropdownFieldOptionValue = document.createElement("div");
	dropdownFieldOptionValue.style.height = "40px";
    dropdownFieldOptionValue.style.width = "194px";
    dropdownFieldOptionValue.style.textAlign = "center";
	dropdownFieldOptionValue.style.verticalAlign = "center";
    dropdownFieldOptionValue.className = "grid-item";
	dropdownFieldOptionValue.style.backgroundImage = "linear-gradient(#333333, black, black)";
    dropdownFieldOptionValue.textContent = fieldValue;
    
    dropdownField.appendChild(dropdownFieldCheckBox);
    dropdownField.appendChild(dropdownFieldOptionValue);
	return dropdownField;
}

function getDropdownCheckbox() {
    var checkBox = document.createElement("div");
    checkBox.style.border = "solid";
    checkBox.style.backgroundColor = "black";
    checkBox.style.width = "40px";
    checkBox.style.textAlign = "center";
	checkBox.style.verticalAlign = "center";

    checkBox.checked = false;
    checkBox.onclick = function() {
        checkBox.checked = !checkBox.checked;
        if (checkBox.checked) {
            checkBox.innerText = "•";
        } else {
            checkBox.innerText = "";
        }
    }

    return checkBox;
}