import "jasmine";
import { DateEntry } from "../src/classes/DateEntry";
import { ProjectType } from "../src/classes/ProjectType";
import { TimesheetRow } from "../src/classes/TimesheetRow";

describe("TimesheetRow", () => {
  describe("ctor", () => {
    describe("entries", () => {
      it("throws an error if the array is null", () => {
        const shouldBlowUp = () => {
          // tslint:disable-next-line:no-unused-expression
          new TimesheetRow(ProjectType.Core, null);
        };

        expect(shouldBlowUp).toThrowError(
          "Entries array must not be null or undefined."
        );
      });

      it("throws an error if the array is undefined", () => {
        const shouldBlowUp = () => {
          // tslint:disable-next-line:no-unused-expression
          new TimesheetRow(ProjectType.Core, undefined);
        };

        expect(shouldBlowUp).toThrowError(
          "Entries array must not be null or undefined."
        );
      });
    });
  });

  describe("Determining + Hours", () => {
    it("Treats BILL+ as Plus", () => {
      const row = new TimesheetRow(ProjectType.Bill, new Array<DateEntry>());
      expect(row.isPlusProjectType()).toBe(true);
    });
    it("Treats CORE+ as Plus", () => {
      const row = new TimesheetRow(ProjectType.Core, new Array<DateEntry>());
      expect(row.isPlusProjectType()).toBe(true);
    });
    it("Treats BENCH+ as Plus", () => {
      const row = new TimesheetRow(ProjectType.Bench, new Array<DateEntry>());
      expect(row.isPlusProjectType()).toBe(true);
    });
    it("Treats CLI-NB as Non-Plus", () => {
      const row = new TimesheetRow(
        ProjectType.NonBillable,
        new Array<DateEntry>()
      );
      expect(row.isPlusProjectType()).toBe(false);
    });
    it("Treats INT as Non-Plus", () => {
      const row = new TimesheetRow(
        ProjectType.Internal,
        new Array<DateEntry>()
      );
      expect(row.isPlusProjectType()).toBe(false);
    });
  });
  describe("totaling hours", () => {
    const legitProjectType = ProjectType.Bench;
    const legitDayOfMonth = "11;";

    it("returns zero with an empty list of entries", () => {
      const sut = new TimesheetRow(legitProjectType, new Array<DateEntry>());
      expect(sut.totalHours()).toBe(0);
    });

    it("returns the number when list has one entry", () => {
      const array = new Array<DateEntry>();
      array.push(new DateEntry(legitDayOfMonth, "8"));

      const sut = new TimesheetRow(legitProjectType, array);
      expect(sut.totalHours()).toBe(8);
    });

    it("returns the number when list has a decimal", () => {
      const array = new Array<DateEntry>();
      array.push(new DateEntry(legitDayOfMonth, "8.25"));

      const sut = new TimesheetRow(legitProjectType, array);
      expect(sut.totalHours()).toBe(8.25);
    });

    it("returns the number when list has multiple entries", () => {
      const array = new Array<DateEntry>();
      array.push(new DateEntry("1", "1"));
      array.push(new DateEntry("2", "2"));
      array.push(new DateEntry("3", "3.5"));

      const sut = new TimesheetRow(legitProjectType, array);
      expect(sut.totalHours()).toBe(6.5);
    });
  });
});
