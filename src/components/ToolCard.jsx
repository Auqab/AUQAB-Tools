import { Link } from "react-router-dom";


function ToolCard({icon,title,description,path,category}){


return(

<Link 
to={path}
className="tool-card"
>


<div className="tool-icon">
{icon}
</div>


<span className="category">
{category}
</span>


<h3>
{title}
</h3>


<p>
{description}
</p>


<button>
Open Tool
</button>


</Link>

);

}


export default ToolCard;
