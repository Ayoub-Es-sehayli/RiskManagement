using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace RiskManagement.Models
{
  public class Domain
  {
    [Key]
    public int Id { get; set; }
    public string Name { get; set; }
    public IQueryable<MacroProcess> MacroProcesses { get; set; }
  }
}