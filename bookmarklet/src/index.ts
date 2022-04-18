import axios from "axios";
import { StorageManager } from "./classes/Storage/StorageManager";
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
  console.log("summarizeUnanetTimeForReal() called");
  const theStorageManager = new StorageManager();
  const timesheetTable = document.querySelector("table.timesheet");
  console.log("creating summarizer")
  let summarizer = new Summarizer(window.document.location.href, window.document.title, timesheetTable, theStorageManager);

  const CONTAINER_ID = "unanet-summarizer";
  const STYLESHEET_ID = "unanet-summarizer-style";
  const CSS_CLASS = "unanet-summary";
  const TIMESHEET_FORM_ID = "time";

  const generateSummaryTemplate = () => {
    console.log("generateSummaryTemplate() called");
    const grandTotal = summarizer.timesheet.totalPlusHours() + summarizer.timesheet.totalNonPlusHours();
    const daysWorked = summarizer.timesheet.weekdaysInTimesheet() - summarizer.timesheet.numberOfRemainingWorkDays();
    const trackingPlusPriorPeriod = summarizer.timesheet.plusHoursTracking() + summarizer.priorPeriodAmount;
    const firstPayPeriod = summarizer.timesheet.timesheetStartDate.date() === 1;
    console.log("creating theSummary");
    const theSummary = {
      grandTotalHours: grandTotal,
      hoursByProjectType: summarizer.timesheet.hoursByProjectType(),
      hoursPerWorkday: (grandTotal / daysWorked).toFixed(2),
      isFirstPayPeriod: firstPayPeriod,
      negativeTracking: trackingPlusPriorPeriod < 0,
      overUnder: (grandTotal - daysWorked * 8).toFixed(2),
      plusHoursInPayPeriod: summarizer.timesheet.expectedPlusHours(),
      plusHoursTracking: trackingPlusPriorPeriod,
      priorOverUnderAmount: summarizer.priorPeriodAmount,
      totalNonPlusHours: summarizer.timesheet.totalNonPlusHours(),
      totalPlusHours: summarizer.timesheet.totalPlusHours()
    };

    return template(theSummary);
  };

  const createContainer = () => {
    console.log("createContainer() called");
    const container = document.createElement("div");
    container.id = CONTAINER_ID;
    container.className = CSS_CLASS;
    return document.body.insertBefore(container, document.body.firstChild);
  };

  const getContainer = () => {
    console.log("getContainer() called");
    return document.getElementById(CONTAINER_ID) || createContainer();
  };

  const getTimesheetForm = () => {
    console.log("getTimesheetForm() called");
    return document.getElementById(TIMESHEET_FORM_ID);
  };

  const createStylesheet = () => {
    console.log("createStylesheet() called");
    const style = document.createElement("style");
    style.id = STYLESHEET_ID;
    style.appendChild(document.createTextNode(css));
    return document.head.appendChild(style);
  };

  const getStylesheet = () => {
    console.log("getStylesheet() called");
    return document.getElementById(STYLESHEET_ID) || createStylesheet();
  };

  const updateContainerWithTemplate = () => {
    console.log("updateContainerWithTemplate() called");
    getContainer().innerHTML = generateSummaryTemplate();
    document.getElementById("priorPeriodOverUnder").addEventListener("blur", onPriorPeriodAmountChanged);
  };

  const onInputChanged = (event: { target: any }) => {
    if (event.target instanceof HTMLInputElement) {
      console.log("calling the summarize() function");
      summarize();
    }
  };

  const logAnalytics = () => {
    console.log("logAnalytics() called");
    const theUsername = getLoginName();
    const theTimesheetUser = getTimesheetName();

    axios.post("https://unanetsummarizeranalytics.azurewebsites.net/api/AnalyticsHttpTrigger", {
      timesheetuser: theTimesheetUser,
      timestamp: new Date().toJSON(),
      username: theUsername
    });
  };

  const summarize = () => {
    console.log("summarize() called");
    summarizer = new Summarizer(window.document.location.href, window.document.title, document.querySelector("table.timesheet"), theStorageManager);
    updateContainerWithTemplate();
  };

  const onPriorPeriodAmountChanged = () => {
    console.log("onPriorPeriodAmountChanged() called");
    summarizer.savePriorPeriodOverUnder();
    summarize();
  };

  const getLoginName = (): string => {
    console.log("getLoginName() called");
    const fullText = document
      .getElementById("page-footer")
      .getElementsByClassName("about")[0]
      .getElementsByTagName("a")[0].text;

    return fullText
      .substring(fullText.lastIndexOf("("))
      .replace("(", "")
      .replace(")", "");
  };

  const getTimesheetName = (): string => {
    console.log("getTimesheetName() called");
    const fullText = document.getElementById("title-subsection").innerHTML;

    const replaced = fullText.replace(" – Timesheet for ", "");

    return replaced.substring(0, replaced.indexOf(" ("));
  };

  return () => {
    getStylesheet();
    const timesheetForm = getTimesheetForm();

    if (timesheetForm) {
      console.log("Adding timesheet change listener");
      timesheetForm.addEventListener("change", onInputChanged);
    } else {
      console.log("FYI, no timesheetForm. Might not be on an editable page.");
    }

    summarize();
    logAnalytics();
  };
})();
