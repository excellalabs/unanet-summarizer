import { JSDOM } from "jsdom";
import moment = require("moment");
import { EditModeLoader } from "../src/classes/Loaders/EditModeLoader";

describe("timesheet loader", () => {
  describe("edit mode", () => {
    let editModeDom: JSDOM;
    beforeAll(async () => {
      const editModePromise = JSDOM.fromFile("tests/Fixtures/timesheetInEditMode.html").then(dom => {
        editModeDom = dom;
      });

      await editModePromise;
    });

    it("(sanity check) finds Sean's name", () => {
      expect(editModeDom.window.document.title).toContain("Killeen, Sean");
    });

    it("loads the start date correctly from the title", () => {
      const loader = new EditModeLoader(editModeDom.window.document.title);
      const timesheet = loader.getTimesheet();

      const expectedStartDate = moment("2019-09-16");
      expect(expectedStartDate.isSame(timesheet.timesheetStartDate)).toBe(true);
    });

    it("loads the end date correctly from the title", () => {
      const loader = new EditModeLoader(editModeDom.window.document.title);
      const timesheet = loader.getTimesheet();

      const expectedStartDate = moment("2019-09-30");
      expect(expectedStartDate.isSame(timesheet.timesheetEndDate)).toBe(true);
    });
  });

  describe("review mode", () => {
    let reviewModeDom: JSDOM;

    beforeAll(async () => {
      const reviewModePromise = JSDOM.fromFile("tests/Fixtures/timesheetInReviewMode.html").then(dom => {
        reviewModeDom = dom;
      });

      await reviewModePromise;
    });

    it("(sanity check) finds Sean's name", () => {
      expect(reviewModeDom.window.document.title).toContain("Sean Killeen");
    });
  });
  xdescribe("supervisee mode", () => {
    // TODO: waiting until I actually have a supervisee timesheet html

    let superviseeDom: JSDOM;

    beforeAll(async () => {
      const superviseePromise = JSDOM.fromFile("tests/Fixtures/superviseeTimesheet.html").then(dom => {
        superviseeDom = dom;
      });
      await superviseePromise;
    });
  });
});
