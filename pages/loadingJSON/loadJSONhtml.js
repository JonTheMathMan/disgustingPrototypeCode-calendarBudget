var loadJSONHtml = `<div id="inputBox"><form id="jsonFile" name="jsonFile" enctype="multipart/form-data" method="post">
<h2>Json File</h2>
 <input oninput="setLabelText(this)" hidden="true" type='file' name="file" id='fileinput'>
 <label for="fileinput" id="fileFormLabel">Choose a file</label>
 <input type='button' value='Submit' onclick='loadFile();'>
</form>
<p id="fileLoadedMsg">File Not Loaded</p>
<p></p>
<a id="saveFile"><button onclick="saveFile()">Save Changes</button></a>
</div>
<style>
    #inputBox {
        background-color:#444444;
        width: 50%;
        margin-left: 25%;
        box-shadow: -10px 10px 15px;
        color: black;
    }
</style>`;