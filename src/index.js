const Template = require('./template');
const html = require('./summary-template.tpl').default;
const css = require('./summary-style.css').default;
const summarize = require('./unanet-summarizer');

// namespace
window.unanetSummarizer = window.unanetSummarizer || {};

window.unanetSummarizer.generateSummary = (function() {
  const CONTAINER_ID = 'unanet-summarizer';
  const STYLESHEET_ID = 'unanet-summarizer-style';
  const CSS_CLASS = 'unanet-summary';
  const CONTAINER_TEMPLATE = Template(html);

  function createContainer() {
      var container = document.createElement('div');
      container.id = CONTAINER_ID;
      container.className = CSS_CLASS;
      return document.body.insertBefore(container, document.body.firstChild);
  }

  function createStylesheet() {
      var style = document.createElement('style');
      style.id = STYLESHEET_ID;
      style.appendChild(document.createTextNode(css));
      return document.head.appendChild(style);
  }

  return function() {
      if (!document.getElementById(STYLESHEET_ID)) {
          createStylesheet();
      }

      var container = document.getElementById(CONTAINER_ID) || createContainer();

      container.innerHTML = CONTAINER_TEMPLATE.apply(summarize());    
  };
})();

// maintain backward compatibility
window.summarizeUnanetTime = window.unanetSummarizer.generateSummary;