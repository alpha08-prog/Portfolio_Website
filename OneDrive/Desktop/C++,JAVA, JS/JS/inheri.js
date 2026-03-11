class Humans {
    eat() {
        console.log("eat")
    }

    sleep() {
        console.log("sleep")
    }

    work() {
        console.log("do nothing")
    }
};

class Engineer extends Humans {
    work() {
        console.log("solve problems");
    }
}


class Doctor extends Humans {
    work() {
        console.log("treat patients");
    }
}

let Atharva = new Engineer();
let Rohan = new Doctor(); 