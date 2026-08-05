import { useState } from "react";
import ToolCard from "../components/ToolCard";
import toolsData from "../tools/toolsData";
import popularTools from "../tools/popularTools";


function Tools(){

const [search,setSearch] = useState("");

const [category,setCategory] = useState("All");



const categories = [
"All",
...new Set(toolsData.map(tool=>tool.category))
];



const filteredTools = toolsData.filter((tool)=>{


const matchSearch =
(tool.title || "")
.toLowerCase()
.includes(search.toLowerCase());

const matchCategory =
category==="All" ||
tool.category===category;


return matchSearch && matchCategory;


});



return(


<section className="tools-section">
<h1 style={{color:"red"}}>TEST TOOLS PAGE</h1>

<div className="tools-header">
<div className="popular-section">

<h2>
Popular Tools
</h2>

<div className="cards">

{
toolsData
.filter(tool=>popularTools.includes(tool.id))
.map(tool=>(

<ToolCard

key={tool.id}

{...tool}

/>

))

}

</div>

</div>

<h1>
All Tools
</h1>

<p>
{toolsData.length} Free Online Tools Available
</p>

</div>


<input

className="tool-search"

type="text"

placeholder="Search tools..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

/>



<div className="categories">


{

categories.map((cat)=>(


<button

key={cat}

className={
category===cat
?"active-category"
:""
}

onClick={()=>setCategory(cat)}

>

{cat}

</button>


))

}


</div>


<h2 style={{color:"white"}}>
عدد الأدوات: {filteredTools.length}
</h2>

<p className="results-count">

Showing {filteredTools.length} tools

</p>

<div className="cards">


{

filteredTools.map((tool)=>(


<ToolCard

key={tool.id}

{...tool}

/>


))

}


</div>



{

filteredTools.length===0 &&

<p>
No tools found.
</p>

}



</section>


);

}


export default Tools;
