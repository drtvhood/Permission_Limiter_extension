///////////////// Developed By DM

var res;
var obj;

	var url_string = window.location.href;
	var url = new URL(url_string);
	var UID = url.searchParams.get("UID");
	var filename = url.searchParams.get("filename")

    url = "https://clients2.google.com/service/update2/crx?response=redirect&prodversion=62.0.3202.94&x=id%3D"+UID+"%26uc";
    var xhr = new XMLHttpRequest(); 
    xhr.open('GET', url, true); 
    xhr.responseType = "blob";
    xhr.onreadystatechange = function () { 
        if (xhr.readyState == 4) {
  var read_zip = new JSZip();
	res=xhr.response;
    read_zip.loadAsync(xhr.response).then(function (zip) {
    return zip.file("manifest.json").async("string");
  }).then(function (text) {
    		obj = JSON.parse(text);
		Privileges=obj.permissions;
		createcheckboxes(Privileges);
  });
        			}
    };
    xhr.send(null);

function createcheckboxes(Privileges)
{
var myDiv = document.getElementById("cboxes");

for (var i = 0; i < Privileges.length; i++) {
	var br = document.createElement('br');
	 myDiv.appendChild(br);
    var checkBox = document.createElement("input");
    var label = document.createElement("label");
    var span = document.createElement("span");
    checkBox.type = "checkbox";
    checkBox.value = Privileges[i];
    checkBox.id = i;
    label.toggleClass ="container";
    span.toggleClass= "checkmark";
    myDiv.appendChild(checkBox);
    myDiv.appendChild(label);
    label.appendChild(document.createTextNode(Privileges[i]));
    myDiv.appendChild(span);
	
}
}
var exefunction = function () {
	var temp= [];
	for (var i = 0; i < Privileges.length; i++) 
			{
		      if((document.getElementById(i).checked))
					{
						temp.push(document.getElementById(i).value);
					}
			}

obj.permissions=temp;

 var write_zip = new JSZip();
 write_zip.loadAsync(res).then(function (zip) {
 	zip.remove("manifest.json") ;
	zip.file("manifest.json",JSON.stringify(obj));
	zip.generateAsync({type:"blob"}).then(function (blob) {
		var a = document.createElement('a');
		a.href = window.URL.createObjectURL(blob);
		a.download = filename;
		a.style.display = 'none';
		document.body.appendChild(a);
		a.click(); //this is probably the key - simulating a click on a download link
  		  delete a;
  			});


						});
				}

document.getElementById('Check').onclick = exefunction;
