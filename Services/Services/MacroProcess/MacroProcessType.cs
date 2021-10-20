using System.Linq;
using HotChocolate;
using HotChocolate.Types;
using RiskManagement.Models;

namespace RiskManagement.Services.MacroProcesses
{
  public class MacroProcessType : ObjectType<MacroProcess>
  {
    protected override void Configure(IObjectTypeDescriptor<MacroProcess> descriptor)
    {
      descriptor.Field(m => m.Domain)
        .ResolveWith<Resolvers>(r => r.GetDomains(default!, default!))
        .UseDbContext<RiskAppContext>();
    }
    private class Resolvers
    {
      public Domain GetDomains([Parent] MacroProcess macroProcess, [ScopedService] RiskAppContext context)
      {
        return context.Domain.FirstOrDefault(d => d.Id == macroProcess.DomainId);
      }
    }
  }
}