import { useState } from "react";
import SEO from "../components/SEO";


function JSONFormatter(){

const [input,setInput] = useState("");
const [output,setOutput] = useState("");
const [error,setError] = useState("");



function formatJSON(){

try{

const parsed = JSON.parse(input);

setOutput(JSON.stringify(parsed,null,4));

setError("");

}

catch(e){

setError("Invalid JSON format");

setOutput("");

}

}



function minifyJSON(){

try{

const parsed = JSON.parse(input);

setOutput(JSON.stringify(parsed));

setError("");

}

catch(e){

setError("Invalid JSON format");

setOutput("");

}

}



return(

<>

<SEO

title="Free JSON Formatter Online - AUQAB Tools"

description="Format, beautify and minify JSON data online with AUQAB JSON Formatter."

/>


<section className="tool-page">


<div className="password-card">


<h1>
{} JSON Formatter
</h1>


<p className="tool-description">
Format and clean JSON data instantly.
Beautify JSON or compress it into a smaller format.
</p>



<textarea

rows="10"

placeholder="Paste JSON here..."

value={input}

onChange={(e)=>setInput(e.target.value)}

></textarea>



<div className="options">


<button

className="generate"

onClick={formatJSON}

>
Format JSON
</button>



<button

className="generate"

onClick={minifyJSON}

>
Minify JSON
</button>


</div>



{
error &&

<p>
{error}
</p>

}



<textarea

rows="10"

readOnly

value={output}

placeholder="Result appears here..."

></textarea>




<button

className="clear-btn"

onClick={()=>{

setInput("");

setOutput("");

setError("");

}}

>
Clear
</button>




<div className="info-section">


<h2>
How to use JSON Formatter?
</h2>


<p>
1. Paste your JSON data.
</p>

<p>
2. Choose Format or Minify.
</p>

<p>
3. Copy the result.
</p>



<h2>
Why use AUQAB JSON Formatter?
</h2>


<ul>

<li>
Free online JSON tool
</li>

<li>
Works directly in your browser
</li>

<li>
No data is stored
</li>

<li>
Useful for developers
</li>

</ul>



<h2>
Frequently Asked Questions
</h2>


<h3>
Is my JSON uploaded?
</h3>

<p>
No. Processing happens locally in your browser.
</p>


<h3>
Who can use this tool?
</h3>

<p>
Developers and anyone working with JSON files.
</p>


</div>


</div>


</section>


</>

);

}


export default JSONFormatter;
