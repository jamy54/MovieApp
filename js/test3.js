$(document).ready(function (){

	var invocation = new XMLHttpRequest();
	var url = 'http://www.imdb.com';
	var body = '<?xml version="1.0"?><person><name>Arun</name></person>';
	    
	function callOtherDomain(){
	  if(invocation)
	    {
	      invocation.open('POST', url, true);
	      invocation.setRequestHeader('X-PINGOTHER', 'pingpong');
	      invocation.setRequestHeader('Content-Type', 'application/xml');
	      invocation.onreadystatechange = function () {
			    if (invocation.readyState == 4) {
			        if (invocation.status == 200 || window.location.href.indexOf("http") == -1) {
			            //document.getElementById("result").innerHTML = mygetrequest.responseText
			            alert(invocation.responseText);
			        }
			        else {
			            alert("An error has occured making the request")
			        }
			    }
			}
	      invocation.send(body); 
	    }
	 }
});
