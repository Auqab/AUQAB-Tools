import { Link } from "react-router-dom";


function Home(){

return(

<section className="hero">

<h1>
AUQAB Tools
</h1>


<p>
أدوات رقمية مجانية وسريعة تساعدك في إنجاز مهامك اليومية بسهولة.
</p>


<Link
to="/tools"
className="generate"
>
Explore Tools
</Link>


</section>

);

}


export default Home;
