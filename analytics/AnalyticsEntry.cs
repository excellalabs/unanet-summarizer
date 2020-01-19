
using System;

namespace Excella.Function
{
  public class AnalyticsEntry
  {
    public string RowKey { get; }
    public string PartitionKey { get; }
    public string UserName { get; }
    public string TimesheetUser { get; }

    public AnalyticsEntry(AnalyticsEntryRequest request)
    {
      var timestampString = request.Timestamp.ToString("o");
      this.RowKey = timestampString;
      this.PartitionKey = timestampString;
      this.UserName = request.UserName;
      this.TimesheetUser = request.TimesheetUser;

    }

  }
}
