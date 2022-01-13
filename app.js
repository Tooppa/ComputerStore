//gets the elements that contain buttons and fields
const elements = document.getElementsByClassName('element');

//gets the buttons from the elements
const loanButton = elements.item(0).querySelector('#loan');
const payLoanButton = elements.item(0).querySelector('#payLoan');
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
const LoanButtonFunc = () => {
    //checks if there is a loan already and if so it skips
    if (!loan) {
        loanAmount = balance / 2;
        balance += loanAmount;
        loan = true;
    }
    UpdateFields();
};

//adds value from pay blance to bank balance
const BankButtonFunc = () => {
    //checks for loans
    if (loan) {
        let tenPrecent = payBalance * 0.1;
        //if 10% of the salary is less than loan amount
        if (tenPrecent < loanAmount) {
            loanAmount -= tenPrecent;
            payBalance -= tenPrecent;
        } else {
            payBalance -= loanAmount;
            loan = false;
            loanAmount = 0;

        }
    }
    balance += payBalance;
    payBalance = 0;
    UpdateFields();
};

//adds 100 to work balance
const WorkButtonFunc = () => {
    payBalance += 100;
    UpdateFields();
};

//pays the loan in full
const PayLoanFunc = () => {
    //checks for loans
    if (loan) {
        let restOfLoan = loanAmount - payBalance;
        //if you can't pay the loan in full
        if (restOfLoan > 0) {
            loanAmount -= payBalance;
            payBalance = 0;
        //if you can pay the loan in full it leaves rest of the money to your work balance
        } else {
            payBalance = -restOfLoan;
            loan = false;
            loanAmount = 0;
        }
    }
    UpdateFields();
}

//updates the fields on the site to match the correct values
const UpdateFields = () => {
    balanceField.textContent = balance;
    loanField.textContent = loanAmount;
    payField.textContent = payBalance
}

loanButton.onclick = LoanButtonFunc;
bankButton.onclick = BankButtonFunc;
workButton.onclick = WorkButtonFunc;
payLoanButton.onclick = PayLoanFunc;

UpdateFields();