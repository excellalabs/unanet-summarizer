import { JSDOM } from "jsdom";
import { Summarizer } from "../src/classes/Summarizer";
import { TimesheetMode } from "../src/classes/TimesheetMode";

describe("summarizer", () => {
  describe("ctor", () => {
    let editModeDom: JSDOM;
    let reviewModeDom: JSDOM;
    let editTimesheetTable: Element;
    let reviewTimesheetTable: Element;
    beforeAll(async () => {
      const editModePromise = JSDOM.fromFile("tests/Fixtures/timesheetInEditMode.html", {
        url: "https://excella.unanet.biz/excella/action/time/edit?timesheetkey=44228"
      }).then(dom => {
        editModeDom = dom;
        editTimesheetTable = editModeDom.window.document.querySelector("table.timesheet");
      });

      const reviewModePromise = JSDOM.fromFile("tests/Fixtures/timesheetInReviewMode.html", {
        url: "https://excella.unanet.biz/excella/action/time/view?timesheetkey=44228"
      }).then(dom => {
        reviewModeDom = dom;
        reviewTimesheetTable = reviewModeDom.window.document.querySelector("table.timesheet");
      });

      await Promise.all([editModePromise, reviewModePromise]);
    });
    it("sets edit mode when URL is edit", async () => {
      const url = editModeDom.window.location.href;
      const sut = new Summarizer(url, editModeDom.window.document.title, editTimesheetTable);

      expect(sut.timesheetMode).toBe(TimesheetMode.Edit);
    });
    it("sets review mode when url is view URL", () => {
      const url = reviewModeDom.window.location.href;
      const sut = new Summarizer(url, reviewModeDom.window.document.title, reviewTimesheetTable);

      expect(sut.timesheetMode).toBe(TimesheetMode.View);
    });
  });
});
