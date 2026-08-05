import { useState } from "react";
import SEO from "../components/SEO";


function Base64Tool(){

const [text,setText] = useState("");
const [result,setResult] = useState("");



function encode(){

try{

setResult(
btoa(unescape(encodeURIComponent(text)))
);

}

catch(e){

setResult("Encoding error");

}

}



function decode(){

try{

setResult(
decodeURIComponent(
escape(
atob(text)
)
)
);

}

catch(e){

setResult("Invalid Base64 text");

}

}



return(

<>

<SEO

title="Free Base64 Encoder Decoder Online - AUQAB Tools"

description="Encode and decode Base64 text online quickly with AUQAB Base64 Tool."

/>



<section className="tool-page">


<div className="password-card">


<h1>
🔐 Base64 Encoder Decoder
</h1>


<p className="tool-description">
Convert text to Base64 and decode Base64 data instantly.
Useful for developers and web projects.
</p>



<textarea

rows="8"

placeholder="Enter text or Base64 data..."

value={text}

onChange={(e)=>setText(e.target.value)}

></textarea>



<div className="options">


<button

className="generate"

onClick={encode}

>
Encode Base64
</button>



<button

className="generate"

onClick={decode}

>
Decode Base64
</button>


</div>



<textarea

rows="8"

readOnly

value={result}

placeholder="Result appears here..."

></textarea>



<button

className="clear-btn"

onClick={()=>{

setText("");

setResult("");

}}

>
Clear
</button>




<div className="info-section">


<h2>
How to use Base64 Tool?
</h2>


<p>
Enter your text, then choose Encode or Decode.
</p>



<h2>
Why use AUQAB Base64 Tool?
</h2>


<ul>

<li>
Free online developer tool
</li>

<li>
Works directly in your browser
</li>

<li>
No data is stored
</li>

<li>
Fast and simple
</li>

</ul>



<h2>
Frequently Asked Questions
</h2>


<h3>
What is Base64?
</h3>

<p>
Base64 is a method used to represent binary data as text.
</p>


<h3>
Is Base64 encryption?
</h3>

<p>
No. Base64 is encoding, not a security encryption method.
</p>


</div>


</div>


</section>


</>

);

}


export default Base64Tool;
