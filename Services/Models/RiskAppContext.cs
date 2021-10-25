using Microsoft.EntityFrameworkCore;

namespace RiskManagement.Models
{
  public class RiskAppContext : DbContext
  {
    public RiskAppContext(DbContextOptions<RiskAppContext> options) : base(options)
    {

    }

    public DbSet<Risk> Risks { get; set; }
    public DbSet<Process> Processes { get; set; }
    public DbSet<MacroProcess> MacroProcess { get; set; }
    public DbSet<Domain> Domain { get; set; }
    public DbSet<Identification> Identifications { get; set; }
    public DbSet<EvaluationInherent> EvaluationsInherent { get; set; }
    public DbSet<EvaluationResiduel> EvaluationsResiduel { get; set; }
    public DbSet<EvaluationDispositif> EvaluationsDispositif { get; set; }
    public DbSet<Comments> Comments { get; set; }
    public DbSet<Entity> Entities { get; set; }
    public DbSet<Position> Positions { get; set; }
    public DbSet<Activity> Activities { get; set; }
  }
}