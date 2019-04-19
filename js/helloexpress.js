var express = require('express');
var app = express();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./SQL/CW2.db');

app.use(express.static(__dirname))

app.get('/', function (req, res, err) {
	res.clearCookie("user_cookie");
	res.clearCookie("pass_cookie");
	res.redirect('/login.html');

})

////////////////////////
// Setup for server 
////////////////////////

var server = app.listen(5000, "127.0.0.1", function() {
	var host = server.address().address
	var port = server.address().port
	
	console.log("Listening on http://%s:%s", host, port)
})

////////////////////////////////////////////////////////////////////////////////////
//This function checks if a user exists.
// If the user does not exist it will callback the variable "user" as true.
// If theu ser does exist it will callback the variable "user" as true.
// Will display error message in console should the sqlite not work correctly.
////////////////////////////////////////////////////////////////////////////////////

function userCHECK(username, cb){
  var user = false;
  db.get("SELECT * FROM UserAccounts WHERE Username = '" + username + "' ", function(err, row){
    if(err) console.log(err);

    if(typeof row == "undefined"){
      user = false;
      cb(user);
    }else{
      user = true;
      cb(user);
    }
  })

}


///////////////////////////////////////////////////////////////////
//Collects user details from database where the username matches
//shows error message should sql error occur
// sets user variable to true or false depending on result
// sets information as variable from .row
// passes this information back via callback
///////////////////////////////////////////////////////////////////

function userdetails(username, cb){
  var user = false;
  db.get("SELECT Password, Username, firstNAME, surNAME FROM UserAccounts WHERE Username = '" + username + "' ", function(err, row){
    if(err) console.log(err);

    if(typeof row == "undefined"){
      user = false;
      cb(user);
    }else{
      user = true;
      var s = row.surNAME;
      var f = row.firstNAME;
	  var p = row.Password;
	  var u = row.Username;
	  
      cb(user, f, s, p, u);
    }
  })
}







/////////////////////////////////////////////////////////////////////
// Checks if username and password provided by user matches database
// returns true or false via variable
// returns variable via callback
/////////////////////////////////////////////////////////////////////

function Auth(username, password, cb){
  var user = false;
  db.get("SELECT * FROM UserAccounts WHERE Username = '" + username + "' AND Password = '"+password+"' ", function(err,row){
    if(err) console.log(err);

    if(typeof row == "undefined"){
      user = false;
      cb(user);
    }else{
      user = true;
      cb(user);
    }
  })
}





///////////////////////////////////////////////////////////////////////////
// Takes username and password from user
// passes to userCHECK function to see if it matches
// if returned true it directs to page saying username taken, try again.
// if returned false inserts new user into database 
///////////////////////////////////////////////////////////////////////////

app.get('/signup', function (req, res) {

	var PW = req.query.Password;
	var UN = req.query.Username;

	userCHECK(UN, function(existing){
		if(existing == true){
		res.redirect('/loginUT.html');
    }
		if(existing == false){
    	db.run('INSERT INTO UserAccounts(Password, Username) VALUES (?, ?)', [PW, UN]);
   		res.redirect('/loginS.html');
    }
  });
})



//////////////
///login
//////////////

//////////////////////////////////////////////////////////////////
// Takes username / password inserted by user stores as variable
// Passes variable to function to get if username exsits
// stores information from callback into variables
// Sets info returned to cookies for later used
// redirects based on true / false of username found in db
/////////////////////////////////////////////////////////////////


app.get('/login',function(req, res){
 
 
  var UN = req.query.Username;
  var PW = req.query.Password;
 
  Auth(UN,PW,function(exists){
    if(exists == true){
    
      userdetails(UN,function(exists, firstNAME, surNAME){
        if(exists == true){
			res.cookie("user_cookie",UN);
			res.cookie("firstname_cookie",firstNAME);
			res.cookie("surname_cookie",surNAME);
			res.redirect("/index2.html");
        }
        if(exists == false){
			res.redirect("/login.html");
        }
      });
    }
    if(exists == false){
      res.redirect("/loginWrongPass.html");
    }
  });
})

/////////////////////////
// update account info
/////////////////////////

//////////////////////////////////////////////////////////
// Sets variables from information taken from web address
// Updates database if username matches one found in db
// returns true or false
// directs to landing page
// updates cookies with new information
//////////////////////////////////////////////////////////



app.get('/account', function (req, res) {
  res.sendFile(path.join(__dirname+'/account.html'));
  })
  
app.get('/update', function (req, res){
	var username = req.query.userNAME;
	var firstNAME = req.query.firstNAME;
	var surNAME = req.query.surNAME;
	var psw = req.query.psw;




  db.run("UPDATE UserAccounts SET firstNAME = '"+firstNAME+"', surNAME = '"+surNAME+"', Password = '"+psw+"' WHERE Username = '"+username+"' ")

  userdetails(username,function(e, firstNAME, surNAME, psw){
    if(e == true){


		res.cookie("user_cookie",username);
		res.cookie("firstname_cookie",firstNAME);
		res.cookie("surname_cookie",surNAME);
		res.cookie("account_PSW", psw);
		res.redirect("/account.html");
    }
    if(e == false){
		res.redirect("/account.html");
    }
  });
})

  
  
  
  
//////////////////////////////////////////
//////////// Message System /////////////
////////////////////////////////////////

//////////////////////////////////////////////////////////////////
//Takes information inserted by user and inserts to database
// uses content of "user" box to assign sender field in db
// returns to landing page confirming message sent (added to db)
///////////////////////////////////////////////////////////////////

 
app.get('/message', function (req, res){
   
  var Sender = req.query.userNAME;
  var MSG = req.query.MSG;
  var REC = req.query.REC;

	db.run('INSERT INTO Messages(Recipient, MSG, Sender) VALUES (?, ?, ?)', [REC, MSG, Sender]);

	res.redirect('/messageSENT.html');

})




//////////////////////////////////////////////////////////////////////////////////////////////////////
// Message fetch system
// Looks up db for username inserted into text box, this username is taken from cookie. read only.
// funtion takes all entries that have a recipent matching the users username
// returns all msg and sender fields assosicated to the username found.
// seperate javascript uses regex to prepare message to be read (sortmail.js)
// this script also splits entries into seperate arrays to allow for nice display.
//////////////////////////////////////////////////////////////////////////////////////////////////////



app.get('/update2', function (req, res){

  var username = req.query.userNAME;
  


  checkMAIL(username,function(e, MSG, Sender){
    if(e == true){

		res.cookie("MSG",MSG);
		res.redirect("/inbox.html");
	  
    }
    if(e == false){
		res.redirect("/inbox.html");
    }
  });
})







function checkMAIL(username, cb){

  var user = false;
  db.all("SELECT MSG, Sender FROM Messages WHERE Recipient = '" + username + "' ", function(err, row){
    if(err) console.log(err);

 
    else

		user = true;
		var MSG = row;
		cb(user, MSG);
    })
  }


//////////////////////////////////////////////////////////
// Message delete system
// Takes username from read only text box
// passes username to function for deleting sql entries
// deletes all rows that contain a matching user name
//////////////////////////////////////////////////////////// 



app.get('/delMSG', function (req, res){
 var username = req.query.userNAME2;
	console.log(username);

  deleteMAIL(username,function(e){
    if(e == true){

		res.redirect("/inbox.html");
    }
    if(e == false){
		res.redirect("/inbox.html");
    }
  });
})



////////////////////////////////////////////////////////////
// Function for deleting sql lines based on username match.
////////////////////////////////////////////////////////////


function deleteMAIL(username, cb){

  var user = false;
  db.get("DELETE FROM Messages WHERE Recipient = '" + username + "'", function(err, row){
    if(err) console.log(err);

 
    else
      user = true;
  
      cb(user,);
    })
  }

  
