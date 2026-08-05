import { useState } from "react";
import SEO from "../components/SEO";


function TextCaseConverter(){

const [text,setText] = useState("");
const [result,setResult] = useState("");



function upperCase(){

setResult(text.toUpperCase());

}



function lowerCase(){

setResult(text.toLowerCase());

}



function capitalize(){

setResult(

text.toLowerCase()
.replace(/\b\w/g, char => char.toUpperCase())

);

}



function sentenceCase(){

let output = text
.toLowerCase()
.replace(/(^\s*\w|[.!?]\s*\w)/g,
char=>char.toUpperCase()
);

setResult(output);

}



return(

<>

<SEO

title="Free Text Case Converter - AUQAB Tools"

description="Convert text to uppercase, lowercase and other formats quickly online."

/>



<section className="tool-page">


<div className="password-card">


<h1>
🔤 Text Case Converter
</h1>


<p className="tool-description">
Change text format instantly between uppercase, lowercase and more.
</p>



<textarea

rows="8"

placeholder="Enter your text here..."

value={text}

onChange={(e)=>setText(e.target.value)}

></textarea>



<div className="options">


<button
className="generate"
onClick={upperCase}
>
UPPERCASE
</button>


<button
className="generate"
onClick={lowerCase}
>
lowercase
</button>


<button
className="generate"
onClick={capitalize}
>
Capitalize Words
</button>


<button
className="generate"
onClick={sentenceCase}
>
Sentence Case
</button>


</div>



<textarea

rows="8"

readOnly

value={result}

placeholder="Converted text appears here..."

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
How to use Text Case Converter?
</h2>


<p>
Paste or write your text, then choose the desired format.
</p>


<h2>
Why use AUQAB Text Case Converter?
</h2>


<ul>

<li>
Free online tool
</li>

<li>
Instant text conversion
</li>

<li>
Works on mobile and desktop
</li>

<li>
Your text is processed in your browser
</li>

</ul>



<h2>
Frequently Asked Questions
</h2>


<h3>
Is my text saved?
</h3>


<p>
No. Your text is not uploaded or stored.
</p>


<h3>
Who needs this tool?
</h3>


<p>
Writers, students, developers and content creators.
</p>


</div>


</div>


</section>


</>

);

}


export default TextCaseConverter;
