
/**
 * FREELANCE
 * INPUTS :
 *  DAILY_TAX : number (DH)
 *  SALARY: number
 *  ACCOUNTING_FEES: number
 *
 */

 const calculIS = (amount) => {
  let netAmount = 0;
  if(amount <= 300000) {
    netAmount = amount* 0.9;
  }else if (amount > 300000 && amount <= 1000000){
    netAmount = (amount* 0.8);
  }else if(amount > 1000000) {
    netAmount = (amount* 0.69);
  }
  return netAmount;

}

const calculIR = (amount) => {
  let netAmount = 0;
  if(amount <= 30000) {
    netAmount = amount;
  }else if (amount > 30000 && amount <= 50000){
    netAmount = (amount* 0.9);
  }else if (amount > 50000 && amount <= 60000) {
    netAmount = (amount* 0.8);
  }else if (amount > 60000 && amount <= 80000) {
    netAmount = (amount* 0.7);
  }else if (amount > 80000 && amount <= 180000) {
    netAmount = (amount* 0.66);
  }else if (amount > 180000) {
    netAmount = (amount* 0.62);
  }
  return netAmount;

}



export const calculImpot = (averageDailyRate, contractType) => {

  const YEARS = 12;
  const CDI_WORKING_MONTHS = 13;
  const BONUS = 2000;
  const salaryPerDay = averageDailyRate
  const TVA = 0.8; // 20%
  const WORKING_DAYS = 22;
  const WORKING_MONTHS = 11;
  const ACCOUNTING_FEES_PER_YEAR = 2000;
  const CNSS_FEES_PER_YEAR = 2200 * 12;
  const CONTRACT_FEES = 0.04 ; // 4%
  const PERSONAL_SALARY = 6000

  if(contractType === 'EMPLYEE') {
    const netSalary = ((averageDailyRate * CDI_WORKING_MONTHS) + BONUS) / YEARS;
    return {net: netSalary}
    // console.log({netSalary});
  } else if (contractType === 'SARLAU') {
    const netSalary = ((salaryPerDay * WORKING_DAYS * TVA * WORKING_MONTHS) - ACCOUNTING_FEES_PER_YEAR - CNSS_FEES_PER_YEAR) / YEARS
    // console.log(`*********** ${type} ********* `)
    // console.log("PERSONAL SALARY: ", 6000);
    // console.log("Businness SALARY: ", netSalary - 6000);
    // console.log("Brut : ", (netSalary - 6000) * YEARS)
    // console.log("Net :", calculIS((netSalary - 6000) * YEARS))
    const brut = (netSalary - 6000) * YEARS;
    const net = calculIS(brut);
    return {brut, net}
  }else if(contractType === 'PHYSICAL_PERSON') {
    const netSalary = salaryPerDay * WORKING_DAYS * TVA * WORKING_MONTHS;
    return {brut: netSalary, net: calculIR(netSalary)}
  }
}
