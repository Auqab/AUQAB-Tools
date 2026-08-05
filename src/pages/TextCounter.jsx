import { useState } from "react";
import SEO from "../components/SEO";

function TextCounter(){

const [text,setText] = useState("");


const characters = text.length;

const words = text.trim()
? text.trim().split(/\s+/).length
: 0;

const lines = text.split("\n").length;

const readingTime = Math.ceil(words / 200);



function clearText(){
setText("");
}


function copyText(){
navigator.clipboard.writeText(text);
}


return(
<>

<SEO

title="Free Text Counter - AUQAB Tools"

description="Count words, characters and reading time instantly."

/>


<section className="tool-page">


<div className="password-card">


<h1>
📝 Text Counter
</h1>


<p>
Analyze your text instantly
</p>


<textarea

value={text}

onChange={(e)=>setText(e.target.value)}

placeholder="Write or paste your text here..."

/>



<div className="stats">


<div>
Characters
<strong>{characters}</strong>
</div>


<div>
Words
<strong>{words}</strong>
</div>


<div>
Lines
<strong>{lines}</strong>
</div>


<div>
Reading
<strong>{readingTime} min</strong>
</div>


</div>



<div className="buttons">


<button
className="generate"
onClick={copyText}
>
Copy
</button>


<button
className="clear"
onClick={clearText}
>
Clear
</button>


</div>


</div>


</section>


</>

)

}


export default TextCounter;
