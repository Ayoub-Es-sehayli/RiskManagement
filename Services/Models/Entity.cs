using System.Linq;

namespace RiskManagement.Models
{
  public class Entity
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public IQueryable<Identification> Identifications { get; set; }
  }
}