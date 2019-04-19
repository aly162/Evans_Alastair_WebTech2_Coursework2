function getDetails() {
  var x = document.cookie;
  
  var u = getCookie('user_cookie');
  document.getElementById('userNAME').value = u;
  
  var f = getCookie('firstname_cookie');
  document.getElementById('firstNAME').value = f;

  var s = getCookie('surname_cookie');
  document.getElementById('surNAME').value = s;
 
  var m = getCookie('MSG');
  document.getElementById('MSG').value = m;


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
