import { Drug, Pharmacy, DRUG_NAMES } from "./pharmacy";

describe("pharmacy", () => {
  describe("updateBenefitValue", () => {
    describe("when no drugs are given", () => {
      it("should return an empty array", () => {
        expect(new Pharmacy().updateBenefitValue()).toEqual([]);
      });
    });

    describe("on basic drug", () => {
      it("should not get a negative benefit", () => {
        expect(
          new Pharmacy([new Drug("drugName", 0, 0)]).updateBenefitValue()
        ).toEqual([new Drug("drugName", -1, 0)]);
      });

      it("should not get a benefit that is more than 50", () => {
        expect(
          new Pharmacy([
            new Drug(DRUG_NAMES.HerbalTea, 0, 50)
          ]).updateBenefitValue()
        ).toEqual([new Drug(DRUG_NAMES.HerbalTea, -1, 50)]);
      });

      it("should decrease both benefit and expiresIn", () => {
        expect(
          new Pharmacy([new Drug("drugName", 2, 3)]).updateBenefitValue()
        ).toEqual([new Drug("drugName", 1, 2)]);
      });

      describe("when expiresIn has passed", () => {
        it("should degrade benefit twice as fast", () => {
          expect(
            new Pharmacy([new Drug("drugName", 0, 2)]).updateBenefitValue()
          ).toEqual([new Drug("drugName", -1, 0)]);
        });
      });
    });

    describe("on Herbal Tea", () => {
      it("should increase benefit by 1", () => {
        expect(
          new Pharmacy([
            new Drug(DRUG_NAMES.HerbalTea, 1, 20)
          ]).updateBenefitValue()
        ).toEqual([new Drug(DRUG_NAMES.HerbalTea, 0, 21)]);
      });

      describe("when expiresIn has passed", () => {
        it("should increase benefit by 2", () => {
          expect(
            new Pharmacy([
              new Drug(DRUG_NAMES.HerbalTea, -1, 4)
            ]).updateBenefitValue()
          ).toEqual([new Drug(DRUG_NAMES.HerbalTea, -2, 6)]);
        });
      });
    });

    describe("on Fervex", () => {
      describe("when expiresIn is less than 10 days but more than 5 days", () => {
        it("should increase benefit by 2 ", () => {
          expect(
            new Pharmacy([
              new Drug(DRUG_NAMES.Fervex, 7, 10)
            ]).updateBenefitValue()
          ).toEqual([new Drug(DRUG_NAMES.Fervex, 6, 12)]);
        });
      });

      describe("when expiresIn is less than 5 days", () => {
        it("should increase benefit by 3", () => {
          expect(
            new Pharmacy([
              new Drug(DRUG_NAMES.Fervex, 2, 10)
            ]).updateBenefitValue()
          ).toEqual([new Drug(DRUG_NAMES.Fervex, 1, 13)]);
        });
      });

      describe("when expiresIn has passed", () => {
        it("should set benefit to 0", () => {
          expect(
            new Pharmacy([
              new Drug(DRUG_NAMES.Fervex, 0, 50)
            ]).updateBenefitValue()
          ).toEqual([new Drug(DRUG_NAMES.Fervex, -1, 0)]);
        });
      });
    });

    describe("on Magic Pill", () => {
      it("should never change expiresIn or benefit ", () => {
        expect(
          new Pharmacy([new Drug("Magic Pill", 10, 20)]).updateBenefitValue()
        ).toEqual([new Drug("Magic Pill", 10, 20)]);
      });
    });

    describe("on Dafalgan", () => {
      it("should decrease benefit by 2", () => {
        expect(
          new Pharmacy([new Drug("Dafalgan", 10, 20)]).updateBenefitValue()
        ).toEqual([new Drug("Dafalgan", 9, 18)]);
      });

      describe("when expiresIn has passed", () => {
        it("should degrade benefit twice as fast", () => {
          expect(
            new Pharmacy([new Drug("Dafalgan", 0, 4)]).updateBenefitValue()
          ).toEqual([new Drug("Dafalgan", -1, 0)]);
        });
      });
    });
  });
});
