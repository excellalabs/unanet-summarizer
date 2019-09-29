import { Summarizer } from "../src/classes/Summarizer";

describe("summarizer", () => {
  describe("ctor", () => {
    it("blows up if timesheet is null", () => {
      const shouldBlowUp = () => {
        // tslint:disable-next-line:no-unused-expression
        new Summarizer(null);
      };

      expect(shouldBlowUp).toThrowError("must provide timesheet");
    });
    it("blows up if timesheet is undefined", () => {
      const shouldBlowUp = () => {
        // tslint:disable-next-line:no-unused-expression
        new Summarizer(undefined);
      };

      expect(shouldBlowUp).toThrowError("must provide timesheet");
    });
  });
});
