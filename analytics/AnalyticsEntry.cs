
using System;

namespace Excella.Function
{
  public class AnalyticsEntry
  {
    public DateTime RowKey { get; }
    public DateTime PartitionKey { get; }
    public string UserName { get; }
    public string TimesheetUser { get; }

    public AnalyticsEntry(AnalyticsEntryRequest request)
    {
      this.RowKey = request.Timestamp;
      this.PartitionKey = request.Timestamp;
      this.UserName = request.UserName;
      this.TimesheetUser = request.TimesheetUser;

    }

  }
}
