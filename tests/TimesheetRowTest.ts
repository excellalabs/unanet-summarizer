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
    const legitProjectType = Summarizer.ProjectType.Bench;
    const legitDayOfMonth = "11;"

    it('returns zero with an empty list of entries', function(){
      var sut = new Summarizer.TimesheetRow(legitProjectType, new Array<Summarizer.DateEntry>());
      expect(sut.totalHours()).toBe(0);
    });

    it('returns the number when list has one entry', function(){
      var array = new Array<Summarizer.DateEntry>();
      array.push(new Summarizer.DateEntry(legitDayOfMonth, "8"));

      var sut = new Summarizer.TimesheetRow(legitProjectType, array);
      expect(sut.totalHours()).toBe(8);
    });

    it('returns the number when list has a decimal', function(){
      var array = new Array<Summarizer.DateEntry>();
      array.push(new Summarizer.DateEntry(legitDayOfMonth, "8.25"));

      var sut = new Summarizer.TimesheetRow(legitProjectType, array);
      expect(sut.totalHours()).toBe(8.25);
    });

    it('returns the number when list has multiple entries', function(){
      var array = new Array<Summarizer.DateEntry>();
      array.push(new Summarizer.DateEntry("1", "1"));
      array.push(new Summarizer.DateEntry("2", "2"));
      array.push(new Summarizer.DateEntry("3", "3.5"));

      var sut = new Summarizer.TimesheetRow(legitProjectType, array);
      expect(sut.totalHours()).toBe(6.5);
    });
  })
});