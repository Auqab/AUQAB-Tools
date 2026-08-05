import { useState } from "react";
import SEO from "../components/SEO";

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

setCopied(false);

}



function copyPassword(){

navigator.clipboard.writeText(password);

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

title="Free Password Generator - AUQAB Tools"

description="Generate strong secure passwords online with AUQAB Password Generator."

/>

<section className="tool-page">


<div className="password-card">


<h1>
🔐 Password Generator
</h1>


<p>
Create strong and secure passwords instantly
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
{showPassword ? "🙈" : "👁"}
</button>


<button onClick={copyPassword}>

{copied ? "Copied ✓" : "Copy"}

</button>


</div>



{

password &&

<div className={`strength ${strength().toLowerCase()}`}>

Strength: {strength()}

</div>

<div className="strength-bar">

<div
className={`bar ${strength().toLowerCase()}`}
></div>

</div>

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

onChange={(e)=>setLength(e.target.value)}

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


</div>


</section>

</>

);

}


export default PasswordGenerator;
