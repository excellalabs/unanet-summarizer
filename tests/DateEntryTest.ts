import {Summarizer} from "../src/classes/classes";

describe('constructor', function(){
  describe('hoursAmount', function(){

    const validDayOfMonth = "8";

    it('treats null hours as zero hours', function(){
      var entry = new Summarizer.DateEntry(validDayOfMonth, null);
      expect(entry.hoursAmount).toBe(0);
    });

    it('treats empty hours as zero hours', function(){
      var entry = new Summarizer.DateEntry(validDayOfMonth, "");
      expect(entry.hoursAmount).toBe(0);
    });

    it('treats whitespace hours as zero hours', function(){
      var entry = new Summarizer.DateEntry(validDayOfMonth, "  ");
      expect(entry.hoursAmount).toBe(0);
    });

    it('parses a round number correctly', function(){
      var entry = new Summarizer.DateEntry(validDayOfMonth, "8");
      expect(entry.hoursAmount).toBe(8);
    })

    it('parses a decimal number correctly', function(){
      var entry = new Summarizer.DateEntry(validDayOfMonth, "8.25");
      expect(entry.hoursAmount).toBe(8.25);
    })

    it('parses a decimal number correctly with whitespace', function(){
      var entry = new Summarizer.DateEntry(validDayOfMonth, " 8.25 ");
      expect(entry.hoursAmount).toBe(8.25);
    })

  });
  describe('dayOfMonth', function(){
    const validWorkHours = "8.25"

    it('throws exception on null string', function(){
      var functionThatShouldBlowUp = function(){
        new Summarizer.DateEntry(null, validWorkHours);
      }
      expect(functionThatShouldBlowUp).toThrowError("Day of month is null or empty. Valid day of the month must be provided.")
    });

    it('throws exception on undefined string', function(){
      var functionThatShouldBlowUp = function(){
        new Summarizer.DateEntry(undefined, validWorkHours);
      }
      expect(functionThatShouldBlowUp).toThrowError("Day of month is null or empty. Valid day of the month must be provided.")
    });

    it('throws exception on empty string', function(){
      var functionThatShouldBlowUp = function(){
        new Summarizer.DateEntry("", validWorkHours);
      }
      expect(functionThatShouldBlowUp).toThrowError("Day of month is null or empty. Valid day of the month must be provided.")
    });
    it('throws exception on whitespace string', function(){
      var functionThatShouldBlowUp = function(){
        new Summarizer.DateEntry("   ", validWorkHours);
      }
      expect(functionThatShouldBlowUp).toThrowError("Day of month is null or empty. Valid day of the month must be provided.")
    });
  })
});