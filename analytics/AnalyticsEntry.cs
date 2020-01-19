
using System;

namespace Excella.Function
{
  public class AnalyticsEntry
  {
    public DateTime RowKey { get; }
    public string PartitionKey { get; }
    public string UserName { get; }
    public string TimesheetUser { get; }

    public AnalyticsEntry(AnalyticsEntryRequest request)
    {
      this.RowKey = request.Timestamp;
      this.PartitionKey = request.Timestamp.ToString("o");
      this.UserName = request.UserName;
      this.TimesheetUser = request.TimesheetUser;

    }

  }
}
