import {Summarizer} from "../src/classes/classes";

describe('timesheet', function(){
  describe('ctor', function(){
    describe('rows', function(){
      it('throws an exception with null rows list', function(){
        var shouldBlowUp = function(){
          new Summarizer.Timesheet(null);
        }

        expect(shouldBlowUp).toThrowError("Must supply a timesheet rows list.");
      });
      it('throws an exception with undefined rows list', function(){
        var shouldBlowUp = function(){
          new Summarizer.Timesheet(undefined);
        }

        expect(shouldBlowUp).toThrowError("Must supply a timesheet rows list.");        
      });
      it('throws an exception with empty rows list', function(){
        var shouldBlowUp = function(){
          new Summarizer.Timesheet(new Array<Summarizer.TimesheetRow>());
        }

        expect(shouldBlowUp).toThrowError("timesheet rows list is empty.");
      });
    })

  })
});
// TODO: Start Date
// TODO: End Date
// TODO: Latest timesheet entry date
// TODO: Total + Hours
// TODO: Total Non + Hours
// TODO: Tracking