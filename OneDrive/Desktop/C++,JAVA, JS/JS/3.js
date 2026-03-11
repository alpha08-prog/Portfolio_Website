//Event Probagation

window.addEventListener("click",function(){
    console.log("Window");
},false);

document.addEventListener("click",function(){
    console.log("Document");
},false);

document.querySelector('.inner-box').addEventListener("click",function(){
    console.log("Inner Box");
},{once:true});

document.querySelector('.outer-box').addEventListener("click",function(){
    console.log("outer-box");
},false);

document.querySelector('.button').addEventListener("click",function(e){
    console.log(e.target.innerText = "Clicked!");
},false);