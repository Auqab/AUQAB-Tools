import { Link } from "react-router-dom";


function Footer(){

return(

<footer className="footer">


<h3>
AUQAB Tools
</h3>


<p>
Free Digital Tools
</p>


<div className="footer-links">


<Link to="/privacy">
Privacy Policy
</Link>


<Link to="/terms">
Terms of Service
</Link>


<Link to="/contact">
Contact
</Link>


</div>


<small>
© 2026 AUQAB Tools
</small>


</footer>

);

}


export default Footer;
