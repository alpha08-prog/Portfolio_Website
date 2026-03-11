let div = document.querySelector("div");

if (div) {
    div.onmouseover = () => {
        console.log("You are inside div");
    };
}

let modeBtn = document.querySelector("#mode")
let currMode = "light";

modeBtn.addEventListener("click", () => {
    //console.log("you are trying to change mode");
    if (currMode === "light") {
        currMode = "dark";
        document.querySelector("body").style.backgroundColor= "black"
    } else {
        currMode = "light";
        document.querySelector("body").style.backgroundColor= "white"
    }
    console.log(currMode)
})

