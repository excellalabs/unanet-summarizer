# unanet-summarizer

| Latest Build                                                                                                                                                                                                                              | Deployment                                                                                                                                                                                                  |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [![Build Status](https://dev.azure.com/excellaco/unanet-summarizer/_apis/build/status/excellalabs.unanet-summarizer?branchName=master)](https://dev.azure.com/excellaco/unanet-summarizer/_build/latest?definitionId=5&branchName=master) | [![Deployment Status](https://vsrm.dev.azure.com/excellaco/_apis/public/Release/badge/ab42bd87-c4a4-44b8-9bcc-02ab7408d6c0/1/1)](https://dev.azure.com/excellaco/unanet-summarizer/_release?definitionId=1) |

A JavaScript file that powers a bookmarklet to summarize some time-keeping helpers.

![screenshot of the tool in action](bookmarklet/summarizer-screenshot.png)

## Get the Bookmarklet

Drag this link to your browser's bookmarks or bookmark toolbar (you can then rename the title to what you want)

<a href="javascript:(function(){ var onload=function(){ window.summarizeUnanetTime(); }; if(!window.summarizeUnanetTime){var s=document.createElement('script');s.src='https://excellalabs.github.io/unanet-summarizer/unanet-summarizer.js';s.onload=onload;document.body.appendChild(s)} else { onload(); } })();">Summarize Unanet</a>

## How the tool works

- This script scrapes the DOM for the time entries and places them into an array
- It then uses several reducers to summarize the time in various ways
- It uses some rudimentary string templates to put together some contents
- It then puts those contents into a new document which it opens in a new tab.

Once you add the bookmarklet, you can click it while you're editing a Unanet timesheet and see the summary.

## How We're Deploying This

- We first developed a JavaScript that could be executed in the browser's console
- We then served that from GitHub pages (thanks, GitHub!)
- We then created a bookmarklet that can load the script and execute it

## Explaining the Bookmarklet

The contents of the link are:

```
javascript:(function(){ var onload=function(){ window.summarizeUnanetTime(); }; if(!window.summarizeUnanetTime){var s=document.createElement('script');s.src='https://excellalabs.github.io/unanet-summarizer/unanet-summarizer.js';s.onload=onload;document.body.appendChild(s)} else { onload(); } })();
```

This bookmarklet adds injects the JavaScript file if it doesn't exist, and then calls the `summarizeUnanetTime()` function that it contains.

## For Developers

### How to build locally

- Pull this repository
- `cd bookmarklet`
- `npm install` gets the dependencies
- `npm run build` builds & outputs to `dist` folder

### How to test locally

- `npm start` allows you to view a bookmarklet for debug that you drag to your bookmarks bar
- open unanet
- edit a timesheet
- click the debug bookmarklet

### To Run the PowerBI analytics

- Download the PowerBI file (Azure --> `unanet-summarizer` RG --> `unanetsummarizer` storage account --> `analytics-powerbi` container --> `UnanetSummarizer.pbix`
- Open the powerbi file
- If prompted for the storage URL, use `https://summarizeranalytics.table.core.windows.net/analyticsentries` (the table storage within the `summarizeranalytics` storage group)

### A note on our build & release process

- The build and deployment steps run within Azure DevOps (status linked from this README file)
- A release is created upon a successful build
- The release is automatically pushed to production. By this, we mean the built JS output is pushed into the blob that we're using to serve the content.
