                                                
                                                <!-- this script is provided by https://www.javascriptfreecode.com coded by: Kerixa Inc. -->
<!DOCTYPE html>
<html lang="en">
<head>

    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Animated Background With Scrolling</title>

<!-- font awesome library include 4.7 -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" integrity="sha512-5A8nwdMOWrSz20fDsjczgUidUBR8liPYU+WymTZP1lmY9G6Oc7HlZv156XqnsgNUzTyMefFTcsFH/tnJE/+xBg==" crossorigin="anonymous" referrerpolicy="no-referrer" />

<!-- font library -->
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">

<!-- css styles -->
<style>
 
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap'); 

/* default light theme */
:root, html{
  margin: 0;
  padding: 0;
  font-family: "Inter", arial, monospace;

  --primary-color: #f45b69;
  --secondary-color:#456990;
  --background-color: white;
  --button-color: black;
  --button-bg-color: yellow;
  --opacity: 0.75;
}

/* dark-mode theme */
:root[data-theme="dark-mode"]{
  

}


/* main styles */
html, body{
  height: 100%;
  margin: 0;
  padding: 0;

}

body{
  position: relative;
}

*{
  box-sizing: border-box;
  font-family: "Inter", arial, monospace;
  font-size: 1rem;
  transition: all 0.5s ease-in-out;
}

a{
  text-decoration: none;
  font-weight: 600;
  color: var(--secondary-color);
}

a:hover{
  color: var(--primary-color); 
}
main{

  position: absolute;
  top: 0;
  left:0; 
  z-index: 1000;

  width: 100%;

}

/* navigation */
nav{
  display: flex;
  justify-content: space-between;
  background-color: var(--background-color);
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);

  position: fixed;
  top: 0;
  width: 100%;

  z-index: 2000;
}
nav ul{
  display: flex;
  align-items: center;
  justify-content: center;
}
nav ul li{
  display: flex;
  list-style-type: none;
  min-width: 5rem;
  margin: 1rem;
}

nav .logo{
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem;
}

nav .logo i{
  color: var(--secondary-color);
}

button.login{
  border: 2px var(--secondary-color) solid;
  padding: 0.5rem;
  background: transparent;
  font-weight: bold;
  color: var(--secondary-color);
}

button.login:hover{
  border: 2px var(--primary-color) solid;
  color: var(--button-color);
}

section{
  height: 100vh;  
}

.section-bg{

  width: 100%;
  position: fixed;
  bottom: 0;
  
}

section:first-child{
  background-color: rgba(90, 169, 230, var(--opacity));
}

section:nth-child(2){
  background-color: rgba(127, 200, 248, var(--opacity));
}

section:nth-child(3){
  background-color: rgba(249, 249, 249, var(--opacity));
}

section:nth-child(4){
  background-color: rgb(255, 228, 94, var(--opacity));
}

section:last-child{
  background-color: rgb(255, 99, 146, var(--opacity));
} 

</style>
</head>

<body>

<nav>
  <div class="logo"><a href="http://www.javascriptfreecode.com">Javascript Free Code</a></div>
  <ul>
    <li><a href="">SERVICES</a></li>
    <li><a href="">CONTACT US</a></li>

    <li><button class="login">LOGIN / SIGN UP</button></li>
  </ul>
</nav>

<!-- change svg url here -->
<object id="svg-bg" type="image/svg+xml" data="./buildings.svg" class="section-bg">
</object>

<main>

  <div id="main">
    <section id="section1">
    
    </section>
  
    <section id="section2">
      
    </section>
  
    <section id="section3">
      
    </section>
  
    <section id="section4">
      
    </section>
  
    <section id="section5">
      
    </section>
  </div>


</main>

  


<script>


/*   

Tutorial Description

Drawing a background SVG line-art as you scroll up and down the page. Resizing also updates the position of the line-art. In this case, here is a sample cityscape line-art that "draws" itself as you scroll the page.

*/


const sections = document.querySelectorAll("section");
let pathLength = 0;
let path;
let scrollPercent = 0;
let heightLimit;



window.onload =  () => {

  // ensure svg is loaded before accessing paths 
  const svg = document.getElementById("svg-bg").contentDocument;

  path = svg.querySelector("path");
  const stylesArr = getInlineStyles(path.style.cssText);

  path.removeAttribute("style");
 
  stylesArr.forEach(style => {
    path.setAttribute(style[0], style[1]);
  })

  // Trigger resize event on page laod
  window.dispatchEvent(new Event("resize"));

  // Scroll event listener
  window.addEventListener("scroll", event => {
      draw(path, heightLimit, pathLength)  
  })
};



// Resize event listener
window.addEventListener("resize", event => {

    const body = document.body;
    const html = document.documentElement;
    heightLimit =  body.scrollHeight - window.innerHeight;

    pathLength = Math.ceil(path.getTotalLength());

    // length of animation
    path.style.strokeDasharray = pathLength;
    
    // hide animation 
    path.style.strokeDashoffset = pathLength;

    // update animation state if starting scroll in middle of page
    draw(path, heightLimit, pathLength);
})


/*
  This function converts styles in the "style" property of the svg and returns an array of the actual properties
*/
function getInlineStyles(styles){

  const stylesArr = styles.split(";")
  let arr= [];

  stylesArr.forEach( item => {

    if(item.length > 0){
      const e = item.split(":")

      const f = [e[0].trim(), e[1].trim()];
      arr.push(f);
    }
  })

  return arr;
}


function draw(path, heightLimit, pathLength){
   const curPos = window.scrollY;  
   const curPercentage = curPos / heightLimit ;
   const val = curPercentage * pathLength;
   path.style.strokeDashoffset = pathLength - val;
}


</script>
</body>
</html><a target='_blank' href='https://www.javascriptfreecode.com' style='font-size: 8pt; text-decoration: none'>JavaScript Best Codes</a>                                                
                                            
