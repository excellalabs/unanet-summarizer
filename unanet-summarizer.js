window.summarizeUnanetTime = (function() {
    const CONTAINER_ID = 'unanet-summary';

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
        } else {
            rows = document.querySelectorAll("#timesheet > tbody:first-of-type > tr");
        }

        rows.forEach(function(timesheetRow){ 
            var projectType;
            var timeValue;
        
            if (readOnly) {
                projectType = timesheetRow.querySelector(':nth-child(4)').textContent || "";
                timeValue = parseFloat(timesheetRow.querySelector(':last-child').textContent) || parseFloat(0.0);
                if (!projectType || projectType === "") {
                    return;
                }
            } else {
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

    var docTemplateGeneration = function(props) {

        var resultTable = document.createElement('table');
        resultTable.setAttribute('style', 'border: 2px solid;');

        var tableHeader = document.createElement('thead');

        var topHeaderRow = document.createElement('tr');
        topHeaderRow.innerHTML = "<th colspan='" + props.hoursByProjectType.length + "'>Project Types</th><th colspan ='3'>Totals</th>";

        var bottomHeaderRow = document.createElement('tr');

        var hoursHeading = '';
        props.hoursByProjectType.forEach(function(timeItem){
            hoursHeading = hoursHeading + '<th>' + timeItem.projectType + '</th>';
        });

        bottomHeaderRow.innerHTML += hoursHeading;
        bottomHeaderRow.innerHTML += '<th>+ Hours</th><th>Non + Hours</th><th>Grand Total</th>';

        var tableBody = document.createElement('tbody');
        var dataRow = document.createElement('tr');

        props.hoursByProjectType.forEach(function(timeItem){
            var newCell = dataRow.insertCell(-1);
            newCell.textContent = timeItem.totalHours;
        });

        var totalPlusCell = dataRow.insertCell(-1);
        var totalNonPlusCell = dataRow.insertCell(-1);
        var totalHoursCell = dataRow.insertCell(-1);

        totalPlusCell.textContent = props.totalPlusHoursResult;
        totalNonPlusCell.textContent = props.totalNonPlusHoursResult;
        totalHoursCell.textContent = props.totalHoursResult;

        tableBody.appendChild(dataRow);

        tableHeader.appendChild(topHeaderRow);
        tableHeader.appendChild(bottomHeaderRow);

        resultTable.appendChild(tableHeader);
        resultTable.appendChild(tableBody);

        return resultTable;
    };

    var createContainer = function() {
        var container = document.createElement('div');
        container.id = CONTAINER_ID;
        container.style = 'margin-bottom: 20px;';
        return document.body.insertBefore(container, document.body.firstChild);
    };

    var getContainer = function() {
        return document.getElementById(CONTAINER_ID) || createContainer();
    };

    // This function returns an object with a reducer function (a way of reducing an array of hours which we'll pass later)
    // and the starting state of the accumulators that those reducers will use. 
    var getReducers = function() {
        return {
            hoursByProjectType: [ totalHoursByProjectType, [] ],
            totalPlusHoursResult: [ totalPlusHours, 0.0 ],
            totalNonPlusHoursResult: [ totalNonPlusHours, 0.0 ],
            totalHoursResult: [ totalHoursReduceFunction, 0.0 ]
        };
    };
    
    return function() { 
        var timeEntries = obtainTimeEntryRows();        
        var reducers = getReducers();

        // Takes each reducer function name and function, calls reduce using that function,
        // and sets the result on an object that we reference in our document generation.
        var properties = Object.keys(reducers).reduce(function(acc, property) {
            acc[property] = [].reduce.apply(timeEntries, reducers[property]);
            return acc;
        }, {});

        var summaryDoc = docTemplateGeneration(properties);
        
        var container = getContainer();
        container.innerHTML = '<h2>Unanet Time Summary</h2>';
        container.appendChild(summaryDoc);
    };
})();
