import { Summarizer } from "./classes/Summarizer";

declare global {
  // tslint:disable-next-line:interface-name
  interface Window {
    summarizeUnanetTimeForReal: any;
  }
}

const template = require("./summary-template.hbs");
const css = require("./summarizer-style.css").default;

window.summarizeUnanetTimeForReal = (() => {
  const timesheetTable = document.querySelector("table.timesheet");
  let summarizer = new Summarizer(window.document.location.href, window.document.title, timesheetTable);

  const CONTAINER_ID = "unanet-summarizer";
  const STYLESHEET_ID = "unanet-summarizer-style";
  const CSS_CLASS = "unanet-summary";
  const TIMESHEET_FORM_ID = "time";

  const generateSummaryTemplate = () => {
    const theSummary = {
      grandTotalHours: summarizer.timesheet.totalPlusHours() + summarizer.timesheet.totalNonPlusHours(),
      hoursByProjectType: summarizer.timesheet.hoursByProjectType(),
      negativeTracking: summarizer.timesheet.plusHoursTracking() < 0,
      plusHoursInPayPeriod: summarizer.timesheet.expectedPlusHours(),
      plusHoursTracking: summarizer.timesheet.plusHoursTracking(),
      totalNonPlusHours: summarizer.timesheet.totalNonPlusHours(),
      totalPlusHours: summarizer.timesheet.totalPlusHours()
    };

    return template(theSummary);
  };

  const createContainer = () => {
    const container = document.createElement("div");
    container.id = CONTAINER_ID;
    container.className = CSS_CLASS;
    return document.body.insertBefore(container, document.body.firstChild);
  };

  const getContainer = () => {
    return document.getElementById(CONTAINER_ID) || createContainer();
  };

  const getTimesheetForm = () => {
    return document.getElementById(TIMESHEET_FORM_ID);
  };

  const createStylesheet = () => {
    const style = document.createElement("style");
    style.id = STYLESHEET_ID;
    style.appendChild(document.createTextNode(css));
    return document.head.appendChild(style);
  };

  const getStylesheet = () => {
    return document.getElementById(STYLESHEET_ID) || createStylesheet();
  };

  const onInputChanged = (event: { target: any }) => {
    if (event.target instanceof HTMLInputElement) {
      summarizer = new Summarizer(window.document.location.href, window.document.title, document.querySelector("table.timesheet"));

      getContainer().innerHTML = generateSummaryTemplate();
    }
  };

  return () => {
    const stylesheet = getStylesheet();
    const timesheetForm = getTimesheetForm();

    if (timesheetForm) {
      timesheetForm.addEventListener("change", onInputChanged);
    }

    getContainer().innerHTML = generateSummaryTemplate();
  };
})();
