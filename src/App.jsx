import { Routes, Route } from "react-router-dom";
import "./App.css";
import TextCounter from "./pages/TextCounter";
import ImageCompressor from "./pages/ImageCompressor";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import URLShortener from "./pages/URLShortener";
import Home from "./pages/Home";
import Tools from "./pages/Tools";
import About from "./pages/About";
import QRGenerator from "./pages/QRGenerator";
import PasswordGenerator from "./pages/PasswordGenerator";


function App(){

return(

<div className="app">


<Navbar/>


<Routes>

<Route path="/url-shortener" element={<URLShortener />} />
<Route path="/text-counter" element={<TextCounter />} />
<Route 
path="/tools/password-generator"
element={<PasswordGenerator/>}
/>

<Route path="/" element={<Home/>}/>

<Route path="/tools" element={<Tools/>}/>

<Route path="/about" element={<About/>}/>

<Route 
path="/tools/qr-generator"
element={<QRGenerator/>}
/>

<Route
path="/tools/image-compressor"
element={<ImageCompressor />}
/>

</Routes>


<Footer/>


</div>

);

}


export default App;
