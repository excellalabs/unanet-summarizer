// in its current form, this is meant to be something copied / pasted into a browser console. 

var isReadOnlyTimesheet = function() {
    // if there are no inputs, the timesheet is readonly
    var inputs = document.querySelectorAll('input');
    return inputs.length === 0;
};

var obtainTimeEntryRows = function() { 
    var arrayToReturn = []; 

    var readOnly = isReadOnlyTimesheet();
    console.log('readOnly: ', readOnly);
    var rows;
    if (readOnly){ 
        rows = document.querySelectorAll("table.timesheet > tbody:first-of-type > tr");
    }
    else {
        rows = document.querySelectorAll("#timesheet > tbody:first-of-type > tr");
    }

    rows.forEach(function(timesheetRow){ 
            var projectType;
            var timeValue;
        
            if (readOnly){
                projectType = timesheetRow.querySelector(':nth-child(4)').textContent || "";
                timeValue = parseFloat(timesheetRow.querySelector(':last-child').textContent) || parseFloat(0.0);
                if(!projectType || projectType ===""){return;}
            }
            else {
               projectType = timesheetRow.querySelector("td.project-type > select > option:checked").text;  
               timeValue = parseFloat(timesheetRow.querySelector('td.total > input').getAttribute('value')) || parseFloat(0.0); 
            }
        
           arrayToReturn.push({ projectType: projectType, timeValue: timeValue});
         });
    
    return arrayToReturn;
};

var totalHoursReduceFunction = function(acc, obj) {
    return acc + obj.timeValue;
};


var totalHoursByProjectType = function(acc, obj){ 
    if(!acc.find(function(element){return element.projectType === obj.projectType;})){
        acc.push({projectType: obj.projectType, totalHours: 0.0});
    }
    
    var entry = acc.find(function(element){return element.projectType === obj.projectType;});
    entry.totalHours += obj.timeValue;
    
    return acc;
};

var totalPlusHours = function(acc, obj){
    if (obj.projectType.includes("+")){
        acc = acc + obj.timeValue;
    }
    return acc;
};

var totalNonPlusHours = function(acc, obj){
    if (!obj.projectType.includes("+")){
        acc = acc + obj.timeValue;
    }
    return acc;
};

var docTemplate = '<h2>Unanet Hours Summary</h2><p><strong>By Project Type:</strong> {$PROJECT_TYPES}</p><p><strong>Totals:</strong> Total + Hours: {$TOTAL_PLUS} | Total other hours: {$TOTAL_NON_PLUS} | Total hours: {$TOTAL_HOURS}</p>';
var projectTypeTemplate = '{$PROJECT_TYPE}: {$PROJECT_TYPE_HOURS} | ';

var projectTypeTemplateGeneration = function(projectType, projectTypeHours){
    return projectTypeTemplate.replace("{$PROJECT_TYPE}", projectType).replace("{$PROJECT_TYPE_HOURS}", projectTypeHours);
};

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
    
};

// Execution 
window.summarizeUnanetTime = function() { 
    var resultArray = obtainTimeEntryRows();
    
    var hoursByProjectType = resultArray.reduce(totalHoursByProjectType, []);
    var totalPlusHoursResult = resultArray.reduce(totalPlusHours, 0.0);
    var totalNonPlusHoursResult = resultArray.reduce(totalNonPlusHours, 0.0);
    var totalHoursResult = resultArray.reduce(totalHoursReduceFunction, 0.0);

    var summaryDoc = docTemplateGeneration(hoursByProjectType, totalPlusHoursResult, totalNonPlusHoursResult, totalHoursResult);
    
    var newDiv = document.createElement('div');
    newDiv.id = "unanet-summary";
    newDiv.innerHTML = summaryDoc;

    var unanetSummaryExists = (document.querySelectorAll("#unanet-summary").length > 0);

    if (!unanetSummaryExists){
        document.body.insertBefore(newDiv, document.body.firstChild);
    }
    else {
        document.querySelector("#unanet-summary").innerHTML = summaryDoc;
    }
};