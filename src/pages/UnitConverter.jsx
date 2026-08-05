import { useState } from "react";
import SEO from "../components/SEO";


function UnitConverter(){

const [value,setValue] = useState(1);
const [result,setResult] = useState(0);


function convert(){

setResult(Number(value) * 100);

}


return(

<>

<SEO

title="Free Unit Converter - AUQAB Tools"

description="Convert units quickly and easily with AUQAB Unit Converter."

/>


<section className="tool-page">


<div className="password-card">


<h1>
📏 Unit Converter
</h1>


<p className="tool-description">
Convert measurements quickly between common units.
</p>



<input

type="number"

value={value}

onChange={(e)=>setValue(e.target.value)}

/>



<p>
Meters to Centimeters
</p>



<button

className="generate"

onClick={convert}

>
Convert
</button>



<h2>
Result:
</h2>


<h3>
{result} cm
</h3>



<div className="info-section">


<h2>
How to use Unit Converter?
</h2>


<p>
Enter a value and click convert to get the result instantly.
</p>


<h2>
Why use AUQAB Unit Converter?
</h2>


<ul>
<li>Fast and simple</li>
<li>Works on mobile and desktop</li>
<li>No registration required</li>
</ul>



<h2>
Frequently Asked Questions
</h2>


<h3>
Is this converter free?
</h3>

<p>
Yes, AUQAB Unit Converter is completely free.
</p>


</div>


</div>


</section>


</>

);

}


export default UnitConverter;
