import { useState,useEffect,useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import SEO from "../components/SEO";
import { trackEvent } from "../utils/analytics";



function QRGenerator(){

const [text,setText] = useState("");

useEffect(()=>{

if(text){

trackEvent("qr_generate",{
tool:"qr_generator"
});

}

},[text]);

const [size,setSize] = useState(220);

const [color,setColor] = useState("#000000");

const qrRef = useRef(null);



function downloadQR(){

const canvas = qrRef.current.querySelector("canvas");

const image = canvas.toDataURL("image/png");

const link = document.createElement("a");

link.href=image;

link.download="AUQAB-QR.png";

link.click();

}



return(

<>

<SEO

title="Free QR Code Generator - AUQAB Tools"

description="Create QR codes instantly for text and URLs. Free online QR generator with download option."

/>


<section className="tool-page">


<h1>
🔳 QR Generator
</h1>


<p className="tool-description">
Create free QR codes instantly from text, links and URLs.
Generate and download your QR code directly from your browser.
</p>



<input

type="text"

placeholder="Enter text or URL"

value={text}

onChange={(e)=>setText(e.target.value)}

/>



<div className="options">


<label>
Size:
</label>


<select onChange={(e)=>setSize(Number(e.target.value))}>

<option value="150">
Small
</option>

<option value="220">
Medium
</option>

<option value="350">
Large
</option>

</select>



<label>
Color:
</label>


<input

type="color"

value={color}

onChange={(e)=>setColor(e.target.value)}

/>



</div>



<div
className="qr-box"
ref={qrRef}
>

{
text &&

<>

<QRCodeCanvas
value={text}
/>

{
trackEvent("qr_generate",{
tool:"qr_generator"
})
}

</>

}


</div>



<div>


{
text &&

<>


<button
className="download-btn"
onClick={()=>{

trackEvent("qr_download",{
tool:"qr_generator"
});

downloadQR();

}}
>
Download QR
</button>


<button

className="clear-btn"

onClick={()=>setText("")}

>
Clear
</button>


</>

}


</div>



<div className="info-section">


<h2>
How to create a QR code?
</h2>


<p>
1. Enter your text or URL in the box above.
</p>


<p>
2. Customize the size and color.
</p>


<p>
3. Download your QR code as an image.
</p>



<h2>
Why use AUQAB QR Generator?
</h2>


<ul>

<li>
Free and easy to use
</li>

<li>
Works on mobile and desktop
</li>

<li>
No registration required
</li>

<li>
QR codes are generated directly in your browser
</li>

</ul>



<h2>
Frequently Asked Questions
</h2>


<h3>
Are QR codes generated securely?
</h3>


<p>
Yes. The QR code is created inside your browser and your data is not uploaded.
</p>


<h3>
Can I use the QR code commercially?
</h3>


<p>
Yes, you can download and use generated QR codes for your projects.
</p>


</div>


</section>

</>

);

}


export default QRGenerator;
