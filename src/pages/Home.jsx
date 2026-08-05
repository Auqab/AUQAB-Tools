import { Link } from "react-router-dom";
import toolsData from "../tools/toolsData";
import ToolCard from "../components/ToolCard";


function Home(){


const featuredTools = toolsData.slice(0,4);



return(


<section className="hero">


<div className="hero-content">


<h1>
AUQAB Tools
</h1>


<p>
أدوات رقمية مجانية وسريعة تساعدك في إنجاز مهامك اليومية بسهولة.
</p>


<p className="hero-subtitle">
Free online tools for images, text, security and developers.
</p>



<Link

to="/tools"

className="generate"

>

Explore Tools

</Link>


</div>





<div className="features">


<div>
<h3>
⚡ Fast
</h3>
<p>
Quick tools directly in your browser
</p>
</div>



<div>
<h3>
🔒 Secure
</h3>
<p>
Your files stay on your device
</p>
</div>



<div>
<h3>
🌐 Online
</h3>
<p>
Use tools anywhere anytime
</p>
</div>



<div>
<h3>
🆓 Free
</h3>
<p>
No registration required
</p>
</div>


</div>





<section className="featured-tools">


<h2>
Popular Tools
</h2>


<div className="cards">


{

featuredTools.map((tool)=>(

<ToolCard

key={tool.id}

{...tool}

/>

))

}


</div>


</section>




</section>


);

}


export default Home;
