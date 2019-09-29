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
  const summarizer = new Summarizer(window.document.location.href, window.document.title, timesheetTable);

  const CONTAINER_ID = "unanet-summarizer";
  const STYLESHEET_ID = "unanet-summarizer-style";
  const CSS_CLASS = "unanet-summary";
  const TIMESHEET_FORM_ID = "time";

  var createContainer = () => {
    var container = document.createElement("div");
    container.id = CONTAINER_ID;
    container.className = CSS_CLASS;
    return document.body.insertBefore(container, document.body.firstChild);
  };

  var getContainer = () => {
    return document.getElementById(CONTAINER_ID) || createContainer();
  };

  var getTimesheetForm = () => {
    return document.getElementById(TIMESHEET_FORM_ID);
  };

  var createStylesheet = () => {
    var style = document.createElement("style");
    style.id = STYLESHEET_ID;
    style.appendChild(document.createTextNode(css));
    return document.head.appendChild(style);
  };

  var getStylesheet = () => {
    return document.getElementById(STYLESHEET_ID) || createStylesheet();
  };

  var onInputChanged = function(event: { target: any }) {
    if (event.target instanceof HTMLInputElement) {
      getContainer().innerHTML = template(summarizer.timesheet);
    }
  };

  return function() {
    var stylesheet = getStylesheet();
    var timesheetForm = getTimesheetForm();

    if (timesheetForm) {
      timesheetForm.addEventListener("change", onInputChanged);
    }

    getContainer().innerHTML = template(summarizer.timesheet);
  };
})();
