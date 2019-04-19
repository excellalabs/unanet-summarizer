// in its current form, this is meant to be something copied / pasted into a browser console. 

var obtainTimeEntryRows = function() { 
    var arrayToReturn = []; 

    document.querySelectorAll("#timesheet > tbody:first-of-type > tr")
        .forEach(function(timesheetRow){ 
           var projectType = timesheetRow.querySelector("td.project-type > select > option:checked").text; 
           var timeValue = parseFloat(timesheetRow.querySelector('td.total > input').getAttribute('value')) || parseFloat(0.0); 

           arrayToReturn.push({ projectType: projectType, timeValue: timeValue})
         });
    
    return arrayToReturn;
}

var totalHoursReduceFunction = function(acc, obj) {
    return acc + obj.timeValue;
}


var totalHoursByProjectType = function(acc, obj){ 
    if(!acc.find(function(element){return element.projectType === obj.projectType})){
        acc.push({projectType: obj.projectType, totalHours: 0.0});
    }
    
    var entry = acc.find(function(element){return element.projectType === obj.projectType});
    entry.totalHours += obj.timeValue;
    
    return acc;
}

var totalPlusHours = function(acc, obj){
    if (obj.projectType.includes("+")){
        acc = acc + obj.timeValue;
    }
    return acc;
}

var totalNonPlusHours = function(acc, obj){
    if (!obj.projectType.includes("+")){
        acc = acc + obj.timeValue;
    }
    return acc;
}

var docTemplate = '<html><head></head><body><h1>Unanet Hours Summary</h1><h3>By Project Type</h3><ul>{$PROJECT_TYPES}</ul><h3>Totals</h3><ul><li>Total + Hours: {$TOTAL_PLUS}</li><li>Total other hours: {$TOTAL_NON_PLUS}</li><li>Total hours: {$TOTAL_HOURS}</li></ul></body></html>'
var projectTypeTemplate = '<li>{$PROJECT_TYPE}: {$PROJECT_TYPE_HOURS}</li>'

var projectTypeTemplateGeneration = function(projectType, projectTypeHours){
    return projectTypeTemplate.replace("{$PROJECT_TYPE}", projectType).replace("{$PROJECT_TYPE_HOURS}", projectTypeHours);
}

var docTemplateGeneration = function(hoursByProjectTypeArray, totalPlus, totalNonPlus, totalHours){
    var projectsList = '';
    
    hoursByProjectTypeArray.forEach(function (value, i) {
        projectsList = projectsList.concat(projectTypeTemplateGeneration(value.projectType, value.totalHours));
    });
    
    return docTemplate
        .replace("{$PROJECT_TYPES}", projectsList)
        .replace("{$TOTAL_PLUS}", totalPlus)
        .replace("{$TOTAL_NON_PLUS}", totalNonPlus)
        .replace("{$TOTAL_HOURS}", totalHours);
    
}
// Execution 
export function summarizeUnanetTime() { 
    var resultArray = obtainTimeEntryRows();

    var hoursByProjectType = resultArray.reduce(totalHoursByProjectType, []);
    var totalPlusHoursResult = resultArray.reduce(totalPlusHours, 0.0);
    var totalNonPlusHoursResult = resultArray.reduce(totalNonPlusHours, 0.0);
    var totalHoursResult = resultArray.reduce(totalHoursReduceFunction, 0.0);

    var bmWindow = window.open('');
    bmWindow.document.open();
    bmWindow.document.write(docTemplateGeneration(hoursByProjectType, totalPlusHoursResult, totalNonPlusHoursResult, totalHoursResult));
    bmWindow.document.close();
}
