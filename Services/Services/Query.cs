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

    [UseDbContext(typeof(RiskAppContext))]
    [UseFiltering]
    [UseSorting]
    public IQueryable<Position> GetPosition([ScopedService] RiskAppContext context)
    {
      return context.Positions;
    }

    [UseDbContext(typeof(RiskAppContext))]
    [UseFiltering]
    [UseSorting]
    public IQueryable<Domain> GetDomain([ScopedService] RiskAppContext context)
    {
      return context.Domain;
    }
  }
}