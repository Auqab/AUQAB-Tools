import { useRef, useState } from "react";
import SEO from "../components/SEO";


function BookScanner(){

const videoRef = useRef(null);
const canvasRef = useRef(null);

const [image,setImage] = useState(null);
const [camera,setCamera] = useState(false);



async function startCamera(){

const stream = await navigator.mediaDevices.getUserMedia({
video:{
facingMode:"environment"
}
});


videoRef.current.srcObject = stream;

setCamera(true);

}



function capture(){

const canvas = canvasRef.current;

const video = videoRef.current;


canvas.width = video.videoWidth;
canvas.height = video.videoHeight;


const ctx = canvas.getContext("2d");

ctx.drawImage(
video,
0,
0,
canvas.width,
canvas.height
);


setImage(
canvas.toDataURL("image/png")
);

}



return(

<section className="scanner-page">


<SEO

title="Book Scanner - AUQAB Tools"

description="Scan book pages using your camera and convert images into text or PDF."

/>


<h1>
Book Scanner
</h1>


<p>
Scan book pages directly from your phone camera.
</p>



<button
className="service-btn"
onClick={startCamera}
>
Open Camera
</button>



<br/><br/>



<video
ref={videoRef}
autoPlay
playsInline
style={{
width:"100%",
maxWidth:"500px"
}}
/>



<br/>


<button
className="service-btn"
onClick={capture}
disabled={!camera}
>
Capture Page
</button>



<canvas
ref={canvasRef}
style={{
display:"none"
}}
/>



{
image &&

<div>

<h2>
Captured Page
</h2>


<img
src={image}
alt="scanned page"
style={{
width:"100%",
maxWidth:"500px"
}}
/>


</div>

}


</section>

);

}


export default BookScanner;
