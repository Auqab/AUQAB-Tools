import { useState } from "react";


function RequestService(){

const [status,setStatus] = useState("");



async function handleSubmit(e){

e.preventDefault();


const form = e.target;


const data = new FormData(form);


const response = await fetch(
"https://formspree.io/f/xeajqnkq",
{
method:"POST",
body:data,
headers:{
Accept:"application/json"
}
}
);



if(response.ok){

setStatus("Request sent successfully!");

form.reset();

}else{

setStatus("Something went wrong.");

}


}



return(

<section className="request-page">


<h1>
Request a Service
</h1>


<p className="request-subtitle">
Tell us what you need and we will contact you.
</p>



<form
className="request-form"
onSubmit={handleSubmit}
>



<input
name="name"
type="text"
placeholder="Your Name"
required
/>



<input
name="email"
type="email"
placeholder="Your Email"
required
/>



<select
name="service"
required
>

<option value="">
Select Service
</option>

<option>
Windows Scripts
</option>

<option>
Linux Automation
</option>

<option>
Custom Web Tools
</option>

<option>
API Development
</option>


</select>



<textarea
name="message"
placeholder="Describe your project"
required
></textarea>



<button type="submit">
Send Request
</button>


{
status &&
<div className="success-message">
{status}
</div>
}



</form>


</section>

);

}


export default RequestService;
