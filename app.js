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
const laptopField = elements.item(2).querySelector('#laptops');
const laptopFeatures = elements.item(2).querySelector('#features');

//api
const apiAddress = 'https://noroff-komputer-store-api.herokuapp.com/computers';

//data storage
let balance = 0;
let loan = false;
let loanAmount = 0;

let payBalance = 0;

let laptops = [];
let selectedLaptop = 0;

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

//add laptops to the fields
const HandleLaptops = (laptops) => {
    laptops.map(laptop => {
        const laptopElement = document.createElement('option');
        laptopElement.value = laptop.id;
        laptopElement.appendChild(document.createTextNode(laptop.title));
        laptopField.appendChild(laptopElement);
    })
    laptopFeatures.textContent = laptops[0].description;
}
//updates thecorrect laptop information on the fields
const HandleLaptopChange = e =>{
    const currentLaptop = laptops[e.target.selectedIndex];
    laptopFeatures.textContent = currentLaptop.description;
}

//updates the fields on the site to match the correct values
const UpdateFields = () => {
    balanceField.textContent = balance;
    loanField.textContent = loanAmount;
    payField.textContent = payBalance
}

//initialising buttons
loanButton.onclick = LoanButtonFunc;
bankButton.onclick = BankButtonFunc;
workButton.onclick = WorkButtonFunc;
payLoanButton.onclick = PayLoanFunc;

//eventlisteners
laptopField.onchange = HandleLaptopChange;

//gets the values in json form from the api
fetch(apiAddress)
    .then(res => res.json())
    .then(data => laptops = data)
    .then(laptops => HandleLaptops(laptops));

UpdateFields();