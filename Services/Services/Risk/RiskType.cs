using System.Linq;
using HotChocolate;
using HotChocolate.Types;
using RiskManagement.Models;

namespace RiskManagement.Services.Risks
{
  public class RiskType : ObjectType<Risk>
  {
    protected override void Configure(IObjectTypeDescriptor<Risk> descriptor)
    {
      descriptor.Field(r => r.Identification)
        .ResolveWith<Resolvers>(resolv => resolv.GetIdentification(default!, default!))
        .UseDbContext<RiskAppContext>();
    }

    private class Resolvers
    {
      public Identification GetIdentification([Parent] Risk risk, [ScopedService] RiskAppContext context)
      {
        return context.Identifications.FirstOrDefault(i => i.Id == risk.IdentificationId);
      }
    }
  }
}