import {Summarizer} from "../src/classes/classes";

describe('ctor', function(){
  describe('entries', function(){

    it('throws an error if the array is null', function(){
      var shouldBlowUp = function(){
        new Summarizer.TimesheetRow(Summarizer.ProjectType.Core, null);
      };

      expect(shouldBlowUp).toThrowError("Entries array must not be null or undefined.")
    });

    it('throws an error if the array is undefined', function(){
      var shouldBlowUp = function(){
        new Summarizer.TimesheetRow(Summarizer.ProjectType.Core, undefined);
      };

      expect(shouldBlowUp).toThrowError("Entries array must not be null or undefined.")
    });
  });
});

describe('TimesheetRow', function() {
  describe('Determining + Hours', function() {
    it('Treats BILL+ as Plus', function(){
      var row = new Summarizer.TimesheetRow(Summarizer.ProjectType.Bill, new Array<Summarizer.DateEntry>());
      expect(row.isPlusProjectType()).toBe(true);
    });
    it('Treats CORE+ as Plus', function(){
      var row = new Summarizer.TimesheetRow(Summarizer.ProjectType.Core, new Array<Summarizer.DateEntry>());
      expect(row.isPlusProjectType()).toBe(true);
    });
    it('Treats BENCH+ as Plus', function(){
      var row = new Summarizer.TimesheetRow(Summarizer.ProjectType.Bench, new Array<Summarizer.DateEntry>());
      expect(row.isPlusProjectType()).toBe(true);
    });
    it('Treats CLI-NB as Non-Plus', function(){
      var row = new Summarizer.TimesheetRow(Summarizer.ProjectType.NonBillable, new Array<Summarizer.DateEntry>());
      expect(row.isPlusProjectType()).toBe(false);
    });
    it('Treats INT as Non-Plus', function(){
      var row = new Summarizer.TimesheetRow(Summarizer.ProjectType.Internal, new Array<Summarizer.DateEntry>());
      expect(row.isPlusProjectType()).toBe(false);
    });
  });
  describe('totaling hours', function(){
  })
});