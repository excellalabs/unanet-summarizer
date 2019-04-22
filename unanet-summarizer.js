window.summarizeUnanetTime = (function() {
    var Template = function(html) {
        // see: http://krasimirtsonev.com/blog/article/Javascript-template-engine-in-just-20-line
        var re = /<%([^%>]+)?%>/g,
            reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g,
            code = 'var r=[];\n',
            cursor = 0,
            match;

        var add = function(line, js) {
            js ? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n')
               : (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
            return add;
        };

        while(match = re.exec(html)) {
            add(html.slice(cursor, match.index))(match[1], true);
            cursor = match.index + match[0].length;
        }

        add(html.substr(cursor, html.length - cursor));
        code += 'return r.join("");';

        return new Function(code.replace(/[\r\t\n]/g, ''));
    };

    const CONTAINER_ID = 'unanet-summary';
    const ASSUMED_HOURS_PER_DAY = 8;
    const CONTAINER_TEMPLATE = Template(
      '<h2>Unanet Time Summary</h2>' +
      '<table style="border: 2px solid; margin-bottom: 20px;">' +
        '<thead>' +
          '<tr>' +
            '<th colspan="<% this.hoursByProjectType.length %>">Project Types</th>' +
            '<th colspan="3">Totals</th>' +
            '<th colspan="3">Monthly Tracking</th>' +
          '</tr>' +
          '<tr>' +
            '<% for (var i in this.hoursByProjectType) { %>' +
              '<th><% this.hoursByProjectType[i].projectType %></th>' +
            '<% } %>' +
            '<th>+ Hours</th>' +
            '<th>Non + Hours</th>' +
            '<th>Grand Total</th>' +
            '<th>Potential Hours</th>' +
            '<th>Your + Hours</th>' +
            '<th>Tracking</th>' +
          '</tr>' +
        '</thead>' +
        '<tbody>' +
          '<tr>' +
            '<% for (var i in this.hoursByProjectType) { %>' +
              '<td><% this.hoursByProjectType[i].totalHours %></td>' +
            '<% } %>' +
            '<td><% this.totalPlusHoursResult %></td>' +
            '<td><% this.totalNonPlusHoursResult %></td>' +
            '<td><% this.totalHoursResult %></td>' +
            '<td><% this.hoursTargetForPayPeriod %></td>' +
            '<td><% this.totalPlusHoursResult %></td>' +
            '<td><% this.hoursForTracking %></td>' +
          '</tr>' +
        '</tbody>' +
      '</table>'
    );

    var isReadOnlyTimesheet = function() {
        // if there are no inputs, the timesheet is readonly
        return document.querySelectorAll('input').length === 0;
    };

    var toArray = function(nodeList) {
        return [].slice.call(nodeList);        
    };

    const IsReadOnly = isReadOnlyTimesheet();


    var obtainTimeEntryRows = function() { 
        var arrayToReturn = []; 

        console.log('readOnly: ', IsReadOnly);

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

    var createContainer = function() {
        var container = document.createElement('div');
        container.id = CONTAINER_ID;
        return document.body.insertBefore(container, document.body.firstChild);
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
        if (IsReadOnly){ return 0; }
        else {
            var dateElements = document.querySelectorAll('span.dom');
            var lastDateOnTimesheet = parseInt(dateElements[dateElements.length - 1].textContent);
        
            var today = new Date();
            var fullLastDate = new Date(today.getFullYear(), today.getMonth(), lastDateOnTimesheet);
            var fullTodayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

            return getBusinessDatesCount(fullTodayDate, fullLastDate);
        }
    }

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
        properties.hoursForTracking = properties.hoursTargetForPayPeriod - (getDaysLeftInTimesheet() * ASSUMED_HOURS_PER_DAY) - properties.totalPlusHoursResult;

        console.log('number of workable days:', getWeekdaysInTimesheet()); // TODO: remove
        console.log('daysLeft:', getDaysLeftInTimesheet());  // TODO: remove
        console.log('hours target: ', properties.hoursTargetForPayPeriod);
        console.log('tracking: ', properties.hoursForTracking);
        
        var container = document.getElementById(CONTAINER_ID) || createContainer();
        container.innerHTML = CONTAINER_TEMPLATE.apply(properties);
    };
})();
