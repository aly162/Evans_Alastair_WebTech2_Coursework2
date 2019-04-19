function sort() {
  var x = document.cookie;
  
   var MSG = getCookie('MSG');
  document.getElementById('MSG').value = MSG;
  
  
	var MSG2 = MSG
  
	var MSG3 = MSG2.replace(/Sender/g, 'From')
	var MSG4 = MSG3.replace(/MSG/g, 'Message')
	var MSG5 = MSG4.replace(/"/g, ' ')
	var MSG6 = MSG5.replace('j:[{',' ');
	var MSG7 = MSG6.replace(/,/g, ' ')
	var MSG8 = MSG7.replace(/}]/g, ' ')
	var MSG9 = MSG8.replace('j:[]',' ');
	

	
	

	
	var entry = MSG9
	entryArray = entry.split('} {');




	var one = entryArray[0]
	var two = entryArray[1]
	var three = entryArray[2]
	var four = entryArray[3]
	var five = entryArray[4]
	var six = entryArray[5]
	var seven = entryArray[6]
	var eight = entryArray[7]
	var nine = entryArray[8]
	var ten = entryArray[9]

	

	
	document.getElementById("output_area").innerHTML = (one);
	document.getElementById("output_area2").innerHTML = (two);
	document.getElementById("output_area3").innerHTML = (three);
	document.getElementById("output_area4").innerHTML = (four);
	document.getElementById("output_area5").innerHTML = (five);
	document.getElementById("output_area6").innerHTML = (six);
	document.getElementById("output_area7").innerHTML = (seven);
	document.getElementById("output_area8").innerHTML = (eight);
	document.getElementById("output_area9").innerHTML = (nine);
	document.getElementById("output_area10").innerHTML = (ten);
	

}



function getCookie(cookie_name) {
  var name = cookie_name + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i < ca.length; i++){
    var c = ca[i];
    while(c.charAt(0) == ' '){
      c = c.substring(1);
    }
    if(c.indexOf(name) == 0){
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
