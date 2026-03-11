let n = prompt("Enter the number")

let arr = []
for(let i=1; i<=n; i++){
    arr[i-1] = i;
}
let newAr = arr.reduce((res,pre)=>{
    return res+pre
})
console.log(newAr)

let newArr = arr.reduce((prev,curr)=>{
    return (prev*curr)
})

console.log(newArr)