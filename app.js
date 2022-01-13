//gets the elements that contain buttons and fields
const elements = document.getElementsByClassName('element');

//gets the buttons from the elements
const loanB = elements.item(0).querySelector('#loan');
const bankB = elements.item(1).querySelector('#bank');
const workB = elements.item(2).querySelector('#work');

const balance = document.getElementById('balance');

const LoanButton = () =>{
    console.log("woo");
};
const BankButton = () =>{
    
};
const WorkButton = () =>{
    
};

loanB.onclick = LoanButton;