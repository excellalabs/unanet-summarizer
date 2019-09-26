import {Summarizer} from "../src/classes/classes";

describe('timesheet', function(){
  describe('ctor', function(){
    describe('rows', function(){

      it('throws an exception with null rows list', function(){
        var shouldBlowUp = function(){
          new TimesheetBuilder().withRows(null).build();
        }

        expect(shouldBlowUp).toThrowError("Must supply a timesheet rows list.");
      });

      it('throws an exception with undefined rows list', function(){
        var shouldBlowUp = function(){
          new TimesheetBuilder().withRows(undefined).build();
        }

        expect(shouldBlowUp).toThrowError("Must supply a timesheet rows list.");        
      });

      it('throws an exception with empty rows list', function(){
        var shouldBlowUp = function(){
          new TimesheetBuilder().withRows(new Array<Summarizer.TimesheetRow>()).build();
        }

        expect(shouldBlowUp).toThrowError("timesheet rows list is empty.");
      });
    });

    describe('timesheet start date', function(){

      it('throws an error when null', function(){
        var shouldBlowUp = function(){
          new TimesheetBuilder().withStartDate(null).build();
        }

        expect(shouldBlowUp).toThrowError("timesheet start date is invalid.");
      });

      it('throws an error when undefined', function(){
        var shouldBlowUp = function(){
          new TimesheetBuilder().withStartDate(undefined).build();
        }

        expect(shouldBlowUp).toThrowError("timesheet start date is invalid.");
      });

      it('throws an error when empty', function(){
        var shouldBlowUp = function(){
          new TimesheetBuilder().withStartDate("").build();
        }

        expect(shouldBlowUp).toThrowError("timesheet start date is invalid.");
      });

      it('throws an error when whitespace', function(){
        var shouldBlowUp = function(){
          new TimesheetBuilder().withStartDate("    ").build();
        }

        expect(shouldBlowUp).toThrowError("timesheet start date is invalid.");
      });

      it('throws an error when non-formatted date', function(){
        var shouldBlowUp = function(){
          new TimesheetBuilder().withStartDate("abcd").build();
        }

        expect(shouldBlowUp).toThrowError("timesheet start date is invalid.");
      });

      it('throws an error when given a date before 2010', function(){
        // This is just to ensure people are using it for recent timesheets; we introduced this in 2018.
        var shouldBlowUp = function(){
          
          new TimesheetBuilder().withStartDate("2009-12-31").build();
        }

        expect(shouldBlowUp).toThrowError("timesheet start date should be after 2009.");
      });

      it('is fine with a valid date', function(){
        var shouldBeFine = function(){
          new TimesheetBuilder().withStartDate("2010-01-01").build();          
          new TimesheetBuilder().withStartDate("1/1/2010").build();
          new TimesheetBuilder().withStartDate("9/8/2019").build();
        }
        expect(shouldBeFine).not.toThrowError();
      });
    });

    describe('timesheet end date', function(){

      it('throws an error when null', function(){
        var shouldBlowUp = function(){
          new TimesheetBuilder().withEndDate(null).build();
        }

        expect(shouldBlowUp).toThrowError("timesheet end date is invalid.");
      });

      it('throws an error when undefined', function(){
        var shouldBlowUp = function(){
          new TimesheetBuilder().withEndDate(undefined).build();
        }

        expect(shouldBlowUp).toThrowError("timesheet end date is invalid.");
      });

      it('throws an error when empty', function(){
        var shouldBlowUp = function(){
          new TimesheetBuilder().withEndDate("").build();
        }

        expect(shouldBlowUp).toThrowError("timesheet end date is invalid.");
      });

      it('throws an error when whitespace', function(){
        var shouldBlowUp = function(){
          new TimesheetBuilder().withEndDate("    ").build();
        }

        expect(shouldBlowUp).toThrowError("timesheet end date is invalid.");
      });

      it('throws an error when non-formatted date', function(){
        var shouldBlowUp = function(){
          new TimesheetBuilder().withEndDate("abcd").build();
        }

        expect(shouldBlowUp).toThrowError("timesheet end date is invalid.");
      });

      it('throws an error when given a date before 2010', function(){
        // This is just to ensure people are using it for recent timesheets; we introduced this in 2018.
        var shouldBlowUp = function(){
          new TimesheetBuilder().withEndDate("2009-12-31").build();
        }

        expect(shouldBlowUp).toThrowError("timesheet end date should be after 2009.");
      });

      it('is fine with a valid date', function(){
        var shouldBeFine = function(){
          new TimesheetBuilder().withEndDate("01-01-2010").build();          
          new TimesheetBuilder().withEndDate("01/01/2010").build();
          new TimesheetBuilder().withEndDate("9/8/2019").build();
        }
        expect(shouldBeFine).not.toThrowError();
      });
    });

    describe("today's date", function(){

      it('throws an error when null', function(){
        var shouldBlowUp = function(){
          new TimesheetBuilder().withTodayDate(null).build();
        }

        expect(shouldBlowUp).toThrowError("today's date is invalid.");
      });

      it('throws an error when undefined', function(){
        var shouldBlowUp = function(){
          new TimesheetBuilder().withTodayDate(undefined).build();
        }

        expect(shouldBlowUp).toThrowError("today's date is invalid.");
      });

      it('throws an error when empty', function(){
        var shouldBlowUp = function(){
          new TimesheetBuilder().withTodayDate("").build();
        }

        expect(shouldBlowUp).toThrowError("today's date is invalid.");
      });

      it('throws an error when whitespace', function(){
        var shouldBlowUp = function(){
          new TimesheetBuilder().withTodayDate("     ").build();
        }

        expect(shouldBlowUp).toThrowError("today's date is invalid.");
      });

      it('throws an error when non-formatted date', function(){
        var shouldBlowUp = function(){
          new TimesheetBuilder().withTodayDate("abcd").build();
        }

        expect(shouldBlowUp).toThrowError("today's date is invalid.");
      });

      it('throws an error when given a date before 2010', function(){
        // This is just to ensure people are using it for recent timesheets; we introduced this in 2018.
        var shouldBlowUp = function(){
          
          new TimesheetBuilder().withTodayDate("2009-12-31").build();
        }

        expect(shouldBlowUp).toThrowError("today's date should be after 2009.");
      });

      it('is fine with a valid date', function(){
        var shouldBeFine = function(){
          new TimesheetBuilder().withTodayDate("01-01-2010").build();
          new TimesheetBuilder().withTodayDate("01/01/2010").build();
          new TimesheetBuilder().withTodayDate("9/8/2019").build();
        }
        expect(shouldBeFine).not.toThrowError();
      });
    });
  });
});

class TimesheetBuilder
{
  startDate:string = "9/1/2019";
  endDate:string = "9/15/2019";
  todayDate:string = "9/8/2019";
  rows = new Array<Summarizer.TimesheetRow>();

  constructor (){
    this.rows.push(new Summarizer.TimesheetRow(Summarizer.ProjectType.Bench, new Array<Summarizer.DateEntry>()));
  }

  withStartDate=(theDate: string) => {
    this.startDate = theDate;
    return this;
  }

  withEndDate=(theDate: string) => {
    this.endDate = theDate;
    return this;
  }

  withTodayDate=(theDate:string) => {
    this.todayDate = theDate;
    return this;
  }
  
  withRows=(theRows:Array<Summarizer.TimesheetRow>) => {
    this.rows = theRows;
    return this;
  }

  build=() => {
    return new Summarizer.Timesheet(this.rows, this.startDate, this.endDate, this.todayDate);
  }
}
// TODO: Latest timesheet entry date
// TODO: Total + Hours
// TODO: Total Non + Hours
// TODO: Tracking