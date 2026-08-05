import { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";


function QRGenerator(){

const [text,setText] = useState("");

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

<section className="tool-page">


<h1>
🔳 QR Generator
</h1>


<p>
Create QR codes instantly
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

<QRCodeCanvas

value={text}

size={size}

fgColor={color}

/>

}


</div>



<div>


{
text &&

<>


<button
className="download-btn"
onClick={downloadQR}
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



</section>

);

}


export default QRGenerator;
