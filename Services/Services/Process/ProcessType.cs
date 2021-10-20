using System.Linq;
using HotChocolate;
using HotChocolate.Types;
using Microsoft.EntityFrameworkCore;
using RiskManagement.Models;

namespace RiskManagement.Services.Processes
{
  public class ProcessType : ObjectType<Process>
  {
    protected override void Configure(IObjectTypeDescriptor<Process> descriptor)
    {
      descriptor.Field(d => d.MacroProcess)
        .ResolveWith<Resolvers>(r => r.GetMacroProcess(default!, default!))
        .UseDbContext<RiskAppContext>();
    }
    private class Resolvers
    {
      public MacroProcess GetMacroProcess([Parent] Process process, [ScopedService] RiskAppContext context)
      {
        return context.MacroProcess.FirstOrDefault(m => m.Id == process.MacroProcessId);
      }
    }
  }
}