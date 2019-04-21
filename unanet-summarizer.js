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

var docTemplateGeneration = function(hoursByProjectTypeArray, totalPlus, totalNonPlus, totalHours){

    var resultTable = document.createElement('table');

    var tableHeader = document.createElement('thead');

    var topHeaderRow = document.createElement('tr');
    topHeaderRow.innerHTML = "<th colspan='" + hoursByProjectTypeArray.length + "'>Project Types</th><th colspan ='3'>Totals</th>";

    var bottomHeaderRow = document.createElement('tr');

    var hoursHeading = '';
    hoursByProjectTypeArray.forEach(function(timeItem){
        hoursHeading = hoursHeading + '<th>' + timeItem.projectType + '</th>';
    });

    bottomHeaderRow.innerHTML = bottomHeaderRow.innerHTML + hoursHeading;
    bottomHeaderRow.innerHTML = bottomHeaderRow.innerHTML + '<th>+ Hours</th><th>Non + Hours</th><th>Grand Total</th>';

    var tableBody = document.createElement('tbody');
    var dataRow = document.createElement('tr');

    hoursByProjectTypeArray.forEach(function(timeItem){
        var newCell = dataRow.insertCell(-1);
        newCell.textContent = timeItem.totalHours;
    });

    var totalPlusCell = dataRow.insertCell(-1);
    var totalNonPlusCell = dataRow.insertCell(-1);
    var totalHoursCell = dataRow.insertCell(-1);

    totalPlusCell.textContent = totalPlus;
    totalNonPlusCell.textContent = totalNonPlus;
    totalHoursCell.textContent = totalHours;

    tableBody.appendChild(dataRow);

    tableHeader.appendChild(topHeaderRow);
    tableHeader.appendChild(bottomHeaderRow);

    resultTable.appendChild(tableHeader);
    resultTable.appendChild(tableBody);

    return resultTable;
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
    newDiv.appendChild(summaryDoc);

    var unanetSummaryExists = (document.querySelectorAll("#unanet-summary").length > 0);

    if (!unanetSummaryExists){
        document.body.insertBefore(newDiv, document.body.firstChild);
    }
    else {
        document.querySelector("#unanet-summary").replaceWith(newDiv);
    }
};