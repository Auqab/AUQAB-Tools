import { useState, useEffect } from "react";
import SEO from "../components/SEO";
import { trackEvent } from "../utils/analytics";



function PasswordGenerator(){

const [showPassword,setShowPassword] = useState(false);

const [length,setLength] = useState(12);

const [password,setPassword] = useState("");

const [copied,setCopied] = useState(false);


const [options,setOptions] = useState({

upper:true,
lower:true,
numbers:true,
symbols:true

});



function generatePassword(){

let chars="";


if(options.upper)
chars+="ABCDEFGHIJKLMNOPQRSTUVWXYZ";


if(options.lower)
chars+="abcdefghijklmnopqrstuvwxyz";


if(options.numbers)
chars+="0123456789";


if(options.symbols)
chars+="!@#$%^&*()_+{}[]";


let result="";


for(let i=0;i<length;i++){

result += chars[Math.floor(Math.random()*chars.length)];

}


setPassword(result);

trackEvent("password_generate",{
tool:"password_generator"
});

setCopied(false);

}



useEffect(()=>{

generatePassword();

},[]);



function copyPassword(){

navigator.clipboard.writeText(password);

trackEvent("password_copy",{
tool:"password_generator"
});

setCopied(true);

setTimeout(()=>setCopied(false),2000);

}


function strength(){

if(password.length < 8)
return "Weak";


if(password.length < 14)
return "Medium";


return "Strong";

}



return(

<>


<SEO

title="Free Password Generator - Create Strong Secure Passwords"

description="Generate strong random passwords online with AUQAB Password Generator. Create secure passwords instantly."

/>



<section className="tool-page">


<div className="password-card">


<h1>
🔐 Password Generator
</h1>


<p className="tool-description">
Create strong and secure random passwords instantly.
Customize length and characters to generate safer passwords.
</p>



<div className="password-result">


<input

type={showPassword ? "text" : "password"}

value={password}

readOnly

placeholder="Your secure password"

/>


<button
onClick={()=>setShowPassword(!showPassword)}
>
{showPassword ? "Hide" : "Show"}
</button>



<button onClick={copyPassword}>

{copied ? "Copied ✓" : "Copy"}

</button>


</div>



{
password &&

<>

<div className={`strength ${strength().toLowerCase()}`}>

Strength: {strength()}

</div>


<div className="strength-bar">

<div
className={`bar ${strength().toLowerCase()}`}
></div>

</div>

</>

}



<div className="setting">


<label>

Password Length:

<strong>
{length}
</strong>

</label>


<input

type="range"

min="4"

max="32"

value={length}

onChange={(e)=>setLength(Number(e.target.value))}

/>


</div>



<div className="checks">


<label>
<input

type="checkbox"

checked={options.upper}

onChange={()=>setOptions({...options,upper:!options.upper})}

/>

Uppercase

</label>



<label>

<input

type="checkbox"

checked={options.lower}

onChange={()=>setOptions({...options,lower:!options.lower})}

/>

Lowercase

</label>



<label>

<input

type="checkbox"

checked={options.numbers}

onChange={()=>setOptions({...options,numbers:!options.numbers})}

/>

Numbers

</label>



<label>

<input

type="checkbox"

checked={options.symbols}

onChange={()=>setOptions({...options,symbols:!options.symbols})}

/>

Symbols

</label>


</div>



<button

className="generate"

onClick={generatePassword}

>

Generate Password

</button>



<div className="info-section">


<h2>
How to create a secure password?
</h2>


<p>
1. Choose a suitable password length.
</p>

<p>
2. Enable uppercase, lowercase, numbers and symbols.
</p>

<p>
3. Copy and save your generated password securely.
</p>



<h2>
Why use AUQAB Password Generator?
</h2>


<ul>

<li>
Free and easy to use
</li>

<li>
No registration required
</li>

<li>
Generate passwords instantly in your browser
</li>

<li>
Your passwords are not stored
</li>

</ul>



<h2>
Frequently Asked Questions
</h2>


<h3>
Are generated passwords saved?
</h3>


<p>
No. Passwords are created locally in your browser and are not stored.
</p>



<h3>
What is a strong password?
</h3>


<p>
A strong password usually contains a mix of letters, numbers and symbols with enough length.
</p>



</div>



</div>


</section>


</>

);

}


export default PasswordGenerator;
