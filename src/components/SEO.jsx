import { Helmet } from "react-helmet-async";


function SEO({
title="AUQAB Tools - Free Online Digital Tools",
description="Free online tools for productivity, security, images and developers.",
keywords="online tools, QR generator, password generator, image compressor, AUQAB Tools"
}){


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
name="keywords"
content={keywords}
/>



<meta
name="viewport"
content="width=device-width, initial-scale=1.0"
/>



<meta
name="google-site-verification"
content="uB2mNeZn8rdB0CAauiQ10SSqV9Hbc3KOlRWeAn57RQc"
/>



<meta
property="og:title"
content={title}
/>



<meta
property="og:description"
content={description}
/>



<meta
property="og:type"
content="website"
/>



<meta
property="og:url"
content="https://auqab-tools.vercel.app"
/>



<meta
name="twitter:card"
content="summary"
/>



<meta
name="twitter:title"
content={title}
/>



<meta
name="twitter:description"
content={description}
/>



</Helmet>

);

}


export default SEO;
