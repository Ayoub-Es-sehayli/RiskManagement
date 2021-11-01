using System.Linq;
using HotChocolate;
using HotChocolate.Types;
using Microsoft.EntityFrameworkCore;
using RiskManagement.Models;

namespace RiskManagement.Services.Domains
{
  public class DomainType : ObjectType<Domain>
  {
    protected override void Configure(IObjectTypeDescriptor<Domain> descriptor)
    {
      descriptor.Field(d => d.MacroProcesses)
        .ResolveWith<Resolvers>(r => r.GetMacroProcesses(default!, default!))
        .UseDbContext<RiskAppContext>()
        .UseSorting();
    }
    private class Resolvers
    {
      public IQueryable<MacroProcess> GetMacroProcesses([Parent] Domain domain, [ScopedService] RiskAppContext context)
      {
        return context.MacroProcess.Where(m => m.DomainId == domain.Id);
      }
    }
  }
}