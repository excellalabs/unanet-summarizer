module.exports = (function() {
    const ASSUMED_HOURS_PER_DAY = 8;

    var isReadOnlyTimesheet = function() {
        // if there are no inputs, the timesheet is readonly
        return document.querySelectorAll('input').length === 0;
    };

    const IsReadOnly = isReadOnlyTimesheet();

    var toArray = function(nodeList) {
        return [].slice.call(nodeList);        
    };

    var obtainTimeEntryRows = function() { 
        var arrayToReturn = []; 

        var rows = toArray(IsReadOnly ?
          document.querySelectorAll("table.timesheet > tbody:first-of-type > tr")
          : document.querySelectorAll("#timesheet > tbody:first-of-type > tr")
        );

        return rows
          .map(function(timesheetRow) {
            var projectType;
            var timeValue;
        
            if (IsReadOnly) {
                projectType = timesheetRow.querySelector(':nth-child(4)').textContent || "";
                timeValue = parseFloat(timesheetRow.querySelector(':last-child').textContent) || parseFloat(0.0);
            } else {
                projectType = timesheetRow.querySelector("td.project-type > select > option:checked").text;  
                timeValue = parseFloat(timesheetRow.querySelector('td.total > input').getAttribute('value')) || parseFloat(0.0); 
            }
        
            return (!projectType || projectType === '') ? null : { projectType: projectType, timeValue: timeValue };
          })
          .filter(function(timesheetRow) {
            return timesheetRow !== null;
          });
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

    // This function returns an object with a reducer function (a way of reducing an array of hours which we'll pass later)
    // and the starting state of the accumulators that those reducers will use. 
    var getReducers = function() {
        return {
            hoursByProjectType: { fn: totalHoursByProjectType, init: [] },
            totalPlusHoursResult: { fn: totalPlusHours, init: 0.0 },
            totalNonPlusHoursResult: { fn: totalNonPlusHours, init: 0.0 },
            totalHoursResult: { fn: totalHoursReduceFunction, init: 0.0 }
        };
    };

    var getBusinessDatesCount = function(startDate, endDate) {
        // provided from https://stackoverflow.com/a/37069277/316847
        var count = 0;
        var curDate = startDate;
        while (curDate <= endDate) {
            var dayOfWeek = curDate.getDay();
            if(!((dayOfWeek == 6) || (dayOfWeek == 0)))
               count++;
            curDate.setDate(curDate.getDate() + 1);
        }
        return count;
    };

    var getWeekdaysInTimesheet = function(){
        if (IsReadOnly) {
            return document.querySelectorAll('table.timesheet > tbody > tr:first-of-type > td.weekday').length;
        }
        else {
            return document.querySelectorAll('#timesheet > tbody > tr:first-of-type > td.weekday-hours').length;
        }
    };

    var getDaysLeftInTimesheet = function() {
        if (IsReadOnly) {
            return 0;
        } else {
            var dateElements = document.querySelectorAll('span.dom');
            var lastDateOnTimesheet = parseInt(dateElements[dateElements.length - 1].textContent);
        
            var today = new Date();
            var fullLastDate = new Date(today.getFullYear(), today.getMonth(), lastDateOnTimesheet);
            var fullTodayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

            return getBusinessDatesCount(fullTodayDate, fullLastDate);
        }
    };

    // Execution
    return function() {
        var timeEntries = obtainTimeEntryRows();        
        var reducers = getReducers();

        // Takes each reducer function name and function, calls reduce using that function,
        // and sets the result on an object that we reference in our document generation.
        var properties = Object.keys(reducers).reduce(function(acc, property) {
            var config = reducers[property];
            acc[property] = timeEntries.reduce(config.fn, config.init);
            return acc;
        }, {});

        properties.hoursTargetForPayPeriod = getWeekdaysInTimesheet() * ASSUMED_HOURS_PER_DAY;
        properties.hoursForTracking = -(properties.hoursTargetForPayPeriod - (getDaysLeftInTimesheet() * ASSUMED_HOURS_PER_DAY) - properties.totalPlusHoursResult);

        return properties;
    };
})();
