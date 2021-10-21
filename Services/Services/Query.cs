using System.Linq;
using HotChocolate;
using HotChocolate.Data;
using RiskManagement.Models;

namespace RiskManagement.Services
{
  public class Query
  {
    [UseDbContext(typeof(RiskAppContext))]
    [UseSorting]
    [UseFiltering]
    public IQueryable<Risk> GetRisk([ScopedService] RiskAppContext context)
    {
      return context.Risks;
    }

    [UseDbContext(typeof(RiskAppContext))]
    [UseFiltering]
    [UseSorting]
    public IQueryable<Process> GetProcess([ScopedService] RiskAppContext context)
    {
      return context.Processes;
    }

    [UseDbContext(typeof(RiskAppContext))]
    [UseFiltering]
    [UseSorting]
    public IQueryable<Entity> GetEntity([ScopedService] RiskAppContext context)
    {
      return context.Entities;
    }
  }
}