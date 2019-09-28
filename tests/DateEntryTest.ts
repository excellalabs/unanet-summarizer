import { DateEntry } from "../src/classes/DateEntry";

describe("constructor", () => {
  describe("hoursAmount", () => {
    const validDayOfMonth = "8";

    it("treats null hours as zero hours", () => {
      var entry = new DateEntry(validDayOfMonth, null);
      expect(entry.hoursAmount).toBe(0);
    });

    it("treats empty hours as zero hours", () => {
      var entry = new DateEntry(validDayOfMonth, "");
      expect(entry.hoursAmount).toBe(0);
    });

    it("treats whitespace hours as zero hours", () => {
      var entry = new DateEntry(validDayOfMonth, "  ");
      expect(entry.hoursAmount).toBe(0);
    });

    it("parses a round number correctly", () => {
      var entry = new DateEntry(validDayOfMonth, "8");
      expect(entry.hoursAmount).toBe(8);
    });

    it("parses a decimal number correctly", () => {
      var entry = new DateEntry(validDayOfMonth, "8.25");
      expect(entry.hoursAmount).toBe(8.25);
    });

    it("parses a decimal number correctly with whitespace", () => {
      var entry = new DateEntry(validDayOfMonth, " 8.25 ");
      expect(entry.hoursAmount).toBe(8.25);
    });
    it("throws an error if the value parsed is still not a number", () => {
      var functionToBlowUp = () => {
        new DateEntry(validDayOfMonth, "Abc");
      };
      expect(functionToBlowUp).toThrowError(
        "Unable to parse a valid hours amount for dayOfMonth: '8'"
      );
    });
  });

  describe("dayOfMonth", () => {
    const validWorkHours = "8.25";

    it("throws exception on null string", () => {
      var functionThatShouldBlowUp = () => {
        new DateEntry(null, validWorkHours);
      };
      expect(functionThatShouldBlowUp).toThrowError(
        "Day of month is null or empty. Valid day of the month must be provided."
      );
    });

    it("throws exception on undefined string", () => {
      var functionThatShouldBlowUp = () => {
        new DateEntry(undefined, validWorkHours);
      };
      expect(functionThatShouldBlowUp).toThrowError(
        "Day of month is null or empty. Valid day of the month must be provided."
      );
    });

    it("throws exception on empty string", () => {
      var functionThatShouldBlowUp = () => {
        new DateEntry("", validWorkHours);
      };
      expect(functionThatShouldBlowUp).toThrowError(
        "Day of month is null or empty. Valid day of the month must be provided."
      );
    });

    it("throws exception on whitespace string", () => {
      var functionThatShouldBlowUp = () => {
        new DateEntry("   ", validWorkHours);
      };
      expect(functionThatShouldBlowUp).toThrowError(
        "Day of month is null or empty. Valid day of the month must be provided."
      );
    });

    it("parses whole numbers", () => {
      var entry = new DateEntry("11", validWorkHours);
      expect(entry.dayOfMonth).toBe(11);
    });

    it("parses even with whitespace", () => {
      var entry = new DateEntry(" 11 ", validWorkHours);
      expect(entry.dayOfMonth).toBe(11);
    });

    it("ensures whole numbers", () => {
      var entry = new DateEntry("11.2", validWorkHours);
      expect(entry.dayOfMonth).toBe(11);
    });

    it("throws an error when it cannot be parsed", () => {
      var shouldBlowUp = () => {
        new DateEntry("Abc", validWorkHours);
      };
      expect(shouldBlowUp).toThrowError(
        "Unable to parse dayOfMonth: input was 'Abc'"
      );
    });
  });
});
