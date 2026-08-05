import { useState } from "react";
import SEO from "../components/SEO";


function WordCounter(){

const [text,setText] = useState("");



const words = text.trim()
? text.trim().split(/\s+/).length
: 0;


const characters = text.length;


const sentences = text.split(/[.!?]+/)
.filter(sentence => sentence.trim() !== "")
.length;



return(

<>

<SEO

title="Free Word Counter - Count Words and Characters Online"

description="Count words, characters and sentences easily with AUQAB Word Counter."

/>



<section className="tool-page">


<div className="password-card">


<h1>
📝 Word Counter
</h1>


<p className="tool-description">
Count words, characters and sentences instantly.
A simple free tool for writers, students and content creators.
</p>



<textarea

rows="8"

placeholder="Write or paste your text here..."

value={text}

onChange={(e)=>setText(e.target.value)}

></textarea>



<div className="counter-result">


<h3>
Words: {words}
</h3>


<h3>
Characters: {characters}
</h3>


<h3>
Sentences: {sentences}
</h3>


</div>



<button

className="clear-btn"

onClick={()=>setText("")}

>
Clear Text
</button>



<div className="info-section">


<h2>
How to use Word Counter?
</h2>


<p>
1. Type or paste your text into the box.
</p>

<p>
2. The tool automatically counts words and characters.
</p>

<p>
3. Use the results to improve your content.
</p>



<h2>
Why use AUQAB Word Counter?
</h2>


<ul>

<li>
Free and easy to use
</li>

<li>
Works instantly in your browser
</li>

<li>
No registration required
</li>

<li>
Your text is not stored
</li>

</ul>



<h2>
Frequently Asked Questions
</h2>


<h3>
Is my text uploaded?
</h3>


<p>
No. Text counting happens directly in your browser.
</p>



<h3>
Who can use this tool?
</h3>


<p>
Students, writers, bloggers and anyone who needs quick text statistics.
</p>


</div>


</div>


</section>


</>

);

}


export default WordCounter;
