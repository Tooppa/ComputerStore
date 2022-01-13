//gets the elements that contain buttons and fields
const elements = document.getElementsByClassName('element');

//gets the buttons from the elements
const loanButton = elements.item(0).querySelector('#loan');
const bankButton = elements.item(1).querySelector('#bank');
const workButton = elements.item(1).querySelector('#work');

//gets the fields that show info
const balanceField = elements.item(0).querySelector('#balance');
const loanField = elements.item(0).querySelector('#loanAmount');
const payField = elements.item(1).querySelector('#pay');

//data storage
let balance = 0;
let loan = false;
let loanAmount = 0;

let payBalance = 0;

//functions for the buttons
const LoanButtonFunc = () =>{
    //checks if there is a loan already and if so it skips
    if (!loan){
        loanAmount = balance / 2;
        balance += loanAmount;
        loan = true;
    }
    UpdateFields();
};

const BankButtonFunc = () =>{
    balance += payBalance;
    payBalance = 0;
    UpdateFields();
};

const WorkButtonFunc = () =>{
    payBalance += 100;
    UpdateFields();
};

//updates the fields on the site to match the correct values
const UpdateFields = () =>{
    balanceField.textContent = balance;
    loanField.textContent = loanAmount;
    payField.textContent = payBalance
}

loanButton.onclick = LoanButtonFunc;
bankButton.onclick = BankButtonFunc;
workButton.onclick = WorkButtonFunc;

UpdateFields();