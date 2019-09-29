import { JSDOM } from "jsdom";
import moment = require("moment");
import { ReviewModeLoader } from "../../src/classes/Loaders/ReviewModeLoader";
import { ProjectType } from "../../src/classes/ProjectType";

describe("timesheet loader", () => {
  describe("review mode", () => {
    let editModeDom: JSDOM;
    let pageTitle: string = "";
    let timesheetTable: Element;
    beforeAll(async () => {
      const editModePromise = JSDOM.fromFile("tests/Fixtures/timesheetInReviewMode.html").then(dom => {
        editModeDom = dom;
        pageTitle = editModeDom.window.document.title;
        timesheetTable = editModeDom.window.document.querySelector("table.timesheet");
      });

      await editModePromise;
    });

    it("(sanity check) finds Sean's name", () => {
      expect(pageTitle).toContain("Sean Killeen");
    });

    it("loads the start date correctly from the title", () => {
      const loader = new ReviewModeLoader(pageTitle, timesheetTable);
      const timesheet = loader.getTimesheet();

      const expectedStartDate = moment("2019-09-01");
      expect(expectedStartDate.isSame(timesheet.timesheetStartDate)).toBe(true);
    });

    it("loads the end date correctly from the title", () => {
      const loader = new ReviewModeLoader(pageTitle, timesheetTable);
      const timesheet = loader.getTimesheet();

      const expectedEndDate = moment("2019-09-15");
      expect(expectedEndDate.isSame(timesheet.timesheetEndDate)).toBe(true);
    });

    it("uses today's date correctly", () => {
      const loader = new ReviewModeLoader(pageTitle, timesheetTable);
      const timesheet = loader.getTimesheet();

      const expectedTodayDate = moment();
      expect(expectedTodayDate.isSame(timesheet.todaysDate, "date")).toBe(true);
    });

    it("captures all the categories correctly", () => {
      const loader = new ReviewModeLoader(pageTitle, timesheetTable);
      const timesheet = loader.getTimesheet();

      const result = timesheet.hoursByProjectType();

      expect(result.find((i: { projectType: ProjectType }) => i.projectType === ProjectType.Bill).total).toBe(64.25);
      expect(result.find((i: { projectType: ProjectType }) => i.projectType === ProjectType.Core).total).toBe(46.75);
    });

    it("totals the time correctly", () => {
      const loader = new ReviewModeLoader(pageTitle, timesheetTable);
      const timesheet = loader.getTimesheet();

      expect(timesheet.totalPlusHours()).toBe(111);
    });
  });
});
