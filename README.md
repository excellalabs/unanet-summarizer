# unanet-summarizer
A JavaScript module that powers a bookmarklet to summarize some time-keeping helpers.

## How the tool works

* This script scrapes the DOM for the time entries and places them into an array
* It then uses several reducers to summarize the time in various ways
* It uses some rudimentary string templates to put together some contents
* It then puts those contents into a new document which it opens in a new tab.

## How We're Deploying This 

* We first developed a JavaScript that could be executed in the browser's console
* We then turned that into a JavaScript module (`.mjs`) 
* We then served that from GitHub pages

Next up: we'd like to figure out how to consume this Javascript module from the browser console. If we do that, we can figure out how to turn it into a bookmarklet that serves this up from the `master` branch, so that users can copy it once and always be up to date.
