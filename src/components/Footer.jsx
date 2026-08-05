import { Link } from "react-router-dom";


function Footer(){

return(

<footer className="footer">


<div className="footer-brand">

<h3>
AUQAB Tools
</h3>

<p>
Free online tools for image editing, text processing,
security, and developer utilities. Fast, simple and secure.
</p>

</div>



<div className="footer-links">

<h4>
Quick Links
</h4>


<Link to="/">
Home
</Link>


<Link to="/tools">
Tools
</Link>


<Link to="/about">
About
</Link>


<Link to="/contact">
Contact
</Link>


</div>



<div className="footer-legal">

<h4>
Legal
</h4>


<Link to="/privacy">
Privacy Policy
</Link>


<Link to="/terms">
Terms of Service
</Link>


<Link to="/cookies">
Cookie Policy
</Link>


</div>



<div className="footer-bottom">

<small>
© {new Date().getFullYear()} AUQAB Tools. All rights reserved.
</small>

</div>


</footer>

);

}


export default Footer;
