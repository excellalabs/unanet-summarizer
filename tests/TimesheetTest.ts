import { Summarizer } from "../src/classes/classes";
import { Helpers } from "./Helpers";

describe("timesheet", function() {
  describe("ctor", function() {
    describe("rows", function() {
      it("throws an exception with null rows list", function() {
        var shouldBlowUp = function() {
          new Helpers.TimesheetBuilder().withRows(null).build();
        };

        expect(shouldBlowUp).toThrowError("Must supply a timesheet rows list.");
      });

      it("throws an exception with undefined rows list", function() {
        var shouldBlowUp = function() {
          new Helpers.TimesheetBuilder().withRows(undefined).build();
        };

        expect(shouldBlowUp).toThrowError("Must supply a timesheet rows list.");
      });

      it("throws an exception with empty rows list", function() {
        var shouldBlowUp = function() {
          new Helpers.TimesheetBuilder()
            .withRows(new Array<Summarizer.TimesheetRow>())
            .build();
        };

        expect(shouldBlowUp).toThrowError("timesheet rows list is empty.");
      });
    });

    describe("timesheet start date", function() {
      it("throws an error when null", function() {
        var shouldBlowUp = function() {
          new Helpers.TimesheetBuilder().withStartDate(null).build();
        };

        expect(shouldBlowUp).toThrowError("timesheet start date is invalid.");
      });

      it("throws an error when undefined", function() {
        var shouldBlowUp = function() {
          new Helpers.TimesheetBuilder().withStartDate(undefined).build();
        };

        expect(shouldBlowUp).toThrowError("timesheet start date is invalid.");
      });

      it("throws an error when empty", function() {
        var shouldBlowUp = function() {
          new Helpers.TimesheetBuilder().withStartDate("").build();
        };

        expect(shouldBlowUp).toThrowError("timesheet start date is invalid.");
      });

      it("throws an error when whitespace", function() {
        var shouldBlowUp = function() {
          new Helpers.TimesheetBuilder().withStartDate("    ").build();
        };

        expect(shouldBlowUp).toThrowError("timesheet start date is invalid.");
      });

      it("throws an error when non-formatted date", function() {
        var shouldBlowUp = function() {
          new Helpers.TimesheetBuilder().withStartDate("abcd").build();
        };

        expect(shouldBlowUp).toThrowError("timesheet start date is invalid.");
      });

      it("throws an error when given a date before 2010", function() {
        // This is just to ensure people are using it for recent timesheets; we introduced this in 2018.
        var shouldBlowUp = function() {
          new Helpers.TimesheetBuilder().withStartDate("2009-12-31").build();
        };

        expect(shouldBlowUp).toThrowError(
          "timesheet start date should be after 2009."
        );
      });

      it("is fine with a valid date", function() {
        var shouldBeFine = function() {
          new Helpers.TimesheetBuilder().withStartDate("2010-01-01").build();
          new Helpers.TimesheetBuilder().withStartDate("2019-09-08").build();
        };
        expect(shouldBeFine).not.toThrowError();
      });
    });

    describe("timesheet end date", function() {
      it("throws an error when null", function() {
        var shouldBlowUp = function() {
          new Helpers.TimesheetBuilder().withEndDate(null).build();
        };

        expect(shouldBlowUp).toThrowError("timesheet end date is invalid.");
      });

      it("throws an error when undefined", function() {
        var shouldBlowUp = function() {
          new Helpers.TimesheetBuilder().withEndDate(undefined).build();
        };

        expect(shouldBlowUp).toThrowError("timesheet end date is invalid.");
      });

      it("throws an error when empty", function() {
        var shouldBlowUp = function() {
          new Helpers.TimesheetBuilder().withEndDate("").build();
        };

        expect(shouldBlowUp).toThrowError("timesheet end date is invalid.");
      });

      it("throws an error when whitespace", function() {
        var shouldBlowUp = function() {
          new Helpers.TimesheetBuilder().withEndDate("    ").build();
        };

        expect(shouldBlowUp).toThrowError("timesheet end date is invalid.");
      });

      it("throws an error when non-formatted date", function() {
        var shouldBlowUp = function() {
          new Helpers.TimesheetBuilder().withEndDate("abcd").build();
        };

        expect(shouldBlowUp).toThrowError("timesheet end date is invalid.");
      });

      it("throws an error when given a date before 2010", function() {
        // This is just to ensure people are using it for recent timesheets; we introduced this in 2018.
        var shouldBlowUp = function() {
          new Helpers.TimesheetBuilder().withEndDate("2009-12-31").build();
        };

        expect(shouldBlowUp).toThrowError(
          "timesheet end date should be after 2009."
        );
      });

      it("is fine with a valid date", function() {
        var shouldBeFine = function() {
          new Helpers.TimesheetBuilder().withEndDate("01-01-2010").build();
          new Helpers.TimesheetBuilder().withEndDate("2019-09-08").build();
        };
        expect(shouldBeFine).not.toThrowError();
      });
    });

    describe("today's date", function() {
      it("throws an error when null", function() {
        var shouldBlowUp = function() {
          new Helpers.TimesheetBuilder().withTodayDate(null).build();
        };

        expect(shouldBlowUp).toThrowError("today's date is invalid.");
      });

      it("throws an error when undefined", function() {
        var shouldBlowUp = function() {
          new Helpers.TimesheetBuilder().withTodayDate(undefined).build();
        };

        expect(shouldBlowUp).toThrowError("today's date is invalid.");
      });

      it("throws an error when empty", function() {
        var shouldBlowUp = function() {
          new Helpers.TimesheetBuilder().withTodayDate("").build();
        };

        expect(shouldBlowUp).toThrowError("today's date is invalid.");
      });

      it("throws an error when whitespace", function() {
        var shouldBlowUp = function() {
          new Helpers.TimesheetBuilder().withTodayDate("     ").build();
        };

        expect(shouldBlowUp).toThrowError("today's date is invalid.");
      });

      it("throws an error when non-formatted date", function() {
        var shouldBlowUp = function() {
          new Helpers.TimesheetBuilder().withTodayDate("abcd").build();
        };

        expect(shouldBlowUp).toThrowError("today's date is invalid.");
      });

      it("throws an error when given a date before 2010", function() {
        // This is just to ensure people are using it for recent timesheets; we introduced this in 2018.
        var shouldBlowUp = function() {
          new Helpers.TimesheetBuilder().withTodayDate("2009-12-31").build();
        };

        expect(shouldBlowUp).toThrowError("today's date should be after 2009.");
      });

      it("is fine with a valid date", function() {
        var shouldBeFine = function() {
          new Helpers.TimesheetBuilder().withTodayDate("2010-01-01").build();
          new Helpers.TimesheetBuilder().withTodayDate("2019-09-08").build();
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
        new Helpers.TimesheetRowBuilder()
          .withEntry(new Summarizer.DateEntry("2", hoursAmountThatDoesntMatter))
          .build()
      );
      rows.push(
        new Helpers.TimesheetRowBuilder()
          .withEntry(new Summarizer.DateEntry("3", hoursAmountThatDoesntMatter))
          .build()
      );
      rows.push(
        new Helpers.TimesheetRowBuilder()
          .withEntry(new Summarizer.DateEntry("1", hoursAmountThatDoesntMatter))
          .build()
      );

      var timesheet = new Helpers.TimesheetBuilder().withRows(rows).build();

      expect(timesheet.getLatestEntryDate()).toBe(3);
    });

    it("doesn't count zero time entries as a date to care about", function() {
      var rows = new Array<Summarizer.TimesheetRow>();
      rows.push(
        new Helpers.TimesheetRowBuilder()
          .withEntry(new Summarizer.DateEntry("2", hoursAmountThatDoesntMatter))
          .build()
      );
      rows.push(
        new Helpers.TimesheetRowBuilder()
          .withEntry(new Summarizer.DateEntry("3", "0.0"))
          .build()
      );
      rows.push(
        new Helpers.TimesheetRowBuilder()
          .withEntry(new Summarizer.DateEntry("1", hoursAmountThatDoesntMatter))
          .build()
      );

      var timesheet = new Helpers.TimesheetBuilder().withRows(rows).build();

      expect(timesheet.getLatestEntryDate()).toBe(2);
    });
    it("returns undefined when an empty timesheet", function() {
      var timesheet = new Helpers.TimesheetBuilder().build();

      expect(timesheet.getLatestEntryDate()).toBe(undefined);
    });
    it("returns undefined with a timesheet of all zero entries", function() {
      var rows = new Array<Summarizer.TimesheetRow>();
      var zeroHours = "0.0";

      rows.push(
        new Helpers.TimesheetRowBuilder()
          .withEntry(new Summarizer.DateEntry("2", zeroHours))
          .build()
      );
      rows.push(
        new Helpers.TimesheetRowBuilder()
          .withEntry(new Summarizer.DateEntry("10", zeroHours))
          .build()
      );
      rows.push(
        new Helpers.TimesheetRowBuilder()
          .withEntry(new Summarizer.DateEntry("30", zeroHours))
          .build()
      );

      var timesheet = new Helpers.TimesheetBuilder().withRows(rows).build();

      expect(timesheet.getLatestEntryDate()).toBe(undefined);
    });
  });
  describe("totalPlusHours", function() {
    it("returns the sum of hours across all plus rows on a timesheet", function() {
      var rows = new Array<Summarizer.TimesheetRow>();

      rows.push(
        new Helpers.TimesheetRowBuilder()
          .withEntry(new Summarizer.DateEntry("11", "1.0"))
          .withProjectType(Summarizer.ProjectType.Bench)
          .build()
      );
      rows.push(
        new Helpers.TimesheetRowBuilder()
          .withEntry(new Summarizer.DateEntry("12", "2.0"))
          .withProjectType(Summarizer.ProjectType.Bill)
          .build()
      );
      rows.push(
        new Helpers.TimesheetRowBuilder()
          .withEntry(new Summarizer.DateEntry("13", "3.5"))
          .withProjectType(Summarizer.ProjectType.Core)
          .build()
      );

      var timesheet = new Helpers.TimesheetBuilder().withRows(rows).build();

      expect(timesheet.totalPlusHours()).toBe(6.5);
    });

    it("doesn't count non-plus rows", function() {
      var rows = new Array<Summarizer.TimesheetRow>();

      rows.push(
        new Helpers.TimesheetRowBuilder()
          .withEntry(new Summarizer.DateEntry("11", "1.0"))
          .withProjectType(Summarizer.ProjectType.Bench)
          .build()
      );
      rows.push(
        new Helpers.TimesheetRowBuilder()
          .withEntry(new Summarizer.DateEntry("12", "2.0"))
          .withProjectType(Summarizer.ProjectType.Bill)
          .build()
      );
      rows.push(
        new Helpers.TimesheetRowBuilder()
          .withEntry(new Summarizer.DateEntry("13", "3.5"))
          .withProjectType(Summarizer.ProjectType.Core)
          .build()
      );
      rows.push(
        new Helpers.TimesheetRowBuilder()
          .withEntry(new Summarizer.DateEntry("13", "2"))
          .withProjectType(Summarizer.ProjectType.Internal)
          .build()
      );
      rows.push(
        new Helpers.TimesheetRowBuilder()
          .withEntry(new Summarizer.DateEntry("13", "2"))
          .withProjectType(Summarizer.ProjectType.NonBillable)
          .build()
      );

      var timesheet = new Helpers.TimesheetBuilder().withRows(rows).build();

      expect(timesheet.totalPlusHours()).toBe(6.5);
    });

    it("returns 0 when there are no + rows", function() {
      var rows = new Array<Summarizer.TimesheetRow>();
      rows.push(
        new Helpers.TimesheetRowBuilder()
          .withEntry(new Summarizer.DateEntry("11", "1.0"))
          .withProjectType(Summarizer.ProjectType.Internal)
          .build()
      );
      rows.push(
        new Helpers.TimesheetRowBuilder()
          .withEntry(new Summarizer.DateEntry("11", "1.0"))
          .withProjectType(Summarizer.ProjectType.NonBillable)
          .build()
      );
      rows.push(
        new Helpers.TimesheetRowBuilder()
          .withEntry(new Summarizer.DateEntry("11", "1.0"))
          .withProjectType(Summarizer.ProjectType.Internal)
          .build()
      );

      var timesheet = new Helpers.TimesheetBuilder().withRows(rows).build();

      expect(timesheet.totalPlusHours()).toBe(0);
    });

    it("returns 0 when there are no entries in any rows", function() {
      var rows = new Array<Summarizer.TimesheetRow>();
      rows.push(
        new Helpers.TimesheetRowBuilder()
          .withProjectType(Summarizer.ProjectType.Core)
          .build()
      );
      rows.push(
        new Helpers.TimesheetRowBuilder()
          .withProjectType(Summarizer.ProjectType.Bench)
          .build()
      );
      rows.push(
        new Helpers.TimesheetRowBuilder()
          .withProjectType(Summarizer.ProjectType.Bill)
          .build()
      );

      var timesheet = new Helpers.TimesheetBuilder().withRows(rows).build();

      expect(timesheet.totalPlusHours()).toBe(0);
    });
  });
  describe("totalNonPlusHours", function() {
    it("returns the sum of hours across all non-plus rows on a timesheet", function() {
      var rows = new Array<Summarizer.TimesheetRow>();

      rows.push(
        new Helpers.TimesheetRowBuilder()
          .withEntry(new Summarizer.DateEntry("11", "1.0"))
          .withProjectType(Summarizer.ProjectType.Internal)
          .build()
      );
      rows.push(
        new Helpers.TimesheetRowBuilder()
          .withEntry(new Summarizer.DateEntry("12", "2.0"))
          .withProjectType(Summarizer.ProjectType.NonBillable)
          .build()
      );
      rows.push(
        new Helpers.TimesheetRowBuilder()
          .withEntry(new Summarizer.DateEntry("13", "3.5"))
          .withProjectType(Summarizer.ProjectType.Internal)
          .build()
      );

      var timesheet = new Helpers.TimesheetBuilder().withRows(rows).build();

      expect(timesheet.totalNonPlusHours()).toBe(6.5);
    });

    it("doesn't count plus rows", function() {
      var rows = new Array<Summarizer.TimesheetRow>();

      rows.push(
        new Helpers.TimesheetRowBuilder()
          .withEntry(new Summarizer.DateEntry("11", "1.0"))
          .withProjectType(Summarizer.ProjectType.NonBillable)
          .build()
      );
      rows.push(
        new Helpers.TimesheetRowBuilder()
          .withEntry(new Summarizer.DateEntry("12", "2.0"))
          .withProjectType(Summarizer.ProjectType.Internal)
          .build()
      );
      rows.push(
        new Helpers.TimesheetRowBuilder()
          .withEntry(new Summarizer.DateEntry("13", "3.5"))
          .withProjectType(Summarizer.ProjectType.Internal)
          .build()
      );
      rows.push(
        new Helpers.TimesheetRowBuilder()
          .withEntry(new Summarizer.DateEntry("13", "2"))
          .withProjectType(Summarizer.ProjectType.Core)
          .build()
      );
      rows.push(
        new Helpers.TimesheetRowBuilder()
          .withEntry(new Summarizer.DateEntry("13", "2"))
          .withProjectType(Summarizer.ProjectType.Bench)
          .build()
      );

      var timesheet = new Helpers.TimesheetBuilder().withRows(rows).build();

      expect(timesheet.totalNonPlusHours()).toBe(6.5);
    });

    it("returns 0 when there are no non-plus rows", function() {
      var rows = new Array<Summarizer.TimesheetRow>();
      rows.push(
        new Helpers.TimesheetRowBuilder()
          .withEntry(new Summarizer.DateEntry("11", "1.0"))
          .withProjectType(Summarizer.ProjectType.Bill)
          .build()
      );
      rows.push(
        new Helpers.TimesheetRowBuilder()
          .withEntry(new Summarizer.DateEntry("11", "1.0"))
          .withProjectType(Summarizer.ProjectType.Core)
          .build()
      );
      rows.push(
        new Helpers.TimesheetRowBuilder()
          .withEntry(new Summarizer.DateEntry("11", "1.0"))
          .withProjectType(Summarizer.ProjectType.Bench)
          .build()
      );

      var timesheet = new Helpers.TimesheetBuilder().withRows(rows).build();

      expect(timesheet.totalNonPlusHours()).toBe(0);
    });

    it("returns 0 when there are no entries in any rows", function() {
      var rows = new Array<Summarizer.TimesheetRow>();
      rows.push(
        new Helpers.TimesheetRowBuilder()
          .withProjectType(Summarizer.ProjectType.Internal)
          .build()
      );
      rows.push(
        new Helpers.TimesheetRowBuilder()
          .withProjectType(Summarizer.ProjectType.NonBillable)
          .build()
      );
      rows.push(
        new Helpers.TimesheetRowBuilder()
          .withProjectType(Summarizer.ProjectType.NonBillable)
          .build()
      );

      var timesheet = new Helpers.TimesheetBuilder().withRows(rows).build();

      expect(timesheet.totalNonPlusHours()).toBe(0);
    });
  });
  describe("tracking", function() {
    // This section uses a real time period of 9/1/2019 - 9/15/2019
    // Timesheet starts with Sunday 9/1
    // There were 10 working days in the period, Sept 2-6 and Sept 9-13
    // Timesheet ends with Sat/Sun Sept 14-15
    const timesheetStartDate = "2019-09-01";
    const timesheetEndDate = "2019-09-15";

    describe("tracking a totally balanced timesheet", function() {
      describe("timesheet incomplete before period ends", function() {
        const dateForToday = "2019-09-12"; // Thursday

        describe("not filled out up to today", function() {
          var arrayBuilder = new Helpers.TimesheetRowArrayBuilder();
          var rows = arrayBuilder
            .plusHoursForDates([2, 3, 4, 5, 6])
            .concat(arrayBuilder.nonPlusHoursForDates([9, 10]));

          var timesheet = new Summarizer.Timesheet(
            rows,
            timesheetStartDate,
            timesheetEndDate,
            dateForToday
          );

          it("totals the plus hours correctly", function() {
            expect(timesheet.totalPlusHours()).toBe(40);
          });

          it("totals the non-plus hours correctly", function() {
            expect(timesheet.totalNonPlusHours()).toBe(16);
          });

          it("has tracking of zero because it assumes 8 hours for 11th-13th", function() {
            expect(timesheet.plusHoursTracking()).toBe(0);
          });
        });

        describe("but filled out up to today", function() {
          var arrayBuilder = new Helpers.TimesheetRowArrayBuilder();
          var rows = arrayBuilder
            .plusHoursForDates([2, 3, 4, 5, 6])
            .concat(arrayBuilder.nonPlusHoursForDates([9, 10, 11, 12]));

          var timesheet = new Summarizer.Timesheet(
            rows,
            timesheetStartDate,
            timesheetEndDate,
            dateForToday
          );

          it("totals the plus hours correctly", function() {
            expect(timesheet.totalPlusHours()).toBe(40);
          });

          it("totals the non-plus hours correctly", function() {
            expect(timesheet.totalNonPlusHours()).toBe(32);
          });

          it("has tracking of zero because it assumes 8 hours for 13th", function() {
            expect(timesheet.plusHoursTracking()).toBe(0);
          });
        });
      });
      describe("timesheet complete before period ends", function() {
        const dateForToday = "2019-09-12"; // Thursday

        var arrayBuilder = new Helpers.TimesheetRowArrayBuilder();
        var rows = arrayBuilder
          .plusHoursForDates([2, 3, 4, 5, 6])
          .concat(arrayBuilder.nonPlusHoursForDates([9, 10, 11, 12, 13]));

        var timesheet = new Summarizer.Timesheet(
          rows,
          timesheetStartDate,
          timesheetEndDate,
          dateForToday
        );

        it("totals the plus hours correctly", function() {
          expect(timesheet.totalPlusHours()).toBe(40);
        });

        it("totals the non-plus hours correctly", function() {
          expect(timesheet.totalNonPlusHours()).toBe(40);
        });

        it("has tracking of zero because 13th is filled out", function() {
          expect(timesheet.plusHoursTracking()).toBe(0);
        });
      });
      describe("timesheet complete after period ends", function() {
        const dateForToday = "2019-09-16"; // next day after time sheet closes

        var arrayBuilder = new Helpers.TimesheetRowArrayBuilder();
        var rows = arrayBuilder
          .plusHoursForDates([2, 3, 4, 5, 6])
          .concat(arrayBuilder.nonPlusHoursForDates([9, 10, 11, 12, 13]));

        var timesheet = new Summarizer.Timesheet(
          rows,
          timesheetStartDate,
          timesheetEndDate,
          dateForToday
        );

        it("totals the plus hours correctly", function() {
          expect(timesheet.totalPlusHours()).toBe(40);
        });

        it("totals the non-plus hours correctly", function() {
          expect(timesheet.totalNonPlusHours()).toBe(40);
        });

        it("has tracking of zero because 13th is filled out", function() {
          expect(timesheet.plusHoursTracking()).toBe(0);
        });
      });
    });

    describe("tracking a timesheet with plus hour overages", function() {
      describe("overage on incomplete timesheet", function() {
        var dateForToday = "2019-09-10";

        var arrayBuilder = new Helpers.TimesheetRowArrayBuilder();
        var rows = arrayBuilder
          .plusHoursForDates([2, 3, 4, 5, 6])
          .concat(arrayBuilder.nonPlusHoursForDates([9, 10]))
          .concat(arrayBuilder.plusHoursForDates([2])); // 16 hours on the 2nd

        var timesheet = new Summarizer.Timesheet(
          rows,
          timesheetStartDate,
          timesheetEndDate,
          dateForToday
        );

        it("totals the plus hours correctly", function() {
          expect(timesheet.totalPlusHours()).toBe(48);
        });

        it("totals the non-plus hours correctly", function() {
          expect(timesheet.totalNonPlusHours()).toBe(16);
        });

        it("has tracking of 8 11-13 is assumed to be 8 hours", function() {
          expect(timesheet.plusHoursTracking()).toBe(8);
        });
      });
      describe("overage on the last working day of the timesehet", function() {
        var dateForToday = "2019-09-13";
      });

      describe("overage on the last calendar day of the timesheet", function() {
        var dateForToday = "2019-09-15";
      });
      describe("overage after the timesheet is complete", function() {
        var dateForToday = "2019-09-16";
      });
      // TODO
    });

    describe("tracking a timesheet with plus hour underages", function() {
      describe("timesheet incomplete after period ends", function() {
        const dateForToday = "2019-09-16"; // next day after time sheet closes
        // TODO
      });
      //TODO
    });

    describe("dealing with non-work days", function() {
      // TODO
    });
  });
  describe("trackerHoursFillIn", function() {
    xit("returns 0 if today is later than the last calendar day in the timesheet", function() {});
    xit("returns 0 if today is later than the last working day in the timesheet", function() {});
    xit("returns 8 if there is one workday not filled in", function() {});
  });
});
