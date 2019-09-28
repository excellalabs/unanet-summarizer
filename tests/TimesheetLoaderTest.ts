import { JSDOM } from "jsdom";

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
  });

  describe("review mode", () => {
    let reviewModeDom: JSDOM;

    beforeAll(async () => {
      const reviewModePromise = JSDOM.fromFile("tests/Fixtures/timesheetInReviewMode.html").then(dom => {
        reviewModeDom = dom;
      });

      await reviewModePromise;
    });
  });
  describe("supervisee mode", () => {
    let superviseeDom: JSDOM;

    beforeAll(async () => {
      const superviseePromise = JSDOM.fromFile("tests/Fixtures/superviseeTimesheet.html").then(dom => {
        superviseeDom = dom;
      });
      await superviseePromise;
    });
  });
});
