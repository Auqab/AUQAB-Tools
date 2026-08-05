import ToolCard from "../components/ToolCard";
import toolsData from "../tools/toolsData";


function Tools(){


return(

<section className="tools-section">


<h1>
All Tools
</h1>


<div className="cards">


{

toolsData.map((tool)=>(


<ToolCard

key={tool.id}

{...tool}

/>


))

}


</div>


</section>

);


}


export default Tools;
