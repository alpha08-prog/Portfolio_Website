const employee = {
    calcTax() {
        console.log("tax rate is 10%")
    },
}

const abc = {
    salary : 50000,
    calcTax() {
        console.log("tax is 20%")
    },
}

abc.__proto__ = employee;

class Toyota {
    start() {
        console.log("start")
    }

    constructor(brand,milege){
        this.brand=brand;
        this.milege=milege;
        console.log("creating new object");
    }

    stop() {
        console.log("stop")
    }

    // setBrand(brand) {
    //     this.brandname = brand;
    // }
};

let fortuner = new Toyota("Toyota",10);
console.log(fortuner)
let lexus = new Toyota("Lexus",8);
console.log(lexus)
