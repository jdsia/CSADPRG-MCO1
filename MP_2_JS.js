//********************
//Last names: Sia
//Language: Javascript
//Paradigm(s): OOP 
//********************

const readlineSync = require('readline-sync');


// add other classes for the banking app here
/*
bank acc [X]
currency exchange
interest calculator 
*/


/*
Register acc name -> setAccountName
Deposit amount -> method to add amount to balance
Withdraw amount -> method to subtract the amount from the balance.
*/
class BankAccount {
  constructor(accountName) {
    this.accountName = 'Not Registered';
    // TODO: Probably make this into a private method, and have to access it using Getters and Setters.
    this.balance = 0;
    // PHP is the base currency
    this.currency = 'PHP';
  }

  setAccountName(name){
    this.accountName = name;
    // TODO: add an if else for invalid names (i.e name length = 0)
    console.log(`Account name set to ${this.accountName}`)
  }

  // Assuming I don't need getters in JS because the vars aren't exactly private.
  //getBalance(){
  //  return this.balance;
  //}
  
  deposit(amount) {
    if (amount > 0) {
      this.balance += amount;
      return true;
    }
    return false;
  }

  // TODO: might need to return the amount withdrawn?? 
  withdraw(amount) {
    if (amount > 0 && amount <= this.balance) {
      this.balance -= amount;
      return true;
    }
    return false;
  }

}

class CurrencyExchange {
  constructor() {
    this.baseCurrency = 'PHP';
    this.currencyMap = {
      '1': {code: 'PHP', name: 'Philippine Peso'},
      '2': {code: 'USD', name: 'United States Dollar'},
      '3': {code: 'JPY', name: 'Japanese Yen'},
      '4': {code: 'GBP', name: 'British Pound Sterling'},
      '5': {code: 'EUR', name: 'Euro'},
      '6': {code: 'CNY', name: 'Chinese Yuan Renminni'},
    };

    this.currencyRates = {
      'USD': 0, 'JPY': 0, 'GBP': 0, 'EUR': 0, 'CNY': 0,
    };
  }
  
  displayCurrency(){
    for (const key in this.currencyMap) {
      const currency = this.currencyMap[key];
      console.log(`[${key}] ${currency.name} (${currency.code})`)
    }
  }

  

}


class bankingApp {
  constructor() {
    this.bankAccount = new BankAccount();
    this.currencyExchange = new CurrencyExchange();
    this.isRunning = true;
  }

  // entry point to start app
  start() {
    while (this.isRunning) {
      this.displayMainMenu();
      // add the choice handling logic here
      const choice = readlineSync.question("Please choose from Options [1] -> [7]: ");
      if (choice < '1' || choice > '7') {
        console.log("Invalid choice. Please choose a number from 1 to 7");
        choice = readlineSync.question("Please choose from Options [1] -> [7]: ");
      }
      this.handleMainMenuChoice(choice);
    }
  }

  displayMainMenu() {
        console.log("\n======= Main Menu =======");
        console.log("[1] Register Account Name");
        console.log("[2] Deposit Amount");
        console.log("[3] Withdraw Amount");
        console.log("[4] Currency Exchange");
        console.log("[5] Record Exchange Rates");
        console.log("[6] Show Interest Computation");
        console.log("[7] Exit");
        console.log("=========================");
  }

  // case should be '1' instead of 1 because the input is a string.
  handleMainMenuChoice(choice){
    switch(choice) {
      case '1': 
        this.handleRegisterAccount();
        break;
      case '2':
        this.handleDeposit();
        break;
      case '3': 
        this.handleWithdraw();
        break;
      case '4':
        this.handleCurrencyExchange();
    }
  }

  // Option [1] Register Account
  handleRegisterAccount(){
    console.log("Register Account Name");
    const name = readlineSync.question("Account Name: ");
    this.bankAccount.setAccountName(name);
  }

  // Option [2] Deposit Money
  handleDeposit(){
    console.log("\n--- Deposit Amount ---");
    console.log(`Account Name: ${this.bankAccount.accountName}`);
    console.log(`Current Balance: ${this.bankAccount.balance.toFixed(2)} \nCurrency: ${this.bankAccount.currency}`);
    
    // readline input is a string
    let strAmount = readlineSync.question("Amount to be Deposited: ");
    const amount = parseFloat(strAmount);
    this.bankAccount.deposit(amount);
    console.log(`Deposited Amount [${amount}]`)
    console.log(`New Balance is Balance: ${this.bankAccount.balance}`)
    
  }

  // Option [3]
  handleWithdraw() {
    console.log("\n--- Withdraw Amount ---");
    console.log(`Account Name: ${this.bankAccount.accountName}`);
    console.log(`Current Balance: ${this.bankAccount.balance.toFixed(2)} \nCurrency: ${this.bankAccount.currency}`);

    let strAmount = readlineSync.question("Withdraw Amount: ");
    const amount = parseFloat(strAmount);
    this.bankAccount.withdraw(amount);
    console.log(`Updated Account Balance: ${this.bankAccount.balance}`);
  }

  // Option [4] Currency Exchange
  handleCurrencyExchange(){
    console.log('\n --- Foreign Currency Exchange ---');
    this.currencyExchange.displayCurrency();
  }


}


// 
const app = new bankingApp();
app.start();
