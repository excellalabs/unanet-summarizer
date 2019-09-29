import { JSDOM } from "jsdom";
import moment = require("moment");
import { EditModeLoader } from "../../src/classes/Loaders/EditModeLoader";
import { ProjectType } from "../../src/classes/ProjectType";

describe("timesheet loader", () => {
  describe("edit mode", () => {
    let editModeDom: JSDOM;
    let pageTitle: string = "";
    let timesheetTable: Element;
    beforeAll(async () => {
      const editModePromise = JSDOM.fromFile("tests/Fixtures/timesheetInEditMode.html").then(dom => {
        editModeDom = dom;
        pageTitle = editModeDom.window.document.title;
        timesheetTable = editModeDom.window.document.querySelector("table.timesheet");
      });

      await editModePromise;
    });

    it("(sanity check) finds Sean's name", () => {
      expect(pageTitle).toContain("Killeen, Sean");
    });

    it("loads the start date correctly from the title", () => {
      const loader = new EditModeLoader(pageTitle, timesheetTable);
      const timesheet = loader.getTimesheet();

      const expectedStartDate = moment("2019-09-16");
      expect(expectedStartDate.isSame(timesheet.timesheetStartDate)).toBe(true);
    });

    it("loads the end date correctly from the title", () => {
      const loader = new EditModeLoader(pageTitle, timesheetTable);
      const timesheet = loader.getTimesheet();

      const expectedEndDate = moment("2019-09-30");
      expect(expectedEndDate.isSame(timesheet.timesheetEndDate)).toBe(true);
    });

    it("uses today's date correctly", () => {
      const loader = new EditModeLoader(pageTitle, timesheetTable);
      const timesheet = loader.getTimesheet();

      const expectedTodayDate = moment();
      expect(expectedTodayDate.isSame(timesheet.todaysDate, "date")).toBe(true);
    });

    it("captures all the categories correctly", () => {
      const loader = new EditModeLoader(pageTitle, timesheetTable);
      const timesheet = loader.getTimesheet();

      const result = timesheet.hoursByProjectType();

      expect(result.find((i: { projectType: ProjectType }) => i.projectType === ProjectType.Bill).total).toBe(44.25);
      expect(result.find((i: { projectType: ProjectType }) => i.projectType === ProjectType.Core).total).toBe(39);
    });

    it("totals the time correctly", () => {
      const loader = new EditModeLoader(pageTitle, timesheetTable);
      const timesheet = loader.getTimesheet();

      expect(timesheet.totalPlusHours()).toBe(83.25);
    });
  });
});
