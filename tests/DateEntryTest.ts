import {Summarizer} from "../src/classes/classes";

describe('constructor', function(){
  describe('hoursAmount', function(){
    it('treats null hours as zero hours', function(){
      var entry = new Summarizer.DateEntry("1/1/2019", null);
      expect(entry.hoursAmount).toBe(0);
    });
    it('treats empty hours as zero hours', function(){
      var entry = new Summarizer.DateEntry("1/1/2019", "");
      expect(entry.hoursAmount).toBe(0);
    });
    it('treats whitespace hours as zero hours', function(){
      var entry = new Summarizer.DateEntry("1/1/2019", "  ");
      expect(entry.hoursAmount).toBe(0);
    });
    it('parses a round number correctly', function(){
      var entry = new Summarizer.DateEntry("1/1/2019", "8");
      expect(entry.hoursAmount).toBe(8);
    })
    it('parses a decimal number correctly', function(){
      var entry = new Summarizer.DateEntry("1/1/2019", "8.25");
      expect(entry.hoursAmount).toBe(8.25);
    })
    it('parses a decimal number correctly with whitespace', function(){
      var entry = new Summarizer.DateEntry("1/1/2019", " 8.25 ");
      expect(entry.hoursAmount).toBe(8.25);
    })
  });
});