import { Link } from "react-router-dom";


function Navbar(){

return(

<header className="header">

<div className="logo">

<span>
AUQAB
</span>

<small>
Tools
</small>

</div>


<nav className="nav">

<Link to="/">
Home
</Link>


<Link to="/tools">
Tools
</Link>


<Link to="/about">
About
</Link>

<Link to="/premium">
Premium
</Link>

<Link to="/services">
Services
</Link>

<Link to="/pricing">
Pricing
</Link>

<Link to="/request-service">
Request Service
</Link>

</nav>


</header>

);

}


export default Navbar;
