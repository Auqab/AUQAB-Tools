import { useState } from "react";
import SEO from "../components/SEO";

function ImageCompressor(){

const [image,setImage] = useState(null);
const [preview,setPreview] = useState("");
const [size,setSize] = useState(0);
const [compressed,setCompressed] = useState("");
const [newSize,setNewSize] = useState(0);


function compressImage(){

if(!image) return;


const img = new Image();

img.src = preview;


img.onload = ()=>{

const canvas = document.createElement("canvas");

const ctx = canvas.getContext("2d");


canvas.width = img.width;

canvas.height = img.height;


ctx.drawImage(
img,
0,
0,
canvas.width,
canvas.height
);


canvas.toBlob(
(blob)=>{

const url = URL.createObjectURL(blob);

setCompressed(url);

setNewSize(blob.size);

},

image.type === "image/png"
? "image/png"
: "image/jpeg",

image.type === "image/png"
? undefined
: 0.65

);

};

}

function handleImage(e){

const file = e.target.files[0];

if(!file) return;


setImage(file);

setSize(file.size);


const reader = new FileReader();


reader.onload = ()=>{

setPreview(reader.result);

};


reader.readAsDataURL(file);

}



function compressImage(){

if(!image) return;


const img = new Image();

img.src = preview;


img.onload = ()=>{

const canvas = document.createElement("canvas");

const ctx = canvas.getContext("2d");


const maxWidth = 1200;
const maxHeight = 1200;

let width = img.width;
let height = img.height;


if(width > maxWidth || height > maxHeight){

if(width > height){

height = Math.round(height * maxWidth / width);
width = maxWidth;

}else{

width = Math.round(width * maxHeight / height);
height = maxHeight;

}

}


canvas.width = width;
canvas.height = height;


ctx.drawImage(
img,
0,
0,
width,
height
);



canvas.toBlob(

(blob)=>{

const url = URL.createObjectURL(blob);

setCompressed(url);

setNewSize(blob.size);

},

"image/jpeg",

0.6

);


};

}



return(
<>

<SEO

title="Free Image Compressor - AUQAB Tools"

description="Compress images online while keeping quality."

/>


<section className="tool-page">

<div className="password-card">


<h1>
🖼️ Image Compressor
</h1>


<p>
Reduce image size quickly and securely
</p>


<input

type="file"

accept="image/*"

onChange={handleImage}

/>


{
preview &&

<div>

<img

src={preview}

width="250"

/>


<p>
Original Size: {(size/1024).toFixed(2)} KB
</p>

<button
className="generate"
onClick={compressImage}
>
Compress Image
</button>


</div>

}

{
compressed &&

<div>

<h3>
Compressed Result
</h3>


<img

src={compressed}

width="250"

/>


<p>
New Size: {(newSize/1024).toFixed(2)} KB
</p>

<a
href={compressed}
download="auqab-compressed-image.jpg"
className="generate"
>
Download Image
</a>

</div>

}

</div>

</section>


</>

)

}


export default ImageCompressor;
