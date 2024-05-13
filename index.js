#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// Initialize user balance and pin code
let myBlalance = 10000;
let myPin = 200599;
// print Welcome message 
console.log(chalk.blueBright("\n \tWelcome to code with Sadia - ATM Machine\n"));
let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        type: "number",
        message: chalk.green("Enter your pin code:")
    }
]);
if (pinAnswer.pin === myPin) {
    console.log(chalk.yellow("\nPin is correct, login Successfully!\n"));
    // console.log(` current Account Balance is ${myBlalance}`)
    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            type: "list",
            message: "Select an operation:",
            choices: ["Withdraw Amount", "Check Balance"]
        }
    ]);
    if (operationAns.operation === "Withdraw Amount") {
        let WithdrawAns = await inquirer.prompt([
            {
                name: "WithdrawMethod",
                type: "list",
                message: "Select a Withdrawal method:",
                choices: ["Fast Cash", "Enter Amount"]
            }
        ]);
        if (WithdrawAns.WithdrawMethod === "Fast Cash") {
            let fastCashAns = await inquirer.prompt([
                {
                    name: "FastCash",
                    type: "list",
                    message: "Select Amount:",
                    choices: [1000, 3000, 5000, 10000, 20000, 50000]
                }
            ]);
            if (fastCashAns.FastCash > myBlalance) {
                console.log(chalk.red("Insufficient Balance"));
            }
            else {
                myBlalance -= fastCashAns.FastCash;
                console.log(`${fastCashAns.FastCash} withdraw Successfully`);
                console.log(`Your Remaining Balance is: ${myBlalance}`);
            }
        }
        else if (WithdrawAns.WithdrawMethod === "Enter Amount") {
            let amountAns = await inquirer.prompt([
                {
                    name: "amount",
                    type: "number",
                    message: "Enter the amount to Withdraw:",
                }
            ]);
            if (amountAns.amount > myBlalance) {
                console.log("Insufficient Balance");
            }
            else {
                myBlalance -= amountAns.amount;
                console.log(`${amountAns.amount} Withdraw Succcessfully`);
                console.log(`Your Remaining Balance is: ${myBlalance} `);
            }
        }
    }
    else if (operationAns.operation === "Check Balance") {
        console.log(`Your Account Balance is: ${myBlalance}`);
    }
}
else {
    console.log(chalk.red("pin is Incorrect, Try Again!"));
}
