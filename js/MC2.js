function decode2()
{

	
var message = document.getElementById("MSG").value;	
var alphabet = {"/":" ","-----":"0",".----":"1","..---":"2","...--":"3","....-":"4",
				".....":"5","-....":"6","--...":"7","---..":"8","----.":"9",".-":"a",
				"-...":"b","-.-.":"c","-..":"d",".":"e","..-.":"f","--.":"g","....":"h",
				"..":"i",".---":"j","-.-":"k",".-..":"l","--":"m","-.":"n","---":"o",
				".--.":"p","--.-":"q",".-.":"r","...":"s","-":"t","..-":"u","...-":"v",
				".--":"w","-..-":"x","-.--":"y","--..":"z"};

var morseCODE = [];

	message.split(" ").map(function (letter) {
			morseCODE.push(alphabet[letter]);

});
 
	var test = document.getElementById('message22');
		test.value = morseCODE.join("");
}

// Citation
// Guidance for Code
// L, E. (2017). js decoding morse code. [online] Stack Overflow.
// Available at: https://stackoverflow.com/questions/43726344/js-decoding-morse-code [Accessed 7 Mar. 2019]