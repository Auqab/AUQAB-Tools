import { useState } from "react";
import SEO from "../components/SEO";
import { QRCodeCanvas } from "qrcode.react";
function URLShortener(){

const [url,setUrl] = useState("");
const [shortUrl,setShortUrl] = useState("");
const [copied,setCopied] = useState(false);
const [history,setHistory] = useState(
JSON.parse(localStorage.getItem("urlHistory")) || []
);


function shorten(){

if(!url) return;


const exists = history.find(
(item)=>item.original === url
);

if(exists){

setShortUrl(exists.short);
return;

}


const code = Math.random()
.toString(36)
.substring(2,8);

const short = `auqab.tools/${code}`;

setShortUrl(short);


const newLink = {
original:url,
short:short
};


const updated = [
newLink,
...history
];


setHistory(updated);


localStorage.setItem(
"urlHistory",
JSON.stringify(updated)
);

}


function copy(){

navigator.clipboard.writeText(shortUrl);

setCopied(true);

setTimeout(()=>{
setCopied(false);
},2000);

}


return(
<>

<SEO

title="Free URL Shortener - AUQAB Tools"

description="Shorten your links quickly."

/>


<section className="tool-page">

<div className="password-card">


<h1>
🔗 URL Shortener
</h1>


<p>
Create shorter links instantly
</p>


<input

value={url}

onChange={(e)=>setUrl(e.target.value)}

placeholder="Paste your long URL"

/>


<button
className="generate"
onClick={shorten}
>
Shorten URL
</button>


{
shortUrl &&

<div className="password-result">

<input
value={shortUrl}
readOnly
/>

<QRCodeCanvas
value={shortUrl}
size={150}
/>

<button onClick={copy}>
{copied ? "Copied ✓" : "Copy Link"}
</button>

</div>

}

{
history.length > 0 &&

<div className="history">


<h2>
Recent Links
</h2>


{
history.map((item,index)=>(

<div className="history-item" key={index}>


<p>
{item.original}
</p>

<div className="history-actions">

<button
onClick={()=>{
navigator.clipboard.writeText(item.short)
}}
>
Copy
</button>


<button
onClick={()=>{
window.open(
"https://" + item.short,
"_blank"
)
}}
>
Open
</button>


</div>

<strong>
{item.short}
</strong>

<button

className="clear"

onClick={()=>{

setHistory([]);

localStorage.removeItem("urlHistory");

}}

>

Clear History

</button>

</div>

))

}


</div>

}

</div>

</section>


</>

)

}


export default URLShortener;
