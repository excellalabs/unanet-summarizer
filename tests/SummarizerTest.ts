import { Summarizer } from "../src/classes/Summarizer";

describe("summarizer", () => {
  describe("ctor", () => {
    it("blows up if timesheet is null", () => {
      const shouldBlowUp = () => {
        new Summarizer(null);
      };

      expect(shouldBlowUp).toThrowError("must provide timesheet");
    });
    it("blows up if timesheet is undefined", () => {
      const shouldBlowUp = () => {
        new Summarizer(undefined);
      };

      expect(shouldBlowUp).toThrowError("must provide timesheet");
    });
  });
});
