import { useState } from "react";
import SEO from "../components/SEO";


function ScriptGenerator(){

const [type,setType] = useState("bat");
const [script,setScript] = useState("");



const scripts = {


clean_temp: {
name:"Clean Temporary Files",
bat:`@echo off
echo Cleaning temporary files...
del /q/f/s %TEMP%\\*
echo Done.
pause`,
ps1:`Write-Host "Cleaning temporary files..."
Remove-Item "$env:TEMP\\*" -Recurse -Force`,
sh:`#!/bin/bash
echo "Cleaning temporary files..."
rm -rf /tmp/*
echo "Done"`
},



system_info:{
name:"System Information",
bat:`@echo off
systeminfo
pause`,
ps1:`Get-ComputerInfo`,
sh:`#!/bin/bash
uname -a`
},



network_check:{
name:"Network Check",
bat:`@echo off
ipconfig
ping google.com
pause`,
ps1:`Test-NetConnection google.com`,
sh:`#!/bin/bash
ping google.com`
}


};



const [selected,setSelected] = useState("clean_temp");



function generate(){

setScript(
scripts[selected][type]
);

}



function download(){

const extension =
type==="bat"
?".bat":
type==="ps1"
?".ps1"
:".sh";


const blob = new Blob(
[script],
{type:"text/plain"}
);


const url = URL.createObjectURL(blob);


const link=document.createElement("a");

link.href=url;

link.download="auqab-script"+extension;

link.click();

}



return(

<>

<SEO

title="Free Script Generator - Create PC Scripts Online"

description="Generate ready-to-use Windows, PowerShell and Linux scripts with AUQAB Script Generator."

/>


<section className="tool-page">


<div className="password-card">


<h1>
💻 Script Generator
</h1>


<p className="tool-description">
Create useful computer scripts for Windows, PowerShell and Linux.
</p>



<select

value={selected}

onChange={(e)=>setSelected(e.target.value)}

>

{

Object.keys(scripts).map(key=>(

<option key={key} value={key}>
{scripts[key].name}
</option>

))

}

</select>



<select

value={type}

onChange={(e)=>setType(e.target.value)}

>

<option value="bat">
Windows Batch (.bat)
</option>

<option value="ps1">
PowerShell (.ps1)
</option>

<option value="sh">
Linux Shell (.sh)
</option>

</select>




<button

className="generate"

onClick={generate}

>
Generate Script
</button>



<textarea

rows="12"

value={script}

readOnly

placeholder="Your script will appear here..."

></textarea>



{

script &&

<button

className="download-btn"

onClick={download}

>
Download Script
</button>

}



<div className="info-section">


<h2>
About Script Generator
</h2>


<p>
Create simple automation scripts for system tasks without writing code from zero.
</p>



<h2>
Supported Scripts
</h2>


<ul>
<li>Windows Batch Files</li>
<li>PowerShell Scripts</li>
<li>Linux Shell Scripts</li>
</ul>


<h2>
Frequently Asked Questions
</h2>


<h3>
Are generated scripts safe?
</h3>

<p>
Scripts are designed for basic system tasks. Always review a script before running it.
</p>


</div>


</div>


</section>


</>

);

}


export default ScriptGenerator;
