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
    it('throws an error if the value parsed is still not a number', function(){
      var functionToBlowUp = function(){
        new Summarizer.DateEntry(validDayOfMonth, "Abc");
      }
      expect(functionToBlowUp).toThrowError("Unable to parse a valid hours amount for dayOfMonth: '8'");
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

    it('parses whole numbers', function(){
      var entry = new Summarizer.DateEntry("11", validWorkHours);
      expect(entry.dayOfMonth).toBe(11);
    });

    it('parses even with whitespace', function(){
      var entry = new Summarizer.DateEntry(" 11 ", validWorkHours);
      expect(entry.dayOfMonth).toBe(11);
    });

    it('ensures whole numbers', function(){
      var entry = new Summarizer.DateEntry("11.2", validWorkHours);
      expect(entry.dayOfMonth).toBe(11);
    });

    it('throws an error when it cannot be parsed', function(){
      var shouldBlowUp = function(){
        new Summarizer.DateEntry("Abc", validWorkHours);
      }
      expect(shouldBlowUp).toThrowError("Unable to parse dayOfMonth: input was 'Abc'")
    });
  })
});