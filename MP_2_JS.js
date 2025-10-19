//********************
//Last names: Sia
//Language: Javascript
//Paradigm(s): OOP is good Daw 
//********************

const readlineSync = require('readline-sync');


// add other classes for the banking app here
/*
bank acc
currency exchange
interest calculator 
*/

class bankingApp {
  constructor() {
    this.isRunning = true;
  }

  // entry point to start app
  start() {
    while (this.isRunning) {
      console.log("Welcome to the Banking App - Sia")
      this.displayMainMenu();
      // add the choice handling logic here
      const choice = readlineSync.question("Please choose from Options [1] -> [7]: ");
      if (choice < '1' || choice > '7') {
        console.log("Invalid choice. Please choose a number from 1 to 7");
        choice = readlineSync.question("Please choose from Options [1] -> [7]: ");
      }
      //this.handleMainMenuChoice(choice);
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

}




const app = new bankingApp();
app.start();
