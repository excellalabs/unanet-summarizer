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
    const grandTotal = summarizer.timesheet.totalPlusHours() + summarizer.timesheet.totalNonPlusHours();
    const daysWorked = summarizer.timesheet.weekdaysInTimesheet() - summarizer.timesheet.numberOfRemainingWorkDays();
    const theSummary = {
      grandTotalHours: grandTotal,
      hoursByProjectType: summarizer.timesheet.hoursByProjectType(),
      hoursPerWorkday: (grandTotal / daysWorked).toFixed(2),
      negativeTracking: summarizer.timesheet.plusHoursTracking() < 0,
      overUnder: (grandTotal - daysWorked * 8).toFixed(2),
      plusHoursInPayPeriod: summarizer.timesheet.expectedPlusHours(),
      plusHoursTracking: summarizer.timesheet.plusHoursTracking(),
      priorOverUnderAmount: summarizer.priorPeriodAmount,
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

  const updateContainerWithTemplate = () => {
    getContainer().innerHTML = generateSummaryTemplate();
    document.getElementById("priorPeriodOverUnder").addEventListener("blur", onPriorPeriodAmountChanged);
  };

  const onInputChanged = (event: { target: any }) => {
    if (event.target instanceof HTMLInputElement) {
      summarize();
    }
  };

  const summarize = () => {
    summarizer = new Summarizer(window.document.location.href, window.document.title, document.querySelector("table.timesheet"));
    updateContainerWithTemplate();
  };

  const onPriorPeriodAmountChanged = () => {
    console.log("onPriorPeriodAmountChanged()");
    summarizer.savePriorPeriodOverUnder();
    summarize();
  };

  return () => {
    getStylesheet();
    const timesheetForm = getTimesheetForm();

    if (timesheetForm) {
      timesheetForm.addEventListener("change", onInputChanged);
    }

    updateContainerWithTemplate();
  };
})();
