import { trackEvent } from "../utils/analytics";

function Services(){
return(

<section className="services-page">


<h1>
AUQAB Services
</h1>


<p className="service-subtitle">
Custom digital solutions, automation and development services.
</p>



<div className="services-grid">



<div className="service-card">

<h2>
Windows Scripts
</h2>

<p>
Custom PowerShell and Batch scripts to automate computer tasks.
</p>

<strong>
Starting from $10
</strong>

</div>



<div className="service-card">

<h2>
Linux Automation
</h2>

<p>
Server scripts and automation solutions for Linux systems.
</p>

<strong>
Starting from $15
</strong>

</div>



<div className="service-card">

<h2>
Custom Web Tools
</h2>

<p>
Create lightweight online tools for your project or business.
</p>

<strong>
Starting from $30
</strong>

</div>



<div className="service-card">

<h2>
API Development
</h2>

<p>
Connect your applications with AUQAB tool services.
</p>

<strong>
Custom Pricing
</strong>

</div>


</div>



<div className="process">


<h2>
How it works
</h2>


<p>
1. Tell us your requirements.
</p>

<p>
2. We design and develop the solution.
</p>

<p>
3. You receive the final product.
</p>


</div>

<div className="why-auqab">

<h2>
Why choose AUQAB?
</h2>

<p>
Fast, lightweight and customized digital solutions built for your needs.
</p>

<ul>

<li>
Custom solutions instead of unnecessary complex software.
</li>

<li>
Modern web technologies and automation tools.
</li>

<li>
Direct communication and personalized support.
</li>

</ul>

</div>


<div className="service-note">

<h2>
Need a custom idea?
</h2>

<p>
Tell us what you need and we will evaluate your project.
</p>

</div>

<a
href="/request-service"
className="service-btn"
onClick={()=>
trackEvent("request_service_click",{
page:"services"
})
}
>
Request Service
</a>


</section>

);

}


export default Services;
