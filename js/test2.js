$(document).ready(function (){


	var url = "http://www.imdb.com"
	if(XMLHttpRequest)
	{
		var request = new XMLHttpRequest();
		if("withCredentials" in request)
		{
			// Firefox 3.5 and Safari 4
			alert('mozila making request');
			request.open('GET', url, true);
			request.onreadystatechange = function () {
			    if (request.readyState == 4) {
			        if (request.status == 200 || window.location.href.indexOf("http") == -1) {
			            //document.getElementById("result").innerHTML = mygetrequest.responseText
			            alert(request.responseText);
			        }
			        else {
			            alert("An error has occured making the request")
			        }
			    }
			}
			var a =request.send();

		}
		else if (XDomainRequest)
		{
			// IE8
			var xdr = new XDomainRequest();
			xdr.open("get", url);
			xdr.send();

			// handle XDR responses -- not shown here :-)
		}

		 //handler=function(){ alert(request.responseText)}

		// This version of XHR does not support CORS
		// Handle accordingly
	}
});
