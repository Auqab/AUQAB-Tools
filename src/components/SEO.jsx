import { Helmet } from "react-helmet-async";


function SEO({title,description}){


return(

<Helmet>

<title>
{title}
</title>


<meta
name="description"
content={description}
/>


<meta
name="viewport"
content="width=device-width, initial-scale=1.0"
/>


<meta
name="google-site-verification"
content="uB2mNeZn8rdB0CAauiQ10SSqV9Hbc3KOlRWeAn57RQc"
/>


</Helmet>

);

}


export default SEO;
