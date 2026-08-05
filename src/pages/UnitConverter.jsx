import { useState } from "react";
import SEO from "../components/SEO";


function UnitConverter(){

const [value,setValue] = useState(1);
const [from,setFrom] = useState("meter");
const [to,setTo] = useState("centimeter");
const [result,setResult] = useState("");



function convert(){

let meters;


if(from==="meter")
meters = Number(value);

if(from==="centimeter")
meters = Number(value) / 100;

if(from==="kilometer")
meters = Number(value) * 1000;



let output;


if(to==="meter")
output = meters;

if(to==="centimeter")
output = meters * 100;

if(to==="kilometer")
output = meters / 1000;


setResult(output);

}



return(

<>

<SEO

title="Free Unit Converter - AUQAB Tools"

description="Convert length units quickly between meters, centimeters and kilometers."

/>


<section className="tool-page">


<div className="password-card">


<h1>
📏 Unit Converter
</h1>


<p className="tool-description">
Convert length units quickly and easily.
</p>



<input

type="number"

value={value}

onChange={(e)=>setValue(e.target.value)}

/>



<div className="options">


<select

value={from}

onChange={(e)=>setFrom(e.target.value)}

>

<option value="meter">
Meter
</option>

<option value="centimeter">
Centimeter
</option>

<option value="kilometer">
Kilometer
</option>

</select>



<span>
to
</span>



<select

value={to}

onChange={(e)=>setTo(e.target.value)}

>

<option value="meter">
Meter
</option>

<option value="centimeter">
Centimeter
</option>

<option value="kilometer">
Kilometer
</option>

</select>


</div>



<button

className="generate"

onClick={convert}

>
Convert
</button>



{

result !== "" &&

<h2>
Result: {result}
</h2>

}



<div className="info-section">


<h2>
Supported conversions
</h2>


<ul>

<li>
Meters to Centimeters
</li>

<li>
Centimeters to Meters
</li>

<li>
Kilometers to Meters
</li>

<li>
Meters to Kilometers
</li>

</ul>



<h2>
Frequently Asked Questions
</h2>


<h3>
Is AUQAB Unit Converter free?
</h3>

<p>
Yes, it is completely free and works directly in your browser.
</p>


</div>


</div>


</section>


</>

);

}


export default UnitConverter;
