import { Summarizer } from "../src/classes/classes";

describe("timesheet", function() {
  describe("ctor", function() {
    describe("rows", function() {
      it("throws an exception with null rows list", function() {
        var shouldBlowUp = function() {
          new TimesheetBuilder().withRows(null).build();
        };

        expect(shouldBlowUp).toThrowError("Must supply a timesheet rows list.");
      });

      it("throws an exception with undefined rows list", function() {
        var shouldBlowUp = function() {
          new TimesheetBuilder().withRows(undefined).build();
        };

        expect(shouldBlowUp).toThrowError("Must supply a timesheet rows list.");
      });

      it("throws an exception with empty rows list", function() {
        var shouldBlowUp = function() {
          new TimesheetBuilder()
            .withRows(new Array<Summarizer.TimesheetRow>())
            .build();
        };

        expect(shouldBlowUp).toThrowError("timesheet rows list is empty.");
      });
    });

    describe("timesheet start date", function() {
      it("throws an error when null", function() {
        var shouldBlowUp = function() {
          new TimesheetBuilder().withStartDate(null).build();
        };

        expect(shouldBlowUp).toThrowError("timesheet start date is invalid.");
      });

      it("throws an error when undefined", function() {
        var shouldBlowUp = function() {
          new TimesheetBuilder().withStartDate(undefined).build();
        };

        expect(shouldBlowUp).toThrowError("timesheet start date is invalid.");
      });

      it("throws an error when empty", function() {
        var shouldBlowUp = function() {
          new TimesheetBuilder().withStartDate("").build();
        };

        expect(shouldBlowUp).toThrowError("timesheet start date is invalid.");
      });

      it("throws an error when whitespace", function() {
        var shouldBlowUp = function() {
          new TimesheetBuilder().withStartDate("    ").build();
        };

        expect(shouldBlowUp).toThrowError("timesheet start date is invalid.");
      });

      it("throws an error when non-formatted date", function() {
        var shouldBlowUp = function() {
          new TimesheetBuilder().withStartDate("abcd").build();
        };

        expect(shouldBlowUp).toThrowError("timesheet start date is invalid.");
      });

      it("throws an error when given a date before 2010", function() {
        // This is just to ensure people are using it for recent timesheets; we introduced this in 2018.
        var shouldBlowUp = function() {
          new TimesheetBuilder().withStartDate("2009-12-31").build();
        };

        expect(shouldBlowUp).toThrowError(
          "timesheet start date should be after 2009."
        );
      });

      it("is fine with a valid date", function() {
        var shouldBeFine = function() {
          new TimesheetBuilder().withStartDate("2010-01-01").build();
          new TimesheetBuilder().withStartDate("2019-09-08").build();
        };
        expect(shouldBeFine).not.toThrowError();
      });
    });

    describe("timesheet end date", function() {
      it("throws an error when null", function() {
        var shouldBlowUp = function() {
          new TimesheetBuilder().withEndDate(null).build();
        };

        expect(shouldBlowUp).toThrowError("timesheet end date is invalid.");
      });

      it("throws an error when undefined", function() {
        var shouldBlowUp = function() {
          new TimesheetBuilder().withEndDate(undefined).build();
        };

        expect(shouldBlowUp).toThrowError("timesheet end date is invalid.");
      });

      it("throws an error when empty", function() {
        var shouldBlowUp = function() {
          new TimesheetBuilder().withEndDate("").build();
        };

        expect(shouldBlowUp).toThrowError("timesheet end date is invalid.");
      });

      it("throws an error when whitespace", function() {
        var shouldBlowUp = function() {
          new TimesheetBuilder().withEndDate("    ").build();
        };

        expect(shouldBlowUp).toThrowError("timesheet end date is invalid.");
      });

      it("throws an error when non-formatted date", function() {
        var shouldBlowUp = function() {
          new TimesheetBuilder().withEndDate("abcd").build();
        };

        expect(shouldBlowUp).toThrowError("timesheet end date is invalid.");
      });

      it("throws an error when given a date before 2010", function() {
        // This is just to ensure people are using it for recent timesheets; we introduced this in 2018.
        var shouldBlowUp = function() {
          new TimesheetBuilder().withEndDate("2009-12-31").build();
        };

        expect(shouldBlowUp).toThrowError(
          "timesheet end date should be after 2009."
        );
      });

      it("is fine with a valid date", function() {
        var shouldBeFine = function() {
          new TimesheetBuilder().withEndDate("01-01-2010").build();
          new TimesheetBuilder().withEndDate("2019-09-08").build();
        };
        expect(shouldBeFine).not.toThrowError();
      });
    });

    describe("today's date", function() {
      it("throws an error when null", function() {
        var shouldBlowUp = function() {
          new TimesheetBuilder().withTodayDate(null).build();
        };

        expect(shouldBlowUp).toThrowError("today's date is invalid.");
      });

      it("throws an error when undefined", function() {
        var shouldBlowUp = function() {
          new TimesheetBuilder().withTodayDate(undefined).build();
        };

        expect(shouldBlowUp).toThrowError("today's date is invalid.");
      });

      it("throws an error when empty", function() {
        var shouldBlowUp = function() {
          new TimesheetBuilder().withTodayDate("").build();
        };

        expect(shouldBlowUp).toThrowError("today's date is invalid.");
      });

      it("throws an error when whitespace", function() {
        var shouldBlowUp = function() {
          new TimesheetBuilder().withTodayDate("     ").build();
        };

        expect(shouldBlowUp).toThrowError("today's date is invalid.");
      });

      it("throws an error when non-formatted date", function() {
        var shouldBlowUp = function() {
          new TimesheetBuilder().withTodayDate("abcd").build();
        };

        expect(shouldBlowUp).toThrowError("today's date is invalid.");
      });

      it("throws an error when given a date before 2010", function() {
        // This is just to ensure people are using it for recent timesheets; we introduced this in 2018.
        var shouldBlowUp = function() {
          new TimesheetBuilder().withTodayDate("2009-12-31").build();
        };

        expect(shouldBlowUp).toThrowError("today's date should be after 2009.");
      });

      it("is fine with a valid date", function() {
        var shouldBeFine = function() {
          new TimesheetBuilder().withTodayDate("2010-01-01").build();
          new TimesheetBuilder().withTodayDate("2019-09-08").build();
        };
        expect(shouldBeFine).not.toThrowError();
      });
    });
  });
  describe("getLatestEntryDate", function() {
    var hoursAmountThatDoesntMatter = "8";

    it("returns the largest date number that has an entry", function() {
      var rows = new Array<Summarizer.TimesheetRow>();

      rows.push(
        new TimesheetRowBuilder()
          .withEntry(new Summarizer.DateEntry("2", hoursAmountThatDoesntMatter))
          .build()
      );
      rows.push(
        new TimesheetRowBuilder()
          .withEntry(new Summarizer.DateEntry("3", hoursAmountThatDoesntMatter))
          .build()
      );
      rows.push(
        new TimesheetRowBuilder()
          .withEntry(new Summarizer.DateEntry("1", hoursAmountThatDoesntMatter))
          .build()
      );

      var timesheet = new TimesheetBuilder().withRows(rows).build();

      expect(timesheet.getLatestEntryDate()).toBe(3);
    });

    it("doesn't count zero time entries as a date to care about", function() {
      var rows = new Array<Summarizer.TimesheetRow>();
      rows.push(
        new TimesheetRowBuilder()
          .withEntry(new Summarizer.DateEntry("2", hoursAmountThatDoesntMatter))
          .build()
      );
      rows.push(
        new TimesheetRowBuilder()
          .withEntry(new Summarizer.DateEntry("3", "0.0"))
          .build()
      );
      rows.push(
        new TimesheetRowBuilder()
          .withEntry(new Summarizer.DateEntry("1", hoursAmountThatDoesntMatter))
          .build()
      );

      var timesheet = new TimesheetBuilder().withRows(rows).build();

      expect(timesheet.getLatestEntryDate()).toBe(2);
    });
    it("returns undefined when an empty timesheet", function() {
      var timesheet = new TimesheetBuilder().build();

      expect(timesheet.getLatestEntryDate()).toBe(undefined);
    });
    it("returns undefined with a timesheet of all zero entries", function() {
      var rows = new Array<Summarizer.TimesheetRow>();
      var zeroHours = "0.0";

      rows.push(
        new TimesheetRowBuilder()
          .withEntry(new Summarizer.DateEntry("2", zeroHours))
          .build()
      );
      rows.push(
        new TimesheetRowBuilder()
          .withEntry(new Summarizer.DateEntry("10", zeroHours))
          .build()
      );
      rows.push(
        new TimesheetRowBuilder()
          .withEntry(new Summarizer.DateEntry("30", zeroHours))
          .build()
      );

      var timesheet = new TimesheetBuilder().withRows(rows).build();

      expect(timesheet.getLatestEntryDate()).toBe(undefined);
    });
  });
  describe("totalPlusHours", function() {
    it("returns the sum of hours across all plus rows on a timesheet", function() {
      var rows = new Array<Summarizer.TimesheetRow>();

      rows.push(
        new TimesheetRowBuilder()
          .withEntry(new Summarizer.DateEntry("11", "1.0"))
          .withProjectType(Summarizer.ProjectType.Bench)
          .build()
      );
      rows.push(
        new TimesheetRowBuilder()
          .withEntry(new Summarizer.DateEntry("12", "2.0"))
          .withProjectType(Summarizer.ProjectType.Bill)
          .build()
      );
      rows.push(
        new TimesheetRowBuilder()
          .withEntry(new Summarizer.DateEntry("13", "3.5"))
          .withProjectType(Summarizer.ProjectType.Core)
          .build()
      );

      var timesheet = new TimesheetBuilder().withRows(rows).build();

      expect(timesheet.totalPlusHours()).toBe(6.5);
    });

    it("doesn't count non-plus rows", function() {
      var rows = new Array<Summarizer.TimesheetRow>();

      rows.push(
        new TimesheetRowBuilder()
          .withEntry(new Summarizer.DateEntry("11", "1.0"))
          .withProjectType(Summarizer.ProjectType.Bench)
          .build()
      );
      rows.push(
        new TimesheetRowBuilder()
          .withEntry(new Summarizer.DateEntry("12", "2.0"))
          .withProjectType(Summarizer.ProjectType.Bill)
          .build()
      );
      rows.push(
        new TimesheetRowBuilder()
          .withEntry(new Summarizer.DateEntry("13", "3.5"))
          .withProjectType(Summarizer.ProjectType.Core)
          .build()
      );
      rows.push(
        new TimesheetRowBuilder()
          .withEntry(new Summarizer.DateEntry("13", "2"))
          .withProjectType(Summarizer.ProjectType.Internal)
          .build()
      );
      rows.push(
        new TimesheetRowBuilder()
          .withEntry(new Summarizer.DateEntry("13", "2"))
          .withProjectType(Summarizer.ProjectType.NonBillable)
          .build()
      );

      var timesheet = new TimesheetBuilder().withRows(rows).build();

      expect(timesheet.totalPlusHours()).toBe(6.5);
    });

    it("returns 0 when there are no + rows", function() {
      var rows = new Array<Summarizer.TimesheetRow>();
      rows.push(
        new TimesheetRowBuilder()
          .withEntry(new Summarizer.DateEntry("11", "1.0"))
          .withProjectType(Summarizer.ProjectType.Internal)
          .build()
      );
      rows.push(
        new TimesheetRowBuilder()
          .withEntry(new Summarizer.DateEntry("11", "1.0"))
          .withProjectType(Summarizer.ProjectType.NonBillable)
          .build()
      );
      rows.push(
        new TimesheetRowBuilder()
          .withEntry(new Summarizer.DateEntry("11", "1.0"))
          .withProjectType(Summarizer.ProjectType.Internal)
          .build()
      );

      var timesheet = new TimesheetBuilder().withRows(rows).build();

      expect(timesheet.totalPlusHours()).toBe(0);
    });

    it("returns 0 when there are no entries in any rows", function() {
      var rows = new Array<Summarizer.TimesheetRow>();
      rows.push(
        new TimesheetRowBuilder()
          .withProjectType(Summarizer.ProjectType.Core)
          .build()
      );
      rows.push(
        new TimesheetRowBuilder()
          .withProjectType(Summarizer.ProjectType.Bench)
          .build()
      );
      rows.push(
        new TimesheetRowBuilder()
          .withProjectType(Summarizer.ProjectType.Bill)
          .build()
      );

      var timesheet = new TimesheetBuilder().withRows(rows).build();

      expect(timesheet.totalPlusHours()).toBe(0);
    });
  });
});

// TODO: Total + Hours
// TODO: Total Non + Hours
// TODO: Tracking

class TimesheetRowBuilder {
  projectType: Summarizer.ProjectType;
  entries = new Array<Summarizer.DateEntry>();

  build = () => {
    return new Summarizer.TimesheetRow(this.projectType, this.entries);
  };

  withEntry = (entry: Summarizer.DateEntry) => {
    this.entries.push(entry);
    return this;
  };

  withProjectType = (type: Summarizer.ProjectType) => {
    this.projectType = type;
    return this;
  };
}

class TimesheetBuilder {
  startDate: string = "2019-09-01";
  endDate: string = "2019-09-15";
  todayDate: string = "2019-09-08";
  rows = new Array<Summarizer.TimesheetRow>();

  constructor() {
    this.rows.push(
      new Summarizer.TimesheetRow(
        Summarizer.ProjectType.Bench,
        new Array<Summarizer.DateEntry>()
      )
    );
  }

  withStartDate = (theDate: string) => {
    this.startDate = theDate;
    return this;
  };

  withEndDate = (theDate: string) => {
    this.endDate = theDate;
    return this;
  };

  withTodayDate = (theDate: string) => {
    this.todayDate = theDate;
    return this;
  };

  withRows = (theRows: Array<Summarizer.TimesheetRow>) => {
    this.rows = theRows;
    return this;
  };

  build = () => {
    return new Summarizer.Timesheet(
      this.rows,
      this.startDate,
      this.endDate,
      this.todayDate
    );
  };
}
