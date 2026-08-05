import { Link } from "react-router-dom";


function ToolCard({icon,title,description,path,category}){


return(

<article className="tool-card">


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



<Link

to={path}

className="open-tool"

>

Open Tool

</Link>


</article>

);

}


export default ToolCard;
