// function asyncFunc1(){
//     return new Promise((resolve,reject)=>{
//         setTimeout(()=>{
//             console.log("data1")
//             resolve("success")
//         },4000)
//     })
// }

// function asyncFunc2(){
//     return new Promise((resolve,reject)=>{
//         setTimeout(()=>{
//             console.log("data2")
//             resolve("success")
//         },4000)
//     })
// }

// console.log("fetching data1......")
// let p1= asyncFunc1();
// p1.then((res)=>{
//     console.log("fetching data2........");
//     let p2 = asyncFunc2();
//     p2.then((res)=>{ })
// })


function getData(dataId){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log("data",dataId)
            resolve("success")
        },2000)
    })
}




//Promise chain

getData(1)
.then((res)=>{
    return getData(2);
})
.then((res)=>{
    return getData(3)
})
.then((res)=>{
    console.log(res);
})



// //callback hell(nested callbacks)

// getData(1,() =>{
//     getData(2,() =>{
//         getData(3,() =>{
//             getData(4)
//         })
//     })
// })