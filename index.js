// Balance
const balance = document.getElementById("balance");

// Income
const money_plus = document.getElementById("money-plus");
  
// Expense
const money_minus = document.getElementById("money-minus");
  
// Other Element Variables
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
const category = document.getElementById("cat");

// Local Storage
const localStorageTransactions = JSON.parse(localStorage.getItem('transactions')); 
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

// Adding EventListner
form.addEventListener('submit',addTransaction);

//Add Transaction
function addTransaction(e){
  e.preventDefault();
  if(text.value.trim() === ''){
    alert('Please Enter Transaction Name')
  }
  else if(amount.value.trim() === ''){
    alert('Please Enter Amount')
  }
  else if(amount.value.trim() === '0'){
    alert('Please Enter Valid Amount')
  }
  else{
    const transaction = {
      id:generateID(),
      text:text.value,
      amount:+amount.value
    }

    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateValues();
    updateLocalStorage();
    text.value='';
    amount.value='';
  }
}

//Generate Random ID
function generateID(){
  return Math.floor(Math.random()*1000000000);
}

//Add Trasactions to DOM list
function addTransactionDOM(transaction) {
  //GET sign
  // const sign = transaction.amount < 0 ? "-" : "+";
  const sign = (category.value=='inc') ? '+' : '-';
  if(sign=='-'){
    if(transaction.amount>0)
    transaction.amount *= -1;
  }
  else if(sign=='+'){
    if(transaction.amount<0)
    transaction.amount *= -1;
  }
  const item = document.createElement("li");

  //Add Class Based on Value
  item.classList.add(
    sign=='-' ? "minus" : "plus"
  );

  item.innerHTML = `
    ${transaction.text} <span>${sign}$${Math.abs(
    transaction.amount
  )}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `;
  list.appendChild(item);
}

//Update the Balance, Income & Expense
function updateValues() {
  const amounts = transactions.map(
    (transaction) => transaction.amount
  );
  const total = amounts
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const expense =
    (amounts
      .filter((item) => item < 0)
      .reduce((acc, item) => (acc += item), 0) *
    -1).toFixed(2);

    balance.innerText=`$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expense}`;
}

//Remove Transaction by ID
function removeTransaction(id){
  transactions = transactions.filter(transaction => transaction.id !== id);
  updateLocalStorage();
  Init();
}

// Updating Local Storage Transaction
function updateLocalStorage(){
  localStorage.setItem('transactions',JSON.stringify(transactions));
}

//Init App
function Init() {
  list.innerHTML = "";
  transactions.forEach(addTransactionDOM);
  updateValues();
}

Init();

