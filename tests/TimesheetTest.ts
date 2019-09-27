import { Summarizer } from "../src/classes/classes";
import { Helpers } from "./Helpers";

describe("timesheet", function(): void {
  describe("ctor", function(): void {
    describe("rows", function(): void {
      it("throws an exception with null rows list", function(): void {
        var shouldBlowUp: any = function(): void {
          new Helpers.TimesheetBuilder().withRows(null).build();
        };

        expect(shouldBlowUp).toThrowError("Must supply a timesheet rows list.");
      });

      it("throws an exception with undefined rows list", function(): void {
        var shouldBlowUp: any = function(): void {
          new Helpers.TimesheetBuilder().withRows(undefined).build();
        };

        expect(shouldBlowUp).toThrowError("Must supply a timesheet rows list.");
      });

      it("throws an exception with empty rows list", function(): void {
        var shouldBlowUp: any = function(): void {
          new Helpers.TimesheetBuilder()
            .withRows(new Array<Summarizer.TimesheetRow>())
            .build();
        };

        expect(shouldBlowUp).toThrowError("timesheet rows list is empty.");
      });
    });

    describe("timesheet start date", function(): void {
      it("throws an error when null", function(): void {
        var shouldBlowUp: any = function(): void {
          new Helpers.TimesheetBuilder().withStartDate(null).build();
        };

        expect(shouldBlowUp).toThrowError("timesheet start date is invalid.");
      });

      it("throws an error when undefined", function(): void {
        var shouldBlowUp: any = function(): void {
          new Helpers.TimesheetBuilder().withStartDate(undefined).build();
        };

        expect(shouldBlowUp).toThrowError("timesheet start date is invalid.");
      });

      it("throws an error when empty", function(): void {
        var shouldBlowUp: any = function(): void {
          new Helpers.TimesheetBuilder().withStartDate("").build();
        };

        expect(shouldBlowUp).toThrowError("timesheet start date is invalid.");
      });

      it("throws an error when whitespace", function(): void {
        var shouldBlowUp: any = function(): void {
          new Helpers.TimesheetBuilder().withStartDate("    ").build();
        };

        expect(shouldBlowUp).toThrowError("timesheet start date is invalid.");
      });

      it("throws an error when non-formatted date", function(): void {
        var shouldBlowUp: any = function(): void {
          new Helpers.TimesheetBuilder().withStartDate("abcd").build();
        };

        expect(shouldBlowUp).toThrowError("timesheet start date is invalid.");
      });

      it("throws an error when given a date before 2010", function(): void {
        // this is just to ensure people are using it for recent timesheets; we introduced this in 2018.

        var shouldBlowUp: any = function(): void {
          new Helpers.TimesheetBuilder().withStartDate("2009-12-31").build();
        };

        expect(shouldBlowUp).toThrowError(
          "timesheet start date should be after 2009."
        );
      });

      it("is fine with a valid date", function(): void {
        var shouldBeFine: any = function(): any {
          new Helpers.TimesheetBuilder().withStartDate("2010-01-01").build();
          new Helpers.TimesheetBuilder().withStartDate("2019-09-08").build();
        };
        expect(shouldBeFine).not.toThrowError();
      });
    });

    describe("timesheet end date", function(): void {
      it("throws an error when null", function(): void {
        var shouldBlowUp: any = function(): void {
          new Helpers.TimesheetBuilder().withEndDate(null).build();
        };

        expect(shouldBlowUp).toThrowError("timesheet end date is invalid.");
      });

      it("throws an error when undefined", function(): void {
        var shouldBlowUp: any = function(): void {
          new Helpers.TimesheetBuilder().withEndDate(undefined).build();
        };

        expect(shouldBlowUp).toThrowError("timesheet end date is invalid.");
      });

      it("throws an error when empty", function(): void {
        var shouldBlowUp: any = function(): void {
          new Helpers.TimesheetBuilder().withEndDate("").build();
        };

        expect(shouldBlowUp).toThrowError("timesheet end date is invalid.");
      });

      it("throws an error when whitespace", function(): void {
        var shouldBlowUp: any = function(): void {
          new Helpers.TimesheetBuilder().withEndDate("    ").build();
        };

        expect(shouldBlowUp).toThrowError("timesheet end date is invalid.");
      });

      it("throws an error when non-formatted date", function(): void {
        var shouldBlowUp: any = function(): void {
          new Helpers.TimesheetBuilder().withEndDate("abcd").build();
        };

        expect(shouldBlowUp).toThrowError("timesheet end date is invalid.");
      });

      it("throws an error when given a date before 2010", function(): void {
        // this is just to ensure people are using it for recent timesheets; we introduced this in 2018.

        var shouldBlowUp: any = function(): void {
          new Helpers.TimesheetBuilder().withEndDate("2009-12-31").build();
        };

        expect(shouldBlowUp).toThrowError(
          "timesheet end date should be after 2009."
        );
      });

      it("is fine with a valid date", function(): void {
        var shouldBeFine: any = function(): any {
          new Helpers.TimesheetBuilder().withEndDate("01-01-2010").build();
          new Helpers.TimesheetBuilder().withEndDate("2019-09-08").build();
        };
        expect(shouldBeFine).not.toThrowError();
      });
    });

    describe("today's date", function(): void {
      it("throws an error when null", function(): void {
        var shouldBlowUp: any = function(): void {
          new Helpers.TimesheetBuilder().withTodayDate(null).build();
        };

        expect(shouldBlowUp).toThrowError("today's date is invalid.");
      });

      it("throws an error when undefined", function(): void {
        var shouldBlowUp: any = function(): void {
          new Helpers.TimesheetBuilder().withTodayDate(undefined).build();
        };

        expect(shouldBlowUp).toThrowError("today's date is invalid.");
      });

      it("throws an error when empty", function(): void {
        var shouldBlowUp: any = function(): void {
          new Helpers.TimesheetBuilder().withTodayDate("").build();
        };

        expect(shouldBlowUp).toThrowError("today's date is invalid.");
      });

      it("throws an error when whitespace", function(): void {
        var shouldBlowUp: any = function(): void {
          new Helpers.TimesheetBuilder().withTodayDate("     ").build();
        };

        expect(shouldBlowUp).toThrowError("today's date is invalid.");
      });

      it("throws an error when non-formatted date", function(): void {
        var shouldBlowUp: any = function(): void {
          new Helpers.TimesheetBuilder().withTodayDate("abcd").build();
        };

        expect(shouldBlowUp).toThrowError("today's date is invalid.");
      });

      it("throws an error when given a date before 2010", function(): void {
        // this is just to ensure people are using it for recent timesheets; we introduced this in 2018.

        var shouldBlowUp: any = function(): void {
          new Helpers.TimesheetBuilder().withTodayDate("2009-12-31").build();
        };

        expect(shouldBlowUp).toThrowError("today's date should be after 2009.");
      });

      it("is fine with a valid date", function(): void {
        var shouldBeFine: any = function(): any {
          new Helpers.TimesheetBuilder().withTodayDate("2010-01-01").build();
          new Helpers.TimesheetBuilder().withTodayDate("2019-09-08").build();
        };
        expect(shouldBeFine).not.toThrowError();
      });
    });
  });
  describe("getLatestEntryDate", function(): void {
    var hoursAmountThatDoesntMatter: string = "8";

    it("returns the largest date number that has an entry", function(): void {
      var rows: Array<Summarizer.TimesheetRow> = new Array<
        Summarizer.TimesheetRow
      >();

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

      var timesheet: Summarizer.Timesheet = new Helpers.TimesheetBuilder()
        .withRows(rows)
        .build();

      expect(timesheet.getLatestEntryDate()).toBe(3);
    });

    it("doesn't count zero time entries as a date to care about", function(): void {
      var rows: Array<Summarizer.TimesheetRow> = new Array<
        Summarizer.TimesheetRow
      >();
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

      var timesheet: Summarizer.Timesheet = new Helpers.TimesheetBuilder()
        .withRows(rows)
        .build();

      expect(timesheet.getLatestEntryDate()).toBe(2);
    });
    it("returns undefined when an empty timesheet", function(): void {
      var timesheet: Summarizer.Timesheet = new Helpers.TimesheetBuilder().build();

      expect(timesheet.getLatestEntryDate()).toBe(undefined);
    });
    it("returns undefined with a timesheet of all zero entries", function(): void {
      var rows: Array<Summarizer.TimesheetRow> = new Array<
        Summarizer.TimesheetRow
      >();
      var zeroHours: string = "0.0";

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

      var timesheet: Summarizer.Timesheet = new Helpers.TimesheetBuilder()
        .withRows(rows)
        .build();

      expect(timesheet.getLatestEntryDate()).toBe(undefined);
    });
  });
  describe("totalPlusHours", function(): void {
    it("returns the sum of hours across all plus rows on a timesheet", function(): void {
      var rows: Array<Summarizer.TimesheetRow> = new Array<
        Summarizer.TimesheetRow
      >();

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

      var timesheet: Summarizer.Timesheet = new Helpers.TimesheetBuilder()
        .withRows(rows)
        .build();

      expect(timesheet.totalPlusHours()).toBe(6.5);
    });

    it("doesn't count non-plus rows", function(): void {
      var rows: Array<Summarizer.TimesheetRow> = new Array<
        Summarizer.TimesheetRow
      >();

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

      var timesheet: Summarizer.Timesheet = new Helpers.TimesheetBuilder()
        .withRows(rows)
        .build();

      expect(timesheet.totalPlusHours()).toBe(6.5);
    });

    it("returns 0 when there are no + rows", function(): void {
      var rows: Array<Summarizer.TimesheetRow> = new Array<
        Summarizer.TimesheetRow
      >();
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

      var timesheet: Summarizer.Timesheet = new Helpers.TimesheetBuilder()
        .withRows(rows)
        .build();

      expect(timesheet.totalPlusHours()).toBe(0);
    });

    it("returns 0 when there are no entries in any rows", function(): void {
      var rows: Array<Summarizer.TimesheetRow> = new Array<
        Summarizer.TimesheetRow
      >();
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

      var timesheet: Summarizer.Timesheet = new Helpers.TimesheetBuilder()
        .withRows(rows)
        .build();

      expect(timesheet.totalPlusHours()).toBe(0);
    });
  });
  describe("totalNonPlusHours", function(): void {
    it("returns the sum of hours across all non-plus rows on a timesheet", function(): void {
      var rows: Array<Summarizer.TimesheetRow> = new Array<
        Summarizer.TimesheetRow
      >();

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

      var timesheet: Summarizer.Timesheet = new Helpers.TimesheetBuilder()
        .withRows(rows)
        .build();

      expect(timesheet.totalNonPlusHours()).toBe(6.5);
    });

    it("doesn't count plus rows", function(): void {
      var rows: Array<Summarizer.TimesheetRow> = new Array<
        Summarizer.TimesheetRow
      >();

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

      var timesheet: Summarizer.Timesheet = new Helpers.TimesheetBuilder()
        .withRows(rows)
        .build();

      expect(timesheet.totalNonPlusHours()).toBe(6.5);
    });

    it("returns 0 when there are no non-plus rows", function(): void {
      var rows: Array<Summarizer.TimesheetRow> = new Array<
        Summarizer.TimesheetRow
      >();
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

      var timesheet: Summarizer.Timesheet = new Helpers.TimesheetBuilder()
        .withRows(rows)
        .build();

      expect(timesheet.totalNonPlusHours()).toBe(0);
    });

    it("returns 0 when there are no entries in any rows", function(): void {
      var rows: Array<Summarizer.TimesheetRow> = new Array<
        Summarizer.TimesheetRow
      >();
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

      var timesheet: Summarizer.Timesheet = new Helpers.TimesheetBuilder()
        .withRows(rows)
        .build();

      expect(timesheet.totalNonPlusHours()).toBe(0);
    });
  });
  describe("tracking", function(): void {
    // this section uses a real time period of 9/1/2019 - 9/15/2019
    // timesheet starts with Sunday 9/1
    // there were 10 working days in the period, Sept 2-6 and Sept 9-13
    // timesheet ends with Sat/Sun Sept 14-15
    const timesheetStartDate: string = "2019-09-01";
    const timesheetEndDate: string = "2019-09-15";

    describe("tracking a totally balanced timesheet", function(): void {
      describe("timesheet incomplete before period ends", function(): void {
        const dateForToday: string = "2019-09-12"; // thursday

        describe("not filled out up to today", function(): void {
          var arrayBuilder: Helpers.TimesheetRowArrayBuilder = new Helpers.TimesheetRowArrayBuilder();
          var rows: Summarizer.TimesheetRow[] = arrayBuilder.plusHoursForDates([
            2,
            3,
            4,
            5,
            6,
            9,
            10,
            11
          ]);

          var timesheet: Summarizer.Timesheet = new Summarizer.Timesheet(
            rows,
            timesheetStartDate,
            timesheetEndDate,
            dateForToday
          );

          it("totals the plus hours correctly", function(): void {
            expect(timesheet.totalPlusHours()).toBe(64);
          });

          it("has tracking of zero because it assumes 8 hours for 11th-13th", function(): void {
            expect(timesheet.plusHoursTracking()).toBe(0);
          });
        });

        describe("but filled out up to today", function(): void {
          var arrayBuilder: Helpers.TimesheetRowArrayBuilder = new Helpers.TimesheetRowArrayBuilder();
          var rows: Summarizer.TimesheetRow[] = arrayBuilder.plusHoursForDates([
            2,
            3,
            4,
            5,
            6,
            9,
            10,
            11,
            12
          ]);

          var timesheet: Summarizer.Timesheet = new Summarizer.Timesheet(
            rows,
            timesheetStartDate,
            timesheetEndDate,
            dateForToday
          );

          it("totals the plus hours correctly", function(): void {
            expect(timesheet.totalPlusHours()).toBe(72);
          });

          it("has tracking of zero because it assumes 8 hours for 13th", function(): void {
            expect(timesheet.plusHoursTracking()).toBe(0);
          });
        });
      });
      describe("timesheet complete before period ends", function(): void {
        const dateForToday: string = "2019-09-12"; // thursday

        var arrayBuilder: Helpers.TimesheetRowArrayBuilder = new Helpers.TimesheetRowArrayBuilder();
        var rows: Summarizer.TimesheetRow[] = arrayBuilder
          .plusHoursForDates([2, 3, 4, 5, 6])
          .concat(arrayBuilder.nonPlusHoursForDates([9, 10, 11, 12, 13]));

        var timesheet: Summarizer.Timesheet = new Summarizer.Timesheet(
          rows,
          timesheetStartDate,
          timesheetEndDate,
          dateForToday
        );

        it("totals the plus hours correctly", function(): void {
          expect(timesheet.totalPlusHours()).toBe(40);
        });

        it("totals the non-plus hours correctly", function(): void {
          expect(timesheet.totalNonPlusHours()).toBe(40);
        });

        it("has tracking of -32 because 13th is filled out", function(): void {
          expect(timesheet.plusHoursTracking()).toBe(-32);
        });
      });
      describe("timesheet complete after period ends", function(): void {
        const dateForToday: string = "2019-09-16"; // next day after time sheet closes

        var arrayBuilder: Helpers.TimesheetRowArrayBuilder = new Helpers.TimesheetRowArrayBuilder();
        var rows: Summarizer.TimesheetRow[] = arrayBuilder.plusHoursForDates([
          2,
          3,
          4,
          5,
          6,
          9,
          10,
          11,
          12,
          13
        ]);

        var timesheet: Summarizer.Timesheet = new Summarizer.Timesheet(
          rows,
          timesheetStartDate,
          timesheetEndDate,
          dateForToday
        );

        it("totals the plus hours correctly", function(): void {
          expect(timesheet.totalPlusHours()).toBe(80);
        });

        it("has tracking of zero because 13th is filled out", function(): void {
          expect(timesheet.plusHoursTracking()).toBe(0);
        });
      });
    });

    describe("tracking a timesheet with plus hour overages", function(): void {
      describe("overage on incomplete timesheet", function(): void {
        var dateForToday: string = "2019-09-10";

        var arrayBuilder: Helpers.TimesheetRowArrayBuilder = new Helpers.TimesheetRowArrayBuilder();
        var rows: Summarizer.TimesheetRow[] = arrayBuilder
          .plusHoursForDates([2, 3, 4, 5, 6, 9, 10])
          .concat(arrayBuilder.plusHoursForDates([2])); // 16 hours on the 2nd

        var timesheet: Summarizer.Timesheet = new Summarizer.Timesheet(
          rows,
          timesheetStartDate,
          timesheetEndDate,
          dateForToday
        );

        it("totals the plus hours correctly", function(): void {
          expect(timesheet.totalPlusHours()).toBe(64);
        });

        it("has tracking of 8 11-13 is assumed to be 8 hours", function(): void {
          expect(timesheet.plusHoursTracking()).toBe(8);
        });
      });
      describe("overage on the last working day of the timesheet", function(): void {
        var dateForToday: string = "2019-09-13";

        var arrayBuilder: Helpers.TimesheetRowArrayBuilder = new Helpers.TimesheetRowArrayBuilder();
        var rows: Summarizer.TimesheetRow[] = arrayBuilder
          .plusHoursForDates([2, 3, 4, 5, 6, 9, 10, 11, 12])
          .concat(arrayBuilder.plusHoursForDates([12])); // 16 hours on the 12th

        var timesheet: Summarizer.Timesheet = new Summarizer.Timesheet(
          rows,
          timesheetStartDate,
          timesheetEndDate,
          dateForToday
        );

        it("totals the plus hours correctly", function(): void {
          expect(timesheet.totalPlusHours()).toBe(80);
        });

        it("has tracking of 8 13 is assumed to be 8 hours", function(): void {
          expect(timesheet.plusHoursTracking()).toBe(8);
        });
      });

      describe("overage on the last calendar day of the timesheet", function(): void {
        var dateForToday: string = "2019-09-15";

        var arrayBuilder: Helpers.TimesheetRowArrayBuilder = new Helpers.TimesheetRowArrayBuilder();
        var rows: Summarizer.TimesheetRow[] = arrayBuilder
          .plusHoursForDates([2, 3, 4, 5, 6, 9, 10, 11, 12, 13])
          .concat(arrayBuilder.plusHoursForDates([12])); // 16 hours on the 12th

        var timesheet: Summarizer.Timesheet = new Summarizer.Timesheet(
          rows,
          timesheetStartDate,
          timesheetEndDate,
          dateForToday
        );

        it("totals the plus hours correctly", function(): void {
          expect(timesheet.totalPlusHours()).toBe(88);
        });

        it("has tracking of 8 13 is assumed to be 8 hours", function(): void {
          expect(timesheet.plusHoursTracking()).toBe(8);
        });
      });
      describe("overage after the timesheet is complete", function(): void {
        var dateForToday: string = "2019-09-16";

        var arrayBuilder: Helpers.TimesheetRowArrayBuilder = new Helpers.TimesheetRowArrayBuilder();
        var rows: Summarizer.TimesheetRow[] = arrayBuilder
          .plusHoursForDates([2, 3, 4, 5, 6, 9, 10, 11, 12, 13])
          .concat(arrayBuilder.plusHoursForDates([12])); // 16 hours on the 12th

        var timesheet: Summarizer.Timesheet = new Summarizer.Timesheet(
          rows,
          timesheetStartDate,
          timesheetEndDate,
          dateForToday
        );

        it("totals the plus hours correctly", function(): void {
          expect(timesheet.totalPlusHours()).toBe(88);
        });

        it("has tracking of 8", function(): void {
          expect(timesheet.plusHoursTracking()).toBe(8);
        });
      });
    });

    describe("tracking a timesheet with plus hour underages", function(): void {
      describe("timesheet incomplete after period ends", function(): void {
        const dateForToday: string = "2019-09-16"; // next day after time sheet closes
        var arrayBuilder: Helpers.TimesheetRowArrayBuilder = new Helpers.TimesheetRowArrayBuilder();

        var rows: Summarizer.TimesheetRow[] = arrayBuilder
          .plusHoursForDates([2, 3, 4, 5, 6, 9, 10, 11, 13])
          .concat(arrayBuilder.nonPlusHoursForDates([12])); // non hours on the 12th

        var timesheet: Summarizer.Timesheet = new Summarizer.Timesheet(
          rows,
          timesheetStartDate,
          timesheetEndDate,
          dateForToday
        );

        it("totals the plus hours correctly", function(): void {
          expect(timesheet.totalPlusHours()).toBe(72);
        });

        it("has tracking of -8", function(): void {
          expect(timesheet.plusHoursTracking()).toBe(-8);
        });
      });
    });
  });
  describe("hoursForDate", function(): void {
    var startDate: string = "2019-09-01";
    var endDate: string = "2019-09-15";
    var todayDateThatDoesntMatter: string = "2019-09-27";

    it("returns 0 if no hours for a date", function(): void {
      var rows: Summarizer.TimesheetRow[] = new Helpers.TimesheetRowArrayBuilder().plusHoursForDates(
        [7]
      );
      var timesheet: Summarizer.Timesheet = new Summarizer.Timesheet(
        rows,
        startDate,
        endDate,
        todayDateThatDoesntMatter
      );

      expect(timesheet.hoursForDate(1)).toBe(0);
    });
    it("returns hours if plus hours exist", function(): void {
      var rows: Summarizer.TimesheetRow[] = new Helpers.TimesheetRowArrayBuilder().plusHoursForDates(
        [7]
      );
      var timesheet: Summarizer.Timesheet = new Summarizer.Timesheet(
        rows,
        startDate,
        endDate,
        todayDateThatDoesntMatter
      );

      expect(timesheet.hoursForDate(7)).toBe(8);
    });
    it("returns hours if non-plus hours exist", function(): void {
      var rows: Summarizer.TimesheetRow[] = new Helpers.TimesheetRowArrayBuilder().nonPlusHoursForDates(
        [7]
      );
      var timesheet: Summarizer.Timesheet = new Summarizer.Timesheet(
        rows,
        startDate,
        endDate,
        todayDateThatDoesntMatter
      );

      expect(timesheet.hoursForDate(7)).toBe(8);
    });
    it("returns sum if plus and non-plus exist", function(): void {
      var rowBuilder: Helpers.TimesheetRowArrayBuilder = new Helpers.TimesheetRowArrayBuilder();
      var rows: Summarizer.TimesheetRow[] = rowBuilder
        .plusHoursForDates([7])
        .concat(rowBuilder.nonPlusHoursForDates([7]));
      var timesheet: Summarizer.Timesheet = new Summarizer.Timesheet(
        rows,
        startDate,
        endDate,
        todayDateThatDoesntMatter
      );

      expect(timesheet.hoursForDate(7)).toBe(16);
    });
    it("only cares about that date", function(): void {
      var rowBuilder: Helpers.TimesheetRowArrayBuilder = new Helpers.TimesheetRowArrayBuilder();
      var rows: Summarizer.TimesheetRow[] = rowBuilder
        .plusHoursForDates([7])
        .concat(rowBuilder.nonPlusHoursForDates([10]));
      var timesheet: Summarizer.Timesheet = new Summarizer.Timesheet(
        rows,
        startDate,
        endDate,
        todayDateThatDoesntMatter
      );

      expect(timesheet.hoursForDate(7)).toBe(8);
    });
  });
  describe("numberOfRemainingWorkDays", function(): void {
    var startDate: string = "2019-09-01";
    var endDate: string = "2019-09-15";
    var rowsThatDontMatter: Summarizer.TimesheetRow[] = new Helpers.TimesheetRowArrayBuilder().plusHoursForDates(
      [6]
    );
    it("returns zero when today is after the timesheet end", function(): void {
      var timesheet: Summarizer.Timesheet = new Summarizer.Timesheet(
        rowsThatDontMatter,
        startDate,
        endDate,
        "2019-09-27"
      );

      expect(timesheet.numberOfRemainingWorkDays()).toBe(0);
    });
    it("returns zero when today is in a weekend at the end of the timesheet", function(): void {
      var timesheet: Summarizer.Timesheet = new Summarizer.Timesheet(
        rowsThatDontMatter,
        startDate,
        endDate,
        "2019-09-14"
      );

      expect(timesheet.numberOfRemainingWorkDays()).toBe(0);
    });
    it("returns 1 when today is the last workday of the timesheet", function(): void {
      var timesheet: Summarizer.Timesheet = new Summarizer.Timesheet(
        rowsThatDontMatter,
        startDate,
        endDate,
        "2019-09-13"
      );

      expect(timesheet.numberOfRemainingWorkDays()).toBe(1);
    });
    it("returns 0 when today is the last workday of the timesheet and has hours", function(): void {
      var rows: Summarizer.TimesheetRow[] = rowsThatDontMatter.concat(
        new Helpers.TimesheetRowArrayBuilder().plusHoursForDates([13])
      );

      var timesheet: Summarizer.Timesheet = new Summarizer.Timesheet(
        rows,
        startDate,
        endDate,
        "2019-09-13"
      );

      expect(timesheet.numberOfRemainingWorkDays()).toBe(0);
    });
    it("returns 2 when today is the 2nd to last day in timesheet", function(): void {
      var timesheet: Summarizer.Timesheet = new Summarizer.Timesheet(
        rowsThatDontMatter,
        startDate,
        endDate,
        "2019-09-12"
      );

      expect(timesheet.numberOfRemainingWorkDays()).toBe(2);
    });
    it("returns 1 when today is 2nd to last day but has hours", function(): void {
      var rows: Summarizer.TimesheetRow[] = rowsThatDontMatter.concat(
        new Helpers.TimesheetRowArrayBuilder().plusHoursForDates([12])
      );

      var timesheet: Summarizer.Timesheet = new Summarizer.Timesheet(
        rows,
        startDate,
        endDate,
        "2019-09-12"
      );

      expect(timesheet.numberOfRemainingWorkDays()).toBe(1);
    });
  });
  describe("weekdaysInTimesheet", function(): void {
    describe("uses start and end dates to calculate weekdays", function(): void {
      it("returns 0 workdays when started/ended on a weekend", function(): void {
        var saturday: string = "2019-09-07";
        var sunday: string = "2019-09-08";

        var rows: Summarizer.TimesheetRow[] = new Helpers.TimesheetRowArrayBuilder().plusHoursForDates(
          [7]
        );
        var timesheet: Summarizer.Timesheet = new Summarizer.Timesheet(
          rows,
          saturday,
          sunday,
          sunday
        );

        expect(timesheet.weekdaysInTimesheet()).toBe(0);
      });
      it("returns 1 when start/end date are the same weekday", function(): void {
        var monday: string = "2019-09-10";

        var rows: Summarizer.TimesheetRow[] = new Helpers.TimesheetRowArrayBuilder().plusHoursForDates(
          [10]
        );
        var timesheet: Summarizer.Timesheet = new Summarizer.Timesheet(
          rows,
          monday,
          monday,
          monday
        );

        expect(timesheet.weekdaysInTimesheet()).toBe(1);
      });
      it("returns the correct number of weekdays in the 9/1/19 - 9/15/19 pay period", function(): void {
        var rowArrayThatDoesntMatter: Summarizer.TimesheetRow[] = new Helpers.TimesheetRowArrayBuilder().plusHoursForDates(
          [8]
        );
        var dayForTodayThatDoesntMatter: string = "2019-09-27";

        var timesheet: Summarizer.Timesheet = new Summarizer.Timesheet(
          rowArrayThatDoesntMatter,
          "2019-09-01",
          "2019-09-15",
          dayForTodayThatDoesntMatter
        );

        expect(timesheet.weekdaysInTimesheet()).toBe(10);
      });
    });
  });
  describe("hoursByProjectType", function(): void {
    var startDate: string = "2019-09-01";
    var endDate: string = "2019-09-15";
    var todayDate: string = "2019-09-13";

    var helper: Helpers.TimesheetRowArrayBuilder = new Helpers.TimesheetRowArrayBuilder();

    var rows: Summarizer.TimesheetRow[] = new Array<Summarizer.TimesheetRow>()
      .concat(helper.hoursOfTypeForDates([1, 2], Summarizer.ProjectType.Bill))
      .concat(
        helper.hoursOfTypeForDates([3, 4, 5], Summarizer.ProjectType.Bench)
      )
      .concat(
        helper.hoursOfTypeForDates([6, 7, 8, 9], Summarizer.ProjectType.Core)
      )
      .concat(
        helper.hoursOfTypeForDates([10, 11], Summarizer.ProjectType.Internal)
      )
      .concat(
        helper.hoursOfTypeForDates(
          [11, 12, 13],
          Summarizer.ProjectType.NonBillable
        )
      );

    var timesheet: Summarizer.Timesheet = new Summarizer.Timesheet(
      rows,
      startDate,
      endDate,
      todayDate
    );

    var result: Array<{
      projectType: Summarizer.ProjectType;
      total: number;
    }> = timesheet.hoursByProjectType();

    it("breaks down categories correctly", function(): void {
      expect(result.length).toBe(5);
      expect(
        result.find(i => i.projectType === Summarizer.ProjectType.Bill).total
      ).toBe(16);
      expect(
        result.find(i => i.projectType === Summarizer.ProjectType.Bench).total
      ).toBe(24);
      expect(
        result.find(i => i.projectType === Summarizer.ProjectType.Core).total
      ).toBe(32);
      expect(
        result.find(i => i.projectType === Summarizer.ProjectType.Internal)
          .total
      ).toBe(16);
      expect(
        result.find(i => i.projectType === Summarizer.ProjectType.NonBillable)
          .total
      ).toBe(24);
    });
    it("matches the sum of plus rows", function(): void {
      var bill: number = result.find(
        i => i.projectType === Summarizer.ProjectType.Bill
      ).total;
      var core: number = result.find(
        i => i.projectType === Summarizer.ProjectType.Core
      ).total;
      var bench: number = result.find(
        i => i.projectType === Summarizer.ProjectType.Bench
      ).total;

      expect(timesheet.totalPlusHours()).toBe(bill + core + bench);
    });
    it("matches the sum of non-plus rows", function(): void {
      var internal: number = result.find(
        i => i.projectType === Summarizer.ProjectType.Internal
      ).total;
      var nonBillable: number = result.find(
        i => i.projectType === Summarizer.ProjectType.NonBillable
      ).total;

      expect(timesheet.totalNonPlusHours()).toBe(internal + nonBillable);
    });
  });
  describe("Sean's actual 9/1/2019-9/15/2019 timesheet", function(): void {
    var rows: Array<Summarizer.TimesheetRow> = new Array<
      Summarizer.TimesheetRow
    >();
    var nrecaRow: Summarizer.TimesheetRow = new Helpers.TimesheetRowBuilder()
      .withProjectType(Summarizer.ProjectType.Bill)
      .withEntry(new Summarizer.DateEntry("4", "7.75"))
      .withEntry(new Summarizer.DateEntry("5", "10.25"))
      .withEntry(new Summarizer.DateEntry("6", "5.50"))
      .withEntry(new Summarizer.DateEntry("9", "10.25"))
      .withEntry(new Summarizer.DateEntry("10", "9.50"))
      .withEntry(new Summarizer.DateEntry("11", "7.50"))
      .withEntry(new Summarizer.DateEntry("12", "7"))
      .withEntry(new Summarizer.DateEntry("13", ".5"))
      .build();

    var trainingRow: Summarizer.TimesheetRow = new Helpers.TimesheetRowBuilder()
      .withProjectType(Summarizer.ProjectType.Bill)
      .withEntry(new Summarizer.DateEntry("3", "1.0"))
      .withEntry(new Summarizer.DateEntry("5", "1.25"))
      .withEntry(new Summarizer.DateEntry("11", ".75"))
      .withEntry(new Summarizer.DateEntry("12", "0.0"))
      .withEntry(new Summarizer.DateEntry("15", "3.0"))
      .build();

    var holidayRow: Summarizer.TimesheetRow = new Helpers.TimesheetRowBuilder()
      .withProjectType(Summarizer.ProjectType.Core)
      .withEntry(new Summarizer.DateEntry("2", "8"))
      .build();

    var sickRow: Summarizer.TimesheetRow = new Helpers.TimesheetRowBuilder()
      .withProjectType(Summarizer.ProjectType.Core)
      .withEntry(new Summarizer.DateEntry("4", "1"))
      .build();

    var bdRow: Summarizer.TimesheetRow = new Helpers.TimesheetRowBuilder()
      .withProjectType(Summarizer.ProjectType.Core)
      .withEntry(new Summarizer.DateEntry("1", "3"))
      .withEntry(new Summarizer.DateEntry("2", "3"))
      .withEntry(new Summarizer.DateEntry("3", "10"))
      .withEntry(new Summarizer.DateEntry("4", "1.75"))
      .withEntry(new Summarizer.DateEntry("6", "3.75"))
      .withEntry(new Summarizer.DateEntry("9", "1.50"))
      .withEntry(new Summarizer.DateEntry("10", "0.25"))
      .withEntry(new Summarizer.DateEntry("11", ".50"))
      .withEntry(new Summarizer.DateEntry("13", "5.25"))
      .build();

    var rediRow: Summarizer.TimesheetRow = new Helpers.TimesheetRowBuilder()
      .withProjectType(Summarizer.ProjectType.Core)
      .withEntry(new Summarizer.DateEntry("10", "2.0"))
      .build();

    var innovationRow: Summarizer.TimesheetRow = new Helpers.TimesheetRowBuilder()
      .withProjectType(Summarizer.ProjectType.Core)
      .withEntry(new Summarizer.DateEntry("3", "3.25"))
      .withEntry(new Summarizer.DateEntry("6", "1.0"))
      .withEntry(new Summarizer.DateEntry("13", "2.50"))
      .build();

    rows.push(nrecaRow);
    rows.push(trainingRow);
    rows.push(holidayRow);
    rows.push(sickRow);
    rows.push(bdRow);
    rows.push(rediRow);
    rows.push(innovationRow);

    var timesheet: Summarizer.Timesheet = new Summarizer.Timesheet(
      rows,
      "2019-09-01",
      "2019-09-15",
      "2019-09-27"
    );

    it("totals plus rows correctly", function(): void {
      expect(timesheet.totalPlusHours()).toBe(111);
    });

    it("totals non-plus rows correctly", function(): void {
      expect(timesheet.totalNonPlusHours()).toBe(0);
    });

    it("totals tracking correctly", function(): void {
      expect(timesheet.plusHoursTracking()).toBe(31);
    });

    it("breaks down categories correctly", function(): void {
      expect(
        timesheet
          .hoursByProjectType()
          .find(i => i.projectType === Summarizer.ProjectType.Bill).total
      ).toBe(64.25);
      expect(
        timesheet
          .hoursByProjectType()
          .find(i => i.projectType === Summarizer.ProjectType.Core).total
      ).toBe(46.75);
    });
  });
});
