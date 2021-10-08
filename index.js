import { Drug, Pharmacy, DRUG_NAMES } from "./pharmacy";

import fs from "fs";

const drugs = [
  new Drug(DRUG_NAMES.Doliprane, 20, 30),
  new Drug(DRUG_NAMES.HerbalTea, 10, 5),
  new Drug(DRUG_NAMES.Fervex, 5, 40),
  new Drug(DRUG_NAMES.MagicPill, 15, 40)
];
const trial = new Pharmacy(drugs);

const log = [];

for (let elapsedDays = 0; elapsedDays < 30; elapsedDays++) {
  log.push(JSON.stringify(trial.updateBenefitValue()));
}

/* eslint-disable no-console */
fs.writeFile("output.txt", log.toString(), err => {
  if (err) {
    console.log("error");
  } else {
    console.log("success");
  }
});
/* eslint-enable no-console */
