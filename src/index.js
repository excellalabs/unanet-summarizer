const template = require('./summary-template.hbs');
const css = require('./summary-style.css').default;
const summarize = require('./unanet-summarizer');

window.summarizeUnanetTimeForReal = (function() {
  const CONTAINER_ID = 'unanet-summarizer';
  const STYLESHEET_ID = 'unanet-summarizer-style';
  const CSS_CLASS = 'unanet-summary';
  const TIMESHEET_FORM_ID = 'time';

  var createContainer = function() {
      var container = document.createElement('div');
      container.id = CONTAINER_ID;
      container.className = CSS_CLASS;
      return document.body.insertBefore(container, document.body.firstChild);
  };

  var getContainer = function() {
      return document.getElementById(CONTAINER_ID) || createContainer();
  };

  var getTimesheetForm = function() {
      return document.getElementById(TIMESHEET_FORM_ID);
  };

  var createStylesheet = function() {
      var style = document.createElement('style');
      style.id = STYLESHEET_ID;
      style.appendChild(document.createTextNode(css));
      return document.head.appendChild(style);
  };

  var getStylesheet = function() {
      return document.getElementById(STYLESHEET_ID) || createStylesheet();
  };

  var onInputChanged = function(event) {
      if (event.target instanceof HTMLInputElement) {
          getContainer().innerHTML = template(summarize());
      }
  };

  return function() {
      var stylesheet = getStylesheet();
      var timesheetForm = getTimesheetForm();

      if (timesheetForm) {
          timesheetForm.addEventListener('change', onInputChanged);
      }

      getContainer().innerHTML = template(summarize());
  };
})();
