using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace Excella.Function
{
  public static class AnalyticsHttpTrigger
  {
    [FunctionName("AnalyticsHttpTrigger")]
    public static async Task<IActionResult> Run(

        // NOTE: We are choosing to use AnalyticsEntry here which will attempt to modelbind for us. We could also use HttpRequest and get the full request.
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] AnalyticsEntryRequest incomingModelBoundObject,
        [Table("analyticsentries")]ICollector<AnalyticsEntry> tableBinding,
        ILogger log)
    {
      log.LogInformation("Incoming analytics entry: {AnalyticsEntry}", incomingModelBoundObject);
      log.LogInformation("C# HTTP trigger function processed a request.");

      if (string.IsNullOrWhiteSpace(incomingModelBoundObject.UserName))
      {
        log.LogWarning("User's name was not provided");
        return new BadRequestResult(); ;
      }

      if (string.IsNullOrWhiteSpace(incomingModelBoundObject.TimesheetUser))
      {
        log.LogWarning("Timesheet user was not provided");
        return new BadRequestResult();
      }

      tableBinding.Add(new AnalyticsEntry(incomingModelBoundObject));
      return new OkResult();
    }
  }
}
