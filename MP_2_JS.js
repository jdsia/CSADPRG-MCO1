//********************
//Last name: Sia (Lead), Sayat, Lim, Vanguardia Language: Javascript
//Paradigm(s): OOP 
//********************

const readlineSync = require('readline-sync');


class BankAccount {
  constructor() {
    this.accountName = 'Not Registered';
    this.balance = 0;
    this.currency = 'PHP';
  }

  setAccountName(name){
    this.accountName = name;
    console.log(`Account name set to ${this.accountName}`)
  }


  displayAccountInfo() {
    console.log(`Account Name: ${this.accountName}`);
    console.log(`Current Balance: ${this.balance.toFixed(2)} \nCurrency: ${this.currency}`);
  }
  
  deposit(amount) {
    if (amount > 0) {
      this.balance += amount;
      return true;
    }
    return false;
  }

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

  // fromCode = default PHP, toCode = index of foreign currency
  // dont get input here. Do it form the handleCurrencyExchange function
  exchange(amount, fromCode, toCode){
    if ((fromCode !== 'PHP' && this.currencyRates[fromCode] <= 0) || (toCode !== 'PHP' && this.currencyRates[toCode] <= 0)) {
    // Inform the user that a required rate is missing.
    console.log("Error: One or both currency rates have not been recorded yet.");
    }
    let amountInBase = 0;

    if(fromCode === this.baseCurrency) {
      amountInBase = amount;
    } else {
      amountInBase = amount * this.currencyRates[fromCode];
    }

    let finalAmount = 0;
    if (toCode === this.baseCurrency) {
      finalAmount = amountInBase;
    } else {
      finalAmount = amountInBase / this.currencyRates[toCode];
    }

    return finalAmount;

  }

  updateRate(currencyCode, newRate) {
    if (this.currencyRates.hasOwnProperty(currencyCode)) {
      this.currencyRates[currencyCode] = newRate;
      console.log(`Success: Rate for ${currencyCode} updated to ${newRate.toFixed(2)}`);
    }
  }
}

class interestAmount {
  constructor() {
    this.annualRate = 0.05;
  }

  projectInterest(startBalance, numDays) {
    console.log("\n--- Interest Projection ---");
    console.log("Interest Rate: ${this.annualRate * 100}%");

    console.log("\nDay | Interest | Balance");
    console.log("----------------------------");

    let currentBalance = startBalance;

    for (let day = 1; day <= numDays; day++) {
      const dailyInterest = currentBalance * (this.annualRate / 365);
      currentBalance += dailyInterest;
      console.log(
        `${day.toString().padEnd(3)} | ${dailyInterest.toFixed(2).padEnd(8)} | ${currentBalance.toFixed(2)}`
      );
    }
    console.log("----------------------------");
  }
}


class bankingApp {
  constructor() {
    this.bankAccount = new BankAccount();
    this.currencyExchange = new CurrencyExchange();
    this.interestAmount = new interestAmount();
    this.isRunning = true;
  }

  // entry point to start app
  start() {
    while (this.isRunning) {
      this.displayMainMenu();
      // add the choice handling logic here
      let choice = readlineSync.question("Please choose from Options [1] -> [7]: ");
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
        break;
      case '5':
        this.handleRecordRate();
        break;
      case '6':
        this.handleInterest();
        break;
      case '7':
        console.log("Program Terminated!")
        process.exit();
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
    // Parse String to float
    const amount = parseFloat(strAmount);
    this.bankAccount.deposit(amount);
    console.log(`Deposited Amount [${amount}]`)
    console.log(`New Balance is Balance: ${this.bankAccount.balance.toFixed()}`)
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
    console.log("\nSource Currency Option:")
    this.currencyExchange.displayCurrency();
    const fromChoice = readlineSync.question("Source Currency: ");
    const fromCurrency = this.currencyExchange.currencyMap[fromChoice];

    const amountStr = readlineSync.question("Source Amount: ");
    const amount = parseFloat(amountStr);
    

    console.log("\nForeign Currency Option:")
    this.currencyExchange.displayCurrency()
    const toChoice = readlineSync.question("Exchange Currency: ");
    const toCurrency = this.currencyExchange.currencyMap[toChoice];

    const convertedAmount = this.currencyExchange.exchange(amount, fromCurrency.code, toCurrency.code);
    
    if (convertedAmount !== null) {
    console.log("\n--- Exchange Result ---");
    console.log(`${amount.toFixed(2)} ${fromCurrency.code} = ${convertedAmount.toFixed(2)} ${toCurrency.code}`);
    } else {
      console.log("Could not perform conversion. Please check the error message above.");
    }
  }

  handleRecordRate() {
    console.log("\n--- Record Exchange Rates ---");
    this.currencyExchange.displayCurrency();
    const choice = readlineSync.question("Select Foreign Currency:");
    const currency = this.currencyExchange.currencyMap[choice];

    if (!currency) {
      console.log("Error: Invalid selection. Please choose a number from the list.");
      return;
    }

    const rateStr = readlineSync.question(`Enter the new rate for 1 ${currency.code} to PHP: `);
    const rate = parseFloat(rateStr);

    if (isNaN(rate) || rate <= 0) {
      console.log("Error: Invalid rate. Please enter a positive number.");
      return;
    }

    this.currencyExchange.updateRate(currency.code, rate);
  }

  handleInterest() {
  console.log("\n--- Show Interest Computation ---");
    this.bankAccount.displayAccountInfo();
    const dayStr = readlineSync.question("Total Number of Days ");
    const days = parseInt(dayStr);

    if (isNaN(days) || days <= 0) {
      console.log("Error: Invalid Number of Days, Please enter a proper number")
      return;
    }

    this.interestAmount.projectInterest(this.bankAccount.balance, days);
  }


}

const app = new bankingApp();
app.start();
