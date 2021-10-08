export const DRUG_NAMES = {
  Doliprane: "Doliprane",
  HerbalTea: "Herbal Tea",
  Fervex: "Fervex",
  MagicPill: "Magic Pill"
};

const defaultBenefitComputation = function() {
  if (this.expiresIn > 0) {
    this.benefit -= 1;
  } else {
    this.benefit -= 2;
  }
  this.expiresIn -= 1;
};

const herbalTeaBenefitComputation = function() {
  if (this.expiresIn > 0) {
    this.benefit += 1;
  } else {
    this.benefit += 2;
  }
  this.expiresIn -= 1;
};

const fervexBenefitComputation = function() {
  if (this.expiresIn <= 0) {
    this.benefit = 0;
  } else if (this.expiresIn <= 5) {
    this.benefit += 3;
  } else if (this.expiresIn <= 10) {
    this.benefit += 2;
  } else {
    // I'm not sure what the expected behavior is for benefit when this.expiresIn > 10
    // So the else case of this will remain untested
  }
  this.expiresIn -= 1;
};

const noopBenefitComputation = function() {};

export const BENEFICE_COMPUTATION_DICTIONNARY = {
  [DRUG_NAMES.Doliprane]: defaultBenefitComputation,
  [DRUG_NAMES.HerbalTea]: herbalTeaBenefitComputation,
  [DRUG_NAMES.Fervex]: fervexBenefitComputation,
  [DRUG_NAMES.MagicPill]: noopBenefitComputation,
  default: defaultBenefitComputation
};

export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
    this._updateBenefit =
      BENEFICE_COMPUTATION_DICTIONNARY[this.name] ||
      BENEFICE_COMPUTATION_DICTIONNARY["default"];
  }

  updateBenefit() {
    this._updateBenefit();
    if (this.benefit > 50) {
      this.benefit = 50;
    } else if (this.benefit < 0) {
      this.benefit = 0;
    }
    return this;
  }
}

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }

  updateBenefitValue() {
    return this.drugs.map(drug => {
      return drug.updateBenefit();
    });
  }
}
