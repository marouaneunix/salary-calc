#!/usr/bin/env node

import chalk from "chalk";
import figlet from "figlet";
import inquirer from "inquirer";
import  {calculImpot} from "./salary-calc.js";


const init = () => {
  console.log(
    chalk.green(
      figlet.textSync("Calculate My SALARY", {
        horizontalLayout: "default",
        verticalLayout: "default",
      })
    )
  );
}

const askQuestions = () => {
  const questions = [
    {
      name: "averageDailyRate",
      type: "number",
      message: "What is your average Daily Rate in MAD?"
    },
    {
      type: "list",
      name: "contractType",
      message: "What is the contract type?",
      choices: ["SARLAU", "PHYSICAL_PERSON", "EMPLYEE"]
    }
  ];
  return inquirer.prompt(questions);
};

const success = (salaryInfo) => {
  console.log(
    chalk.white.bgGreen.bold(`Your net salary per year is ${salaryInfo.net}`)
  );
  console.log(
    chalk.white.bgGreen.bold(`Your brut salary per year is ${salaryInfo.brut}`)
  );
};

const run = async () => {
  // show script introduction
  init();
  // ask questions
  const answers = await askQuestions();
  const { averageDailyRate, contractType } = answers;
  // create the file
  const salaryInfo = calculImpot(averageDailyRate, contractType);
  // show success message
  success(salaryInfo);
};

run();
