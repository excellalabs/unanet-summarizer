<h2>Unanet Time Summary</h2>
<table>
  <thead>
    <tr>
      <th colspan="<% this.hoursByProjectType.length %>">Project Types</th>
      <th colspan="3">Totals</th>
      <th colspan="3">Pay Period Tracking</th>
    </tr>
    <tr>
      <% for (var i in this.hoursByProjectType) { %>
        <th><% this.hoursByProjectType[i].projectType %></th>
      <% } %>
      <th>+ Hours</th>
      <th>Non + Hours</th>
      <th>Grand Total</th>
      <th>Potential Hours</th>
      <th>Your + Hours</th>
      <th>Tracking</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <% for (var i in this.hoursByProjectType) { %>
        <td><% this.hoursByProjectType[i].totalHours %></td>
      <% } %>
      <td><% this.totalPlusHoursResult %></td>
      <td><% this.totalNonPlusHoursResult %></td>
      <td><% this.totalHoursResult %></td>
      <td><% this.hoursTargetForPayPeriod %></td>
      <td><% this.totalPlusHoursResult %></td>
      <td><% this.hoursForTracking %></td>
    </tr>
  </tbody>
</table>
