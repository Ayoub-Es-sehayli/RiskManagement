using System.Threading.Tasks;
using HotChocolate.Data;
using AutoMapper;
using HotChocolate;
using HotChocolate.Subscriptions;
using RiskManagement.Models;
using RiskManagement.Dtos;
using RiskManagement.Services.Risks;
using RiskManagement.Services.Activities;

namespace RiskManagement.Services
{
  public class Mutation
  {
    [UseDbContext(typeof(RiskAppContext))]
    public async Task<RiskPayload> AddRisk(RiskFormDto input,
                                                [ScopedService] Models.RiskAppContext context,
                                                // [Service] ITopicEventSender sender,
                                                [Service] IMapper mapper)
    {
      var model = mapper.Map<Risk>(input);
      await context.Risks.AddAsync(model);
      await context.SaveChangesAsync();
      return new RiskPayload(model.Id);
    }
    [UseDbContext(typeof(RiskAppContext))]
    public async Task<ActivityPayload> AddActivity(ActivityDto input,
                                                [ScopedService] Models.RiskAppContext context,
                                                // [Service] ITopicEventSender sender,
                                                [Service] IMapper mapper)
    {
      var model = mapper.Map<Activity>(input);
      await context.Activities.AddAsync(model);
      await context.SaveChangesAsync();
      return new ActivityPayload(model.Id);
    }
  }
}