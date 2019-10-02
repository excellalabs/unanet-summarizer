import { DateEntry } from "../src/classes/DateEntry";
import { ProjectType } from "../src/classes/ProjectType";
import { Timesheet } from "../src/classes/Timesheet";
import { TimesheetRow } from "../src/classes/TimesheetRow";

import { TimesheetBuilder } from "../tests/Helpers/TimesheetBuilder";
import { TimesheetRowArrayBuilder } from "../tests/Helpers/TimesheetRowArrayBuilder";
import { TimesheetRowBuilder } from "../tests/Helpers/TimesheetRowBuilder";

describe("timesheet", () => {
  describe("ctor", () => {
    describe("rows", () => {
      it("throws an exception with null rows list", () => {
        const shouldBlowUp: any = () => {
          new TimesheetBuilder().withRows(null).build();
        };

        expect(shouldBlowUp).toThrowError("Must supply a timesheet rows list.");
      });

      it("throws an exception with undefined rows list", () => {
        const shouldBlowUp: any = () => {
          new TimesheetBuilder().withRows(undefined).build();
        };

        expect(shouldBlowUp).toThrowError("Must supply a timesheet rows list.");
      });

      it("throws an exception with empty rows list", () => {
        const shouldBlowUp: any = () => {
          new TimesheetBuilder().withRows(new Array<TimesheetRow>()).build();
        };

        expect(shouldBlowUp).toThrowError("timesheet rows list is empty.");
      });
    });

    describe("timesheet start date", () => {
      it("throws an error when null", () => {
        const shouldBlowUp: any = () => {
          new TimesheetBuilder().withStartDate(null).build();
        };

        expect(shouldBlowUp).toThrowError("timesheet start date is invalid.");
      });

      it("throws an error when undefined", () => {
        const shouldBlowUp: any = () => {
          new TimesheetBuilder().withStartDate(undefined).build();
        };

        expect(shouldBlowUp).toThrowError("timesheet start date is invalid.");
      });

      it("throws an error when empty", () => {
        const shouldBlowUp: any = () => {
          new TimesheetBuilder().withStartDate("").build();
        };

        expect(shouldBlowUp).toThrowError("timesheet start date is invalid.");
      });

      it("throws an error when whitespace", () => {
        const shouldBlowUp: any = () => {
          new TimesheetBuilder().withStartDate("    ").build();
        };

        expect(shouldBlowUp).toThrowError("timesheet start date is invalid.");
      });

      it("throws an error when non-formatted date", () => {
        const shouldBlowUp: any = () => {
          new TimesheetBuilder().withStartDate("abcd").build();
        };

        expect(shouldBlowUp).toThrowError("timesheet start date is invalid.");
      });

      it("throws an error when given a date before 2010", () => {
        // this is just to ensure people are using it for recent timesheets; we introduced this in 2018.

        const shouldBlowUp: any = () => {
          new TimesheetBuilder().withStartDate("2009-12-31").build();
        };

        expect(shouldBlowUp).toThrowError("timesheet start date should be after 2009.");
      });

      it("is fine with a valid date", () => {
        const shouldBeFine: any = () => {
          new TimesheetBuilder().withStartDate("2010-01-01").build();
          new TimesheetBuilder().withStartDate("2019-09-08").build();
        };
        expect(shouldBeFine).not.toThrowError();
      });
    });

    describe("timesheet end date", () => {
      it("throws an error when null", () => {
        const shouldBlowUp: any = () => {
          new TimesheetBuilder().withEndDate(null).build();
        };

        expect(shouldBlowUp).toThrowError("timesheet end date is invalid.");
      });

      it("throws an error when undefined", () => {
        const shouldBlowUp: any = () => {
          new TimesheetBuilder().withEndDate(undefined).build();
        };

        expect(shouldBlowUp).toThrowError("timesheet end date is invalid.");
      });

      it("throws an error when empty", () => {
        const shouldBlowUp: any = () => {
          new TimesheetBuilder().withEndDate("").build();
        };

        expect(shouldBlowUp).toThrowError("timesheet end date is invalid.");
      });

      it("throws an error when whitespace", () => {
        const shouldBlowUp: any = () => {
          new TimesheetBuilder().withEndDate("    ").build();
        };

        expect(shouldBlowUp).toThrowError("timesheet end date is invalid.");
      });

      it("throws an error when non-formatted date", () => {
        const shouldBlowUp: any = () => {
          new TimesheetBuilder().withEndDate("abcd").build();
        };

        expect(shouldBlowUp).toThrowError("timesheet end date is invalid.");
      });

      it("throws an error when given a date before 2010", () => {
        // this is just to ensure people are using it for recent timesheets; we introduced this in 2018.

        const shouldBlowUp: any = () => {
          new TimesheetBuilder().withEndDate("2009-12-31").build();
        };

        expect(shouldBlowUp).toThrowError("timesheet end date should be after 2009.");
      });

      it("is fine with a valid date", () => {
        const shouldBeFine: any = () => {
          new TimesheetBuilder().withEndDate("01-01-2010").build();
          new TimesheetBuilder().withEndDate("2019-09-08").build();
        };
        expect(shouldBeFine).not.toThrowError();
      });
    });

    describe("today's date", () => {
      it("throws an error when null", () => {
        const shouldBlowUp: any = () => {
          new TimesheetBuilder().withTodayDate(null).build();
        };

        expect(shouldBlowUp).toThrowError("today's date is invalid.");
      });

      it("throws an error when undefined", () => {
        const shouldBlowUp: any = () => {
          new TimesheetBuilder().withTodayDate(undefined).build();
        };

        expect(shouldBlowUp).toThrowError("today's date is invalid.");
      });

      it("throws an error when empty", () => {
        const shouldBlowUp: any = () => {
          new TimesheetBuilder().withTodayDate("").build();
        };

        expect(shouldBlowUp).toThrowError("today's date is invalid.");
      });

      it("throws an error when whitespace", () => {
        const shouldBlowUp: any = () => {
          new TimesheetBuilder().withTodayDate("     ").build();
        };

        expect(shouldBlowUp).toThrowError("today's date is invalid.");
      });

      it("throws an error when non-formatted date", () => {
        const shouldBlowUp: any = () => {
          new TimesheetBuilder().withTodayDate("abcd").build();
        };

        expect(shouldBlowUp).toThrowError("today's date is invalid.");
      });

      it("throws an error when given a date before 2010", () => {
        // this is just to ensure people are using it for recent timesheets; we introduced this in 2018.

        const shouldBlowUp: any = () => {
          new TimesheetBuilder().withTodayDate("2009-12-31").build();
        };

        expect(shouldBlowUp).toThrowError("today's date should be after 2009.");
      });

      it("is fine with a valid date", () => {
        const shouldBeFine: any = () => {
          new TimesheetBuilder().withTodayDate("2010-01-01").build();
          new TimesheetBuilder().withTodayDate("2019-09-08").build();
        };
        expect(shouldBeFine).not.toThrowError();
      });
    });
  });
  describe("getLatestEntryDate", () => {
    const hoursAmountThatDoesntMatter: string = "8";

    it("returns the largest date number that has an entry", () => {
      const rows: TimesheetRow[] = new Array<TimesheetRow>();

      rows.push(new TimesheetRowBuilder().withEntry(new DateEntry("2", hoursAmountThatDoesntMatter)).build());
      rows.push(new TimesheetRowBuilder().withEntry(new DateEntry("3", hoursAmountThatDoesntMatter)).build());
      rows.push(new TimesheetRowBuilder().withEntry(new DateEntry("1", hoursAmountThatDoesntMatter)).build());

      const timesheet: Timesheet = new TimesheetBuilder().withRows(rows).build();

      expect(timesheet.getLatestEntryDate()).toBe(3);
    });

    it("doesn't count zero time entries as a date to care about", () => {
      const rows: TimesheetRow[] = new Array<TimesheetRow>();
      rows.push(new TimesheetRowBuilder().withEntry(new DateEntry("2", hoursAmountThatDoesntMatter)).build());
      rows.push(new TimesheetRowBuilder().withEntry(new DateEntry("3", "0.0")).build());
      rows.push(new TimesheetRowBuilder().withEntry(new DateEntry("1", hoursAmountThatDoesntMatter)).build());

      const timesheet: Timesheet = new TimesheetBuilder().withRows(rows).build();

      expect(timesheet.getLatestEntryDate()).toBe(2);
    });
    it("returns undefined when an empty timesheet", () => {
      const timesheet: Timesheet = new TimesheetBuilder().build();

      expect(timesheet.getLatestEntryDate()).toBe(undefined);
    });
    it("returns undefined with a timesheet of all zero entries", () => {
      const rows: TimesheetRow[] = new Array<TimesheetRow>();
      const zeroHours: string = "0.0";

      rows.push(new TimesheetRowBuilder().withEntry(new DateEntry("2", zeroHours)).build());
      rows.push(new TimesheetRowBuilder().withEntry(new DateEntry("10", zeroHours)).build());
      rows.push(new TimesheetRowBuilder().withEntry(new DateEntry("30", zeroHours)).build());

      const timesheet: Timesheet = new TimesheetBuilder().withRows(rows).build();

      expect(timesheet.getLatestEntryDate()).toBe(undefined);
    });
  });
  describe("totalPlusHours", () => {
    it("returns the sum of hours across all plus rows on a timesheet", () => {
      const rows: TimesheetRow[] = new Array<TimesheetRow>();

      rows.push(
        new TimesheetRowBuilder()
          .withEntry(new DateEntry("11", "1.0"))
          .withProjectType(ProjectType.Bench)
          .build()
      );
      rows.push(
        new TimesheetRowBuilder()
          .withEntry(new DateEntry("12", "2.0"))
          .withProjectType(ProjectType.Bill)
          .build()
      );
      rows.push(
        new TimesheetRowBuilder()
          .withEntry(new DateEntry("13", "3.5"))
          .withProjectType(ProjectType.Core)
          .build()
      );

      const timesheet: Timesheet = new TimesheetBuilder().withRows(rows).build();

      expect(timesheet.totalPlusHours()).toBe(6.5);
    });

    it("doesn't count non-plus rows", () => {
      const rows: TimesheetRow[] = new Array<TimesheetRow>();

      rows.push(
        new TimesheetRowBuilder()
          .withEntry(new DateEntry("11", "1.0"))
          .withProjectType(ProjectType.Bench)
          .build()
      );
      rows.push(
        new TimesheetRowBuilder()
          .withEntry(new DateEntry("12", "2.0"))
          .withProjectType(ProjectType.Bill)
          .build()
      );
      rows.push(
        new TimesheetRowBuilder()
          .withEntry(new DateEntry("13", "3.5"))
          .withProjectType(ProjectType.Core)
          .build()
      );
      rows.push(
        new TimesheetRowBuilder()
          .withEntry(new DateEntry("13", "2"))
          .withProjectType(ProjectType.Internal)
          .build()
      );
      rows.push(
        new TimesheetRowBuilder()
          .withEntry(new DateEntry("13", "2"))
          .withProjectType(ProjectType.NonBillable)
          .build()
      );

      const timesheet: Timesheet = new TimesheetBuilder().withRows(rows).build();

      expect(timesheet.totalPlusHours()).toBe(6.5);
    });

    it("returns 0 when there are no + rows", () => {
      const rows: TimesheetRow[] = new Array<TimesheetRow>();
      rows.push(
        new TimesheetRowBuilder()
          .withEntry(new DateEntry("11", "1.0"))
          .withProjectType(ProjectType.Internal)
          .build()
      );
      rows.push(
        new TimesheetRowBuilder()
          .withEntry(new DateEntry("11", "1.0"))
          .withProjectType(ProjectType.NonBillable)
          .build()
      );
      rows.push(
        new TimesheetRowBuilder()
          .withEntry(new DateEntry("11", "1.0"))
          .withProjectType(ProjectType.Internal)
          .build()
      );

      const timesheet: Timesheet = new TimesheetBuilder().withRows(rows).build();

      expect(timesheet.totalPlusHours()).toBe(0);
    });

    it("returns 0 when there are no entries in any rows", () => {
      const rows: TimesheetRow[] = new Array<TimesheetRow>();
      rows.push(new TimesheetRowBuilder().withProjectType(ProjectType.Core).build());
      rows.push(new TimesheetRowBuilder().withProjectType(ProjectType.Bench).build());
      rows.push(new TimesheetRowBuilder().withProjectType(ProjectType.Bill).build());

      const timesheet: Timesheet = new TimesheetBuilder().withRows(rows).build();

      expect(timesheet.totalPlusHours()).toBe(0);
    });
  });
  describe("totalNonPlusHours", () => {
    it("returns the sum of hours across all non-plus rows on a timesheet", () => {
      const rows: TimesheetRow[] = new Array<TimesheetRow>();

      rows.push(
        new TimesheetRowBuilder()
          .withEntry(new DateEntry("11", "1.0"))
          .withProjectType(ProjectType.Internal)
          .build()
      );
      rows.push(
        new TimesheetRowBuilder()
          .withEntry(new DateEntry("12", "2.0"))
          .withProjectType(ProjectType.NonBillable)
          .build()
      );
      rows.push(
        new TimesheetRowBuilder()
          .withEntry(new DateEntry("13", "3.5"))
          .withProjectType(ProjectType.Internal)
          .build()
      );

      const timesheet: Timesheet = new TimesheetBuilder().withRows(rows).build();

      expect(timesheet.totalNonPlusHours()).toBe(6.5);
    });

    it("doesn't count plus rows", () => {
      const rows: TimesheetRow[] = new Array<TimesheetRow>();

      rows.push(
        new TimesheetRowBuilder()
          .withEntry(new DateEntry("11", "1.0"))
          .withProjectType(ProjectType.NonBillable)
          .build()
      );
      rows.push(
        new TimesheetRowBuilder()
          .withEntry(new DateEntry("12", "2.0"))
          .withProjectType(ProjectType.Internal)
          .build()
      );
      rows.push(
        new TimesheetRowBuilder()
          .withEntry(new DateEntry("13", "3.5"))
          .withProjectType(ProjectType.Internal)
          .build()
      );
      rows.push(
        new TimesheetRowBuilder()
          .withEntry(new DateEntry("13", "2"))
          .withProjectType(ProjectType.Core)
          .build()
      );
      rows.push(
        new TimesheetRowBuilder()
          .withEntry(new DateEntry("13", "2"))
          .withProjectType(ProjectType.Bench)
          .build()
      );

      const timesheet: Timesheet = new TimesheetBuilder().withRows(rows).build();

      expect(timesheet.totalNonPlusHours()).toBe(6.5);
    });

    it("returns 0 when there are no non-plus rows", () => {
      const rows: TimesheetRow[] = new Array<TimesheetRow>();
      rows.push(
        new TimesheetRowBuilder()
          .withEntry(new DateEntry("11", "1.0"))
          .withProjectType(ProjectType.Bill)
          .build()
      );
      rows.push(
        new TimesheetRowBuilder()
          .withEntry(new DateEntry("11", "1.0"))
          .withProjectType(ProjectType.Core)
          .build()
      );
      rows.push(
        new TimesheetRowBuilder()
          .withEntry(new DateEntry("11", "1.0"))
          .withProjectType(ProjectType.Bench)
          .build()
      );

      const timesheet: Timesheet = new TimesheetBuilder().withRows(rows).build();

      expect(timesheet.totalNonPlusHours()).toBe(0);
    });

    it("returns 0 when there are no entries in any rows", () => {
      const rows: TimesheetRow[] = new Array<TimesheetRow>();
      rows.push(new TimesheetRowBuilder().withProjectType(ProjectType.Internal).build());
      rows.push(new TimesheetRowBuilder().withProjectType(ProjectType.NonBillable).build());
      rows.push(new TimesheetRowBuilder().withProjectType(ProjectType.NonBillable).build());

      const timesheet: Timesheet = new TimesheetBuilder().withRows(rows).build();

      expect(timesheet.totalNonPlusHours()).toBe(0);
    });
  });
  describe("tracking", () => {
    // this section uses a real time period of 9/1/2019 - 9/15/2019
    // timesheet starts with Sunday 9/1
    // there were 10 working days in the period, Sept 2-6 and Sept 9-13
    // timesheet ends with Sat/Sun Sept 14-15
    const timesheetStartDate: string = "2019-09-01";
    const timesheetEndDate: string = "2019-09-15";

    describe("tracking a totally balanced timesheet", () => {
      describe("timesheet incomplete before period ends", () => {
        const dateForToday: string = "2019-09-12"; // thursday
        const arrayBuilder: TimesheetRowArrayBuilder = new TimesheetRowArrayBuilder();

        describe("not filled out up to today", () => {
          const rows: TimesheetRow[] = arrayBuilder.plusHoursForDates([2, 3, 4, 5, 6, 9, 10, 11]);

          const timesheet: Timesheet = new Timesheet(rows, timesheetStartDate, timesheetEndDate, dateForToday);

          it("totals the plus hours correctly", () => {
            expect(timesheet.totalPlusHours()).toBe(64);
          });

          it("has tracking of zero because it assumes 8 hours for 11th-13th", () => {
            expect(timesheet.plusHoursTracking()).toBe(0);
          });
        });

        describe("adding hours when today is a weekend", () => {
          it("increases the tracking hours", () => {
            const rows: TimesheetRow[] = arrayBuilder.plusHoursForDates([2, 3, 4, 5, 6, 7]);
            const saturday = "2019-09-07";

            const timesheet: Timesheet = new Timesheet(rows, timesheetStartDate, timesheetEndDate, saturday);

            expect(timesheet.plusHoursTracking()).toBe(8);
          });
        });

        describe("but filled out up to today", () => {
          const rows: TimesheetRow[] = arrayBuilder.plusHoursForDates([2, 3, 4, 5, 6, 9, 10, 11, 12]);

          const timesheet: Timesheet = new Timesheet(rows, timesheetStartDate, timesheetEndDate, dateForToday);

          it("totals the plus hours correctly", () => {
            expect(timesheet.totalPlusHours()).toBe(72);
          });

          it("has tracking of zero because it assumes 8 hours for 13th", () => {
            expect(timesheet.plusHoursTracking()).toBe(0);
          });
        });
      });
      describe("timesheet complete before period ends", () => {
        const dateForToday: string = "2019-09-12"; // thursday

        const arrayBuilder: TimesheetRowArrayBuilder = new TimesheetRowArrayBuilder();
        const rows: TimesheetRow[] = arrayBuilder.plusHoursForDates([2, 3, 4, 5, 6]).concat(arrayBuilder.nonPlusHoursForDates([9, 10, 11, 12, 13]));

        const timesheet: Timesheet = new Timesheet(rows, timesheetStartDate, timesheetEndDate, dateForToday);

        it("totals the plus hours correctly", () => {
          expect(timesheet.totalPlusHours()).toBe(40);
        });

        it("totals the non-plus hours correctly", () => {
          expect(timesheet.totalNonPlusHours()).toBe(40);
        });

        it("has tracking of -32 because 13th is filled out", () => {
          expect(timesheet.plusHoursTracking()).toBe(-32);
        });
      });
      describe("timesheet complete after period ends", () => {
        const dateForToday: string = "2019-09-16"; // next day after time sheet closes

        const arrayBuilder: TimesheetRowArrayBuilder = new TimesheetRowArrayBuilder();
        const rows: TimesheetRow[] = arrayBuilder.plusHoursForDates([2, 3, 4, 5, 6, 9, 10, 11, 12, 13]);

        const timesheet: Timesheet = new Timesheet(rows, timesheetStartDate, timesheetEndDate, dateForToday);

        it("totals the plus hours correctly", () => {
          expect(timesheet.totalPlusHours()).toBe(80);
        });

        it("has tracking of zero because 13th is filled out", () => {
          expect(timesheet.plusHoursTracking()).toBe(0);
        });
      });
    });

    describe("tracking a timesheet with plus hour overages", () => {
      describe("overage on incomplete timesheet", () => {
        const dateForToday: string = "2019-09-10";

        const arrayBuilder: TimesheetRowArrayBuilder = new TimesheetRowArrayBuilder();
        const rows: TimesheetRow[] = arrayBuilder.plusHoursForDates([2, 3, 4, 5, 6, 9, 10]).concat(arrayBuilder.plusHoursForDates([2])); // 16 hours on the 2nd

        const timesheet: Timesheet = new Timesheet(rows, timesheetStartDate, timesheetEndDate, dateForToday);

        it("totals the plus hours correctly", () => {
          expect(timesheet.totalPlusHours()).toBe(64);
        });

        it("has tracking of 8 11-13 is assumed to be 8 hours", () => {
          expect(timesheet.plusHoursTracking()).toBe(8);
        });
      });
      describe("overage on the last working day of the timesheet", () => {
        const dateForToday: string = "2019-09-13";

        const arrayBuilder: TimesheetRowArrayBuilder = new TimesheetRowArrayBuilder();
        const rows: TimesheetRow[] = arrayBuilder.plusHoursForDates([2, 3, 4, 5, 6, 9, 10, 11, 12]).concat(arrayBuilder.plusHoursForDates([12])); // 16 hours on the 12th

        const timesheet: Timesheet = new Timesheet(rows, timesheetStartDate, timesheetEndDate, dateForToday);

        it("totals the plus hours correctly", () => {
          expect(timesheet.totalPlusHours()).toBe(80);
        });

        it("has tracking of 8 13 is assumed to be 8 hours", () => {
          expect(timesheet.plusHoursTracking()).toBe(8);
        });
      });

      describe("overage on the last calendar day of the timesheet", () => {
        const dateForToday: string = "2019-09-15";

        const arrayBuilder: TimesheetRowArrayBuilder = new TimesheetRowArrayBuilder();
        const rows: TimesheetRow[] = arrayBuilder.plusHoursForDates([2, 3, 4, 5, 6, 9, 10, 11, 12, 13]).concat(arrayBuilder.plusHoursForDates([12])); // 16 hours on the 12th

        const timesheet: Timesheet = new Timesheet(rows, timesheetStartDate, timesheetEndDate, dateForToday);

        it("totals the plus hours correctly", () => {
          expect(timesheet.totalPlusHours()).toBe(88);
        });

        it("has tracking of 8 13 is assumed to be 8 hours", () => {
          expect(timesheet.plusHoursTracking()).toBe(8);
        });
      });
      describe("overage after the timesheet is complete", () => {
        const dateForToday: string = "2019-09-16";

        const arrayBuilder: TimesheetRowArrayBuilder = new TimesheetRowArrayBuilder();
        const rows: TimesheetRow[] = arrayBuilder.plusHoursForDates([2, 3, 4, 5, 6, 9, 10, 11, 12, 13]).concat(arrayBuilder.plusHoursForDates([12])); // 16 hours on the 12th

        const timesheet: Timesheet = new Timesheet(rows, timesheetStartDate, timesheetEndDate, dateForToday);

        it("totals the plus hours correctly", () => {
          expect(timesheet.totalPlusHours()).toBe(88);
        });

        it("has tracking of 8", () => {
          expect(timesheet.plusHoursTracking()).toBe(8);
        });
      });
    });

    describe("tracking a timesheet with plus hour underages", () => {
      describe("timesheet incomplete after period ends", () => {
        const dateForToday: string = "2019-09-16"; // next day after time sheet closes
        const arrayBuilder: TimesheetRowArrayBuilder = new TimesheetRowArrayBuilder();

        const rows: TimesheetRow[] = arrayBuilder.plusHoursForDates([2, 3, 4, 5, 6, 9, 10, 11, 13]).concat(arrayBuilder.nonPlusHoursForDates([12])); // non hours on the 12th

        const timesheet: Timesheet = new Timesheet(rows, timesheetStartDate, timesheetEndDate, dateForToday);

        it("totals the plus hours correctly", () => {
          expect(timesheet.totalPlusHours()).toBe(72);
        });

        it("has tracking of -8", () => {
          expect(timesheet.plusHoursTracking()).toBe(-8);
        });
      });
    });
  });
  describe("hoursForDate", () => {
    const startDate: string = "2019-09-01";
    const endDate: string = "2019-09-15";
    const todayDateThatDoesntMatter: string = "2019-09-27";

    it("returns 0 if no hours for a date", () => {
      const rows: TimesheetRow[] = new TimesheetRowArrayBuilder().plusHoursForDates([7]);
      const timesheet: Timesheet = new Timesheet(rows, startDate, endDate, todayDateThatDoesntMatter);

      expect(timesheet.hoursForDate(1)).toBe(0);
    });
    it("returns hours if plus hours exist", () => {
      const rows: TimesheetRow[] = new TimesheetRowArrayBuilder().plusHoursForDates([7]);
      const timesheet: Timesheet = new Timesheet(rows, startDate, endDate, todayDateThatDoesntMatter);

      expect(timesheet.hoursForDate(7)).toBe(8);
    });
    it("returns hours if non-plus hours exist", () => {
      const rows: TimesheetRow[] = new TimesheetRowArrayBuilder().nonPlusHoursForDates([7]);
      const timesheet: Timesheet = new Timesheet(rows, startDate, endDate, todayDateThatDoesntMatter);

      expect(timesheet.hoursForDate(7)).toBe(8);
    });
    it("returns sum if plus and non-plus exist", () => {
      const rowBuilder: TimesheetRowArrayBuilder = new TimesheetRowArrayBuilder();
      const rows: TimesheetRow[] = rowBuilder.plusHoursForDates([7]).concat(rowBuilder.nonPlusHoursForDates([7]));
      const timesheet: Timesheet = new Timesheet(rows, startDate, endDate, todayDateThatDoesntMatter);

      expect(timesheet.hoursForDate(7)).toBe(16);
    });
    it("only cares about that date", () => {
      const rowBuilder: TimesheetRowArrayBuilder = new TimesheetRowArrayBuilder();
      const rows: TimesheetRow[] = rowBuilder.plusHoursForDates([7]).concat(rowBuilder.nonPlusHoursForDates([10]));
      const timesheet: Timesheet = new Timesheet(rows, startDate, endDate, todayDateThatDoesntMatter);

      expect(timesheet.hoursForDate(7)).toBe(8);
    });
  });
  describe("numberOfRemainingWorkDays", () => {
    const startDate: string = "2019-09-01";
    const endDate: string = "2019-09-15";
    const rowsThatDontMatter: TimesheetRow[] = new TimesheetRowArrayBuilder().plusHoursForDates([6]);
    it("returns zero when today is after the timesheet end", () => {
      const timesheet: Timesheet = new Timesheet(rowsThatDontMatter, startDate, endDate, "2019-09-27");

      expect(timesheet.numberOfRemainingWorkDays()).toBe(0);
    });
    it("returns zero when today is the first of the month after the timesheet end", () => {
      const timesheet: Timesheet = new Timesheet(rowsThatDontMatter, startDate, endDate, "2019-10-01");

      expect(timesheet.numberOfRemainingWorkDays()).toBe(0);
    });
    it("returns zero when today is a month after the timesheet end", () => {
      const timesheet: Timesheet = new Timesheet(rowsThatDontMatter, startDate, endDate, "2019-10-27");

      expect(timesheet.numberOfRemainingWorkDays()).toBe(0);
    });
    it("returns zero when today is in a weekend at the end of the timesheet", () => {
      const timesheet: Timesheet = new Timesheet(rowsThatDontMatter, startDate, endDate, "2019-09-14");

      expect(timesheet.numberOfRemainingWorkDays()).toBe(0);
    });
    it("returns 1 when today is the last workday of the timesheet", () => {
      const timesheet: Timesheet = new Timesheet(rowsThatDontMatter, startDate, endDate, "2019-09-13");

      expect(timesheet.numberOfRemainingWorkDays()).toBe(1);
    });
    it("returns 0 when today is the last workday of the timesheet and has hours", () => {
      const rows: TimesheetRow[] = rowsThatDontMatter.concat(new TimesheetRowArrayBuilder().plusHoursForDates([13]));

      const timesheet: Timesheet = new Timesheet(rows, startDate, endDate, "2019-09-13");

      expect(timesheet.numberOfRemainingWorkDays()).toBe(0);
    });
    it("returns 2 when today is the 2nd to last day in timesheet", () => {
      const timesheet: Timesheet = new Timesheet(rowsThatDontMatter, startDate, endDate, "2019-09-12");

      expect(timesheet.numberOfRemainingWorkDays()).toBe(2);
    });
    it("returns 1 when today is 2nd to last day but has hours", () => {
      const rows: TimesheetRow[] = rowsThatDontMatter.concat(new TimesheetRowArrayBuilder().plusHoursForDates([12]));

      const timesheet: Timesheet = new Timesheet(rows, startDate, endDate, "2019-09-12");

      expect(timesheet.numberOfRemainingWorkDays()).toBe(1);
    });
  });
  describe("weekdaysInTimesheet", () => {
    describe("uses start and end dates to calculate weekdays", () => {
      it("returns 0 workdays when started/ended on a weekend", () => {
        const saturday: string = "2019-09-07";
        const sunday: string = "2019-09-08";

        const rows: TimesheetRow[] = new TimesheetRowArrayBuilder().plusHoursForDates([7]);
        const timesheet: Timesheet = new Timesheet(rows, saturday, sunday, sunday);

        expect(timesheet.weekdaysInTimesheet()).toBe(0);
      });
      it("returns 1 when start/end date are the same weekday", () => {
        const monday: string = "2019-09-10";

        const rows: TimesheetRow[] = new TimesheetRowArrayBuilder().plusHoursForDates([10]);
        const timesheet: Timesheet = new Timesheet(rows, monday, monday, monday);

        expect(timesheet.weekdaysInTimesheet()).toBe(1);
      });
      it("returns the correct number of weekdays in the 9/1/19 - 9/15/19 pay period", () => {
        const rowArrayThatDoesntMatter: TimesheetRow[] = new TimesheetRowArrayBuilder().plusHoursForDates([8]);
        const dayForTodayThatDoesntMatter: string = "2019-09-27";

        const timesheet: Timesheet = new Timesheet(rowArrayThatDoesntMatter, "2019-09-01", "2019-09-15", dayForTodayThatDoesntMatter);

        expect(timesheet.weekdaysInTimesheet()).toBe(10);
      });
    });
  });
  describe("hoursByProjectType", () => {
    const startDate: string = "2019-09-01";
    const endDate: string = "2019-09-15";
    const todayDate: string = "2019-09-13";

    const helper: TimesheetRowArrayBuilder = new TimesheetRowArrayBuilder();

    const rows: TimesheetRow[] = new Array<TimesheetRow>()
      .concat(helper.hoursOfTypeForDates([1, 2], ProjectType.Bill))
      .concat(helper.hoursOfTypeForDates([3, 4, 5], ProjectType.Bench))
      .concat(helper.hoursOfTypeForDates([6, 7, 8, 9], ProjectType.Core))
      .concat(helper.hoursOfTypeForDates([10, 11], ProjectType.Internal))
      .concat(helper.hoursOfTypeForDates([11, 12, 13], ProjectType.NonBillable));

    const timesheet: Timesheet = new Timesheet(rows, startDate, endDate, todayDate);

    const result: Array<{
      projectType: ProjectType;
      total: number;
    }> = timesheet.hoursByProjectType();

    it("breaks down categories correctly", () => {
      expect(result.length).toBe(5);
      expect(result.find(i => i.projectType === ProjectType.Bill).total).toBe(16);
      expect(result.find(i => i.projectType === ProjectType.Bench).total).toBe(24);
      expect(result.find(i => i.projectType === ProjectType.Core).total).toBe(32);
      expect(result.find(i => i.projectType === ProjectType.Internal).total).toBe(16);
      expect(result.find(i => i.projectType === ProjectType.NonBillable).total).toBe(24);
    });
    it("matches the sum of plus rows", () => {
      const bill: number = result.find(i => i.projectType === ProjectType.Bill).total;
      const core: number = result.find(i => i.projectType === ProjectType.Core).total;
      const bench: number = result.find(i => i.projectType === ProjectType.Bench).total;

      expect(timesheet.totalPlusHours()).toBe(bill + core + bench);
    });
    it("matches the sum of non-plus rows", () => {
      const internal: number = result.find(i => i.projectType === ProjectType.Internal).total;
      const nonBillable: number = result.find(i => i.projectType === ProjectType.NonBillable).total;

      expect(timesheet.totalNonPlusHours()).toBe(internal + nonBillable);
    });
  });
  describe("Sean's actual 9/1/2019-9/15/2019 timesheet", () => {
    const rows: TimesheetRow[] = new Array<TimesheetRow>();
    const nrecaRow: TimesheetRow = new TimesheetRowBuilder()
      .withProjectType(ProjectType.Bill)
      .withEntry(new DateEntry("4", "7.75"))
      .withEntry(new DateEntry("5", "10.25"))
      .withEntry(new DateEntry("6", "5.50"))
      .withEntry(new DateEntry("9", "10.25"))
      .withEntry(new DateEntry("10", "9.50"))
      .withEntry(new DateEntry("11", "7.50"))
      .withEntry(new DateEntry("12", "7"))
      .withEntry(new DateEntry("13", ".5"))
      .build();

    const trainingRow: TimesheetRow = new TimesheetRowBuilder()
      .withProjectType(ProjectType.Bill)
      .withEntry(new DateEntry("3", "1.0"))
      .withEntry(new DateEntry("5", "1.25"))
      .withEntry(new DateEntry("11", ".75"))
      .withEntry(new DateEntry("12", "0.0"))
      .withEntry(new DateEntry("15", "3.0"))
      .build();

    const holidayRow: TimesheetRow = new TimesheetRowBuilder()
      .withProjectType(ProjectType.Core)
      .withEntry(new DateEntry("2", "8"))
      .build();

    const sickRow: TimesheetRow = new TimesheetRowBuilder()
      .withProjectType(ProjectType.Core)
      .withEntry(new DateEntry("4", "1"))
      .build();

    const bdRow: TimesheetRow = new TimesheetRowBuilder()
      .withProjectType(ProjectType.Core)
      .withEntry(new DateEntry("1", "3"))
      .withEntry(new DateEntry("2", "3"))
      .withEntry(new DateEntry("3", "10"))
      .withEntry(new DateEntry("4", "1.75"))
      .withEntry(new DateEntry("6", "3.75"))
      .withEntry(new DateEntry("9", "1.50"))
      .withEntry(new DateEntry("10", "0.25"))
      .withEntry(new DateEntry("11", ".50"))
      .withEntry(new DateEntry("13", "5.25"))
      .build();

    const rediRow: TimesheetRow = new TimesheetRowBuilder()
      .withProjectType(ProjectType.Core)
      .withEntry(new DateEntry("10", "2.0"))
      .build();

    const innovationRow: TimesheetRow = new TimesheetRowBuilder()
      .withProjectType(ProjectType.Core)
      .withEntry(new DateEntry("3", "3.25"))
      .withEntry(new DateEntry("6", "1.0"))
      .withEntry(new DateEntry("13", "2.50"))
      .build();

    rows.push(nrecaRow);
    rows.push(trainingRow);
    rows.push(holidayRow);
    rows.push(sickRow);
    rows.push(bdRow);
    rows.push(rediRow);
    rows.push(innovationRow);

    const timesheet: Timesheet = new Timesheet(rows, "2019-09-01", "2019-09-15", "2019-09-27");

    it("totals plus rows correctly", () => {
      expect(timesheet.totalPlusHours()).toBe(111);
    });

    it("totals non-plus rows correctly", () => {
      expect(timesheet.totalNonPlusHours()).toBe(0);
    });

    it("totals tracking correctly", () => {
      expect(timesheet.plusHoursTracking()).toBe(31);
    });

    it("breaks down categories correctly", () => {
      expect(timesheet.hoursByProjectType().find(i => i.projectType === ProjectType.Bill).total).toBe(64.25);
      expect(timesheet.hoursByProjectType().find(i => i.projectType === ProjectType.Core).total).toBe(46.75);
    });
  });

  describe("Alex's timesheet issue", () => {
    let rows: TimesheetRow[] = new Array<TimesheetRow>();

    const nrecaRow: TimesheetRow = new TimesheetRowBuilder()
      .withProjectType(ProjectType.Bill)
      .withEntry(new DateEntry("3", "8.50"))
      .withEntry(new DateEntry("4", "7.50"))
      .build();

    const holidayRow: TimesheetRow = new TimesheetRowBuilder()
      .withProjectType(ProjectType.Core)
      .withEntry(new DateEntry("2", "8"))
      .build();

    const solutionRow: TimesheetRow = new TimesheetRowBuilder()
      .withProjectType(ProjectType.Internal)
      .withEntry(new DateEntry("3", ".75"))
      .build();

    const demoRow: TimesheetRow = new TimesheetRowBuilder()
      .withProjectType(ProjectType.Internal)
      .withEntry(new DateEntry("1", "3"))
      .withEntry(new DateEntry("2", "8"))
      .withEntry(new DateEntry("3", "2"))
      .withEntry(new DateEntry("4", "2"))
      .withEntry(new DateEntry("5", "3"))
      .withEntry(new DateEntry("6", "2"))
      .withEntry(new DateEntry("7", "0"))
      .withEntry(new DateEntry("8", "3"))
      .withEntry(new DateEntry("11", "2"))
      .withEntry(new DateEntry("13", "0"))
      .withEntry(new DateEntry("15", "1"))
      .build();

    const eventsRow: TimesheetRow = new TimesheetRowBuilder()
      .withProjectType(ProjectType.Core)
      .withEntry(new DateEntry("5", "8"))
      .withEntry(new DateEntry("6", "8"))
      .withEntry(new DateEntry("10", "8"))
      .withEntry(new DateEntry("11", "8"))
      .withEntry(new DateEntry("12", "8"))
      .withEntry(new DateEntry("13", "8"))
      .build();

    const eventsRow2: TimesheetRow = new TimesheetRowBuilder()
      .withProjectType(ProjectType.Internal)
      .withEntry(new DateEntry("4", "4"))
      .withEntry(new DateEntry("7", "8"))
      .withEntry(new DateEntry("8", "5"))
      .withEntry(new DateEntry("9", "10"))
      .withEntry(new DateEntry("14", "13"))
      .build();

    const eventsRow3: TimesheetRow = new TimesheetRowBuilder()
      .withProjectType(ProjectType.Core)
      .withEntry(new DateEntry("9", "8"))
      .build();

    rows = rows.concat(nrecaRow, holidayRow, solutionRow, demoRow, eventsRow, eventsRow2, eventsRow3);

    const timesheet = new Timesheet(rows, "2019-09-01", "2019-09-05", "2019-10-01");

    it("tracks billable hours correctly", () => {
      const billable = timesheet.hoursByProjectType().find(x => x.projectType === ProjectType.Bill).total;

      expect(billable).toBe(16);
    });
    it("tracks core hours correctly", () => {
      const coreHours = timesheet.hoursByProjectType().find(x => x.projectType === ProjectType.Core).total;

      expect(coreHours).toBe(64);
    });

    it("tracks int hours correctly", () => {
      const intHours = timesheet.hoursByProjectType().find(x => x.projectType === ProjectType.Internal).total;

      expect(intHours).toBe(66.75);
    });

    it("tracks bench hours correctly", () => {
      const bench = timesheet.hoursByProjectType().find(x => x.projectType === ProjectType.Bench).total;

      expect(bench).toBe(0);
    });

    it("tracks total plus correctly", () => {
      const plusHours = timesheet.totalPlusHours();

      expect(plusHours).toBe(80);
    });
    it("tracks non-plus correctly", () => {
      const nonPlus = timesheet.totalNonPlusHours();

      expect(nonPlus).toBe(66.75);
    });

    it("tracks total correctly", () => {
      const totalHours = timesheet.totalNonPlusHours() + timesheet.totalPlusHours();

      expect(totalHours).toBe(146.75);
    });

    it("has correct tracking amount", () => {
      const tracking = timesheet.plusHoursTracking();

      expect(tracking).toBe(0);
    });
  });
});
