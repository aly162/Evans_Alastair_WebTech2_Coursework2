function getDetails() {
  var x = document.cookie;
  
  var u = getCookie('user_cookie');
  document.getElementById('userNAME').value = u;
    
  var a = getCookie('firstname_cookie');
  document.getElementById('firstNAME').value = a;

  var b = getCookie('surname_cookie');
  document.getElementById('surNAME').value = b;
  
  
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
