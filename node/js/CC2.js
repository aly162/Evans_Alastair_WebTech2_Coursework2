function encode()
{
	var userNUM = document.getElementById('select').value|0;
	var plain_text = document.getElementById("message22").value;
	var cipher_text = [];
	var alphabet= 'abcdefghijklmnopqrstuvwxyz'.split('');
	var plain_textLC = plain_text.toLowerCase();

	
	for(var idx=0; idx<plain_textLC.length; idx++)
	{
		input = alphabet.indexOf(plain_textLC[idx]);
		
		
		if(input == -1 )
		{
			cipher_text.push(plain_textLC[idx]);
		}
		
		else {
			var coded = (input+userNUM)%26;
			var letter = alphabet[coded];
			cipher_text.push(letter);
		}



	}
	
	var test = document.getElementById('MSG');
		test.value = cipher_text.join("");


}	

// Citation
// Guidance and Modification of code	
// Wells, S. (2019). Lab 5 - More JS & Some Design. 1st ed. [ebook] Edinburgh: Napier University, 
// p.7. Available at: https://moodle.napier.ac.uk/course/view.php?id=28452 [Accessed 7 Mar. 2019].