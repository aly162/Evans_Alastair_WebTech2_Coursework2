var FD = document.getElementById("output_area");

function fadein() {
    fade = setInterval(function()
	
	{
        if (parseFloat(FD.style.opacity) < 1) 
		
		{	
        FD.style.opacity =  parseFloat(FD.style.opacity) + 0.002;
        }
			
    }

					  );
				   }


// Citation
// Guidance for Code
// Stack Overflow. (2015). Pure JavaScript fade in and out - fade in not working.
// [online] Available at:
// https://stackoverflow.com/questions/29073294/pure-javascript-fade-in-and-out-fade-in-not-working [Accessed 7 Mar. 2019].