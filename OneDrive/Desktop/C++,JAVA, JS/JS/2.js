console.log("JavaSript");
let a = 4;
let b = "4";
console.log("a==b", a == b); //it returns true, but if used === then it returns false as it checks the datatype also.

let grade;
let marks = prompt("Enter marks:");
if (marks >= 80 && marks <= 100) {
    grade = "A";
} else if (marks >= 70 && marks <= 79) {
    grade = "B";
} else if (marks >= 60 && marks <= 69) {
    grade = "C";
} else if (marks >= 50 && marks <= 59) {
    grade = "D";
} else {
    grade = "F";
}
console.log("Your grade is: ", grade);


let age = 25;
//Ternary operators:
//format: a?b:c(a is the condition, b is true part and c is false part)//
//console.log(age > 18 ? "adult" : "not adult");


// let num = prompt("Enter a number");
// if (num % 5 == 0) {
//     console.log(num, "is Divisble by 5.")
// } else {
//     console.log(num, "is not divisible by 5 ");
// }