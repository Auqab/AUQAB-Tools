import { useState } from "react";
import SEO from "../components/SEO";


function ImageResizer(){

const [image,setImage] = useState(null);

const [preview,setPreview] = useState("");

const [width,setWidth] = useState(800);

const [height,setHeight] = useState(600);

const [result,setResult] = useState("");



function loadImage(e){

const file = e.target.files[0];

if(!file) return;


setImage(file);


const url = URL.createObjectURL(file);

setPreview(url);

}



function resizeImage(){

if(!image) return;


const img = new Image();

img.src = preview;


img.onload = ()=>{


const canvas = document.createElement("canvas");

canvas.width = Number(width);

canvas.height = Number(height);


const ctx = canvas.getContext("2d");


ctx.drawImage(
img,
0,
0,
canvas.width,
canvas.height
);



setResult(
canvas.toDataURL("image/jpeg",0.9)
);


};


}



function download(){

const link=document.createElement("a");

link.href=result;

link.download="AUQAB-resized-image.jpg";

link.click();

}



return(

<>

<SEO

title="Free Image Resizer Online - AUQAB Tools"

description="Resize images online easily. Change image dimensions and download resized photos."

/>



<section className="tool-page">


<div className="password-card">


<h1>
📷 Image Resizer
</h1>


<p className="tool-description">
Resize images quickly while keeping good quality.
</p>



<input

type="file"

accept="image/*"

onChange={loadImage}

/>



{

preview &&

<img

src={preview}

alt="preview"

style={{maxWidth:"100%"}}

/>

}



<div className="options">


<label>
Width
</label>


<input

type="number"

value={width}

onChange={(e)=>setWidth(e.target.value)}

/>



<label>
Height
</label>


<input

type="number"

value={height}

onChange={(e)=>setHeight(e.target.value)}

/>


</div>



<button

className="generate"

onClick={resizeImage}

>
Resize Image
</button>



{

result &&

<>

<h2>
Preview Result
</h2>


<img

src={result}

alt="result"

style={{maxWidth:"100%"}}

/>


<button

className="download-btn"

onClick={download}

>
Download Image
</button>

</>

}



<div className="info-section">


<h2>
How to resize an image?
</h2>


<p>
Upload an image, choose the new dimensions, then download the resized file.
</p>



<h2>
Why use AUQAB Image Resizer?
</h2>


<ul>

<li>
Free online image resizing
</li>

<li>
Works directly in your browser
</li>

<li>
No image upload to server
</li>

<li>
Works on mobile and desktop
</li>

</ul>



<h2>
Frequently Asked Questions
</h2>


<h3>
Are my images stored?
</h3>


<p>
No. Images are processed locally in your browser.
</p>


</div>


</div>


</section>


</>

);

}


export default ImageResizer;
