function encode2()
{
	
var message = document.getElementById("message23").value;	
var messageLC = message.toLowerCase();
var alphabet = {    'a': '.-',    'b': '-...',	 'c': '-.-.', 'd': '-..',
    'e': '.',     	'f': '..-.',  'g': '--.', 	 'h': '....',
    'i': '..',    	'j': '.---',  'k': '-.-',  	 'l': '.-..',
    'm': '--',    	'n': '-.',    'o': '---', 	 'p': '.--.',
    'q': '--.-', 	'r': '.-.',   's': '...', 	 't': '-',
    'u': '..-',  	'v': '...-',  'w': '.--', 	 'x': '-..-',
    'y': '-.--', 	'z': '--..',  ' ': '/',	
    '1': '.----', 	'2': '..---', '3': '...--',  '4': '....-', 
    '5': '.....', 	'6': '-....', '7': '--...',  '8': '---..', 
	'9': '----.', 	'0': '-----'};

var morseCODE = [];

	messageLC.split('').map(function (MC) {
			morseCODE.push(alphabet[MC]);
});
 

	
		var test = document.getElementById('MSG');
		test.value = morseCODE.join("");
}

// Citation
// Guidance for Code
// L, E. (2017). js decoding morse code. [online] Stack Overflow.
// Available at: https://stackoverflow.com/questions/43726344/js-decoding-morse-code [Accessed 7 Mar. 2019]