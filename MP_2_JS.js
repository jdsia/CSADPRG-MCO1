//********************
//Last names: Sia
//Language: Javascript
//Paradigm(s): OOP 
//********************

const readlineSync = require('readline-sync');


// add other classes for the banking app here
/*
bank acc
currency exchange
interest calculator 
*/


/*
Register acc name -> handled by the constructor
Deposit amount -> method to add amount to balance
Withdraw amount -> method to subtract the amount from the balance.
*/
class BankAccount {
  constructor(accountName) {
    this.accountName = 'Not Registered';
    this.balance = 0;
  }

  setAccountName(name){
    this.accountName = name;
    // TODO: add an if else for invalid names (i.e name length = 0)
    console.log(`Account name set to ${this.accountName}`)
  }
  
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


class bankingApp {
  constructor() {
    this.bankAccount = new BankAccount();
    this.isRunning = true;
  }

  // entry point to start app
  start() {
    while (this.isRunning) {
      console.log("Welcome to the Banking App - Sia")
      this.displayMainMenu();
      // add the choice handling logic here
      const choice = readlineSync.question("Please choose from Options [1] -> [7]: ");
      console.log(choice);
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

  // case should be '1' instead of 1 because the input is gotten as a string.
  handleMainMenuChoice(choice){
    switch(choice) {
      case '1': 
        this.handleRegisterAccount();
        break;
      case '2':
        //handleDeposit();
        break;
      case '3': 
        //handleWithdraw();
        break;
    }
  }

  handleRegisterAccount(){
    console.log("Register Account Name");
    const name = readlineSync.question("Account Name: ");
    this.bankAccount.setAccountName(name);
    
  }

}


// 
const app = new bankingApp();
app.start();
