using System;
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
      descriptor.Field(m => m.Processes)
        .ResolveWith<Resolvers>(r => r.GetProcesses(default!, default!))
        .UseDbContext<RiskAppContext>()
        .UseSorting();
    }
    private class Resolvers
    {
      public Domain GetDomains([Parent] MacroProcess macroProcess, [ScopedService] RiskAppContext context)
      {
        return context.Domain.FirstOrDefault(d => d.Id == macroProcess.DomainId);
      }

      public IQueryable<Process> GetProcesses([Parent] MacroProcess macroProcess, [ScopedService] RiskAppContext context)
      {
        return context.Processes.Where(p => p.MacroProcessId == macroProcess.Id);
      }
    }
  }
}