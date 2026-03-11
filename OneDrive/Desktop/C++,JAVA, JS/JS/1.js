const newbgColor = document.querySelector('.box-3');

function changeColor() {
    newbgColor.style.backgroundColor = 'red';
};

newbgColor.addEventListener('mouseover', changeColor);

const btn2 = document.querySelector('.box-2');

function alertBtn() {
    alert('I also love JavaScript');
}
btn2.addEventListener('click', alertBtn);