import { Link } from "react-router-dom";
import { useState,useEffect,useRef } from "react";


function Navbar(){

const [open,setOpen] = useState(false);

const navRef = useRef();


useEffect(()=>{


function handleClickOutside(e){

if(
navRef.current &&
!navRef.current.contains(e.target)
){

setOpen(false);

}

}


document.addEventListener(
"mousedown",
handleClickOutside
);


return()=>{

document.removeEventListener(
"mousedown",
handleClickOutside
);

};


},[]);


return(

<header 
className="header"
ref={navRef}
>


<div className="logo">

<span>
AUQAB
</span>

<small>
Tools
</small>

</div>



<button
className="menu-btn"
onClick={()=>setOpen(!open)}
>
☰
</button>



<nav className={open ? "nav active" : "nav"}>


<Link to="/" onClick={()=>setOpen(false)}>
Home
</Link>


<Link to="/tools" onClick={()=>setOpen(false)}>
Tools
</Link>


<Link to="/about" onClick={()=>setOpen(false)}>
About
</Link>


<Link to="/premium" onClick={()=>setOpen(false)}>
Premium
</Link>


<Link to="/services" onClick={()=>setOpen(false)}>
Services
</Link>


<Link to="/pricing" onClick={()=>setOpen(false)}>
Pricing
</Link>


<Link to="/request-service" onClick={()=>setOpen(false)}>
Request Service
</Link>


</nav>


</header>

);

}


export default Navbar;
