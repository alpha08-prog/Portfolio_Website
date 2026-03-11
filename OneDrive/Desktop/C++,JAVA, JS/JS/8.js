const getPromise = () =>{
    return new Promise((resolve,reject) =>{
        console.log("I'm a promise")
        resolve("success")
        //reject("network error")
    })
}

let promise = getPromise();
promise.then((res)=>{
    console.log("promise fulfilled",res);
})

promise.catch((err)=>{
    console.log("rejected",err)
})

// function getData(dataId, getNextdata){//example of a data from API
//     return new Promise((resolve,reject) =>{
//         setTimeout(()=>{
//             console.log("data",dataId);
//             resolve("success");
//             if(getNextdata){
//                 getNextdata();
//             }
//         },5000)
//     })
// }




// //asynchronus programming
// console.log("one")
// console.log("two")
// console.log("three")

// setTimeout(() => {
//     console.log("hello");
// }, 4000);//timeout

// console.log("four")
// console.log("five")


// function getData(dataId, getNextdata) {
//  //2sec   
//     setTimeout(() => {
//         console.log("data", dataId)
//         if(getNextdata){
//             getNextdata();
//         }
//     },2000)
// }

// //callback hell(nested callbacks)
// getData(1,() =>{
//     getData(2,() =>{
//         getData(3,() =>{
//             getData(4)
//         })
//     })
// })