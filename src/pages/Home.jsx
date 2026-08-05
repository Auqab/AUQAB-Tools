import ToolCard from "../components/ToolCard";
import toolsData from "../tools/toolsData";


function Home(){

return(

<section className="hero">

<h1>
AUQAB Tools
</h1>

<p>
أدوات رقمية مجانية وسريعة
</p>


<div className="cards">

{
toolsData.map((tool,index)=>(

<ToolCard

key={index}

icon={tool.icon}

title={tool.title}

description={tool.description}

/>

))
}

</div>


</section>

);

}


export default Home;
