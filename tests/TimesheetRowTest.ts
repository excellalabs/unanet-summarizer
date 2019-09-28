import { DateEntry } from "../src/classes/DateEntry";
import { ProjectType } from "../src/classes/ProjectType";
import { TimesheetRow } from "../src/classes/TimesheetRow";

describe("TimesheetRow", function() {
  describe("ctor", function() {
    describe("entries", function() {
      it("throws an error if the array is null", function() {
        var shouldBlowUp = function() {
          new TimesheetRow(ProjectType.Core, null);
        };

        expect(shouldBlowUp).toThrowError(
          "Entries array must not be null or undefined."
        );
      });

      it("throws an error if the array is undefined", function() {
        var shouldBlowUp = function() {
          new TimesheetRow(ProjectType.Core, undefined);
        };

        expect(shouldBlowUp).toThrowError(
          "Entries array must not be null or undefined."
        );
      });
    });
  });

  describe("Determining + Hours", function() {
    it("Treats BILL+ as Plus", function() {
      var row = new TimesheetRow(ProjectType.Bill, new Array<DateEntry>());
      expect(row.isPlusProjectType()).toBe(true);
    });
    it("Treats CORE+ as Plus", function() {
      var row = new TimesheetRow(ProjectType.Core, new Array<DateEntry>());
      expect(row.isPlusProjectType()).toBe(true);
    });
    it("Treats BENCH+ as Plus", function() {
      var row = new TimesheetRow(ProjectType.Bench, new Array<DateEntry>());
      expect(row.isPlusProjectType()).toBe(true);
    });
    it("Treats CLI-NB as Non-Plus", function() {
      var row = new TimesheetRow(
        ProjectType.NonBillable,
        new Array<DateEntry>()
      );
      expect(row.isPlusProjectType()).toBe(false);
    });
    it("Treats INT as Non-Plus", function() {
      var row = new TimesheetRow(ProjectType.Internal, new Array<DateEntry>());
      expect(row.isPlusProjectType()).toBe(false);
    });
  });
  describe("totaling hours", function() {
    const legitProjectType = ProjectType.Bench;
    const legitDayOfMonth = "11;";

    it("returns zero with an empty list of entries", function() {
      var sut = new TimesheetRow(legitProjectType, new Array<DateEntry>());
      expect(sut.totalHours()).toBe(0);
    });

    it("returns the number when list has one entry", function() {
      var array = new Array<DateEntry>();
      array.push(new DateEntry(legitDayOfMonth, "8"));

      var sut = new TimesheetRow(legitProjectType, array);
      expect(sut.totalHours()).toBe(8);
    });

    it("returns the number when list has a decimal", function() {
      var array = new Array<DateEntry>();
      array.push(new DateEntry(legitDayOfMonth, "8.25"));

      var sut = new TimesheetRow(legitProjectType, array);
      expect(sut.totalHours()).toBe(8.25);
    });

    it("returns the number when list has multiple entries", function() {
      var array = new Array<DateEntry>();
      array.push(new DateEntry("1", "1"));
      array.push(new DateEntry("2", "2"));
      array.push(new DateEntry("3", "3.5"));

      var sut = new TimesheetRow(legitProjectType, array);
      expect(sut.totalHours()).toBe(6.5);
    });
  });
});
