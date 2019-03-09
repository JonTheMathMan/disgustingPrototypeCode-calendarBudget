var budgetData = {};

function loadFile() {
    var input, file, fr;

    if (typeof window.FileReader !== 'function') {
      alert("The file API isn't supported on this browser yet.");
      return;
    }

    input = document.getElementById('fileinput');
    if (!input) {
      alert("Couldn't find the fileinput element.");
    }
    else if (!input.files) {
      alert("This browser doesn't seem to support the `files` property of file inputs.");
    }
    else if (!input.files[0]) {
      alert("Please select a file before clicking 'Submit'");
    }
    else {
      file = input.files[0];
      console.log(file, typeof file);
      fr = new FileReader();
      fr.onload = receivedText;
      fr.readAsText(file);
    }

    function receivedText(e) {
      let lines = e.target.result;
      try {
        var fileJson = JSON.parse(lines);
      } catch (e) {
          console.error("can't parse json file", e);
          return
      }
      
      budgetData = fileJson;
      document.getElementById("fileLoadedMsg").textContent = "File Loaded";
    }
  }