using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace RiskManagement.Models
{
  public class MacroProcess
  {
    public int Id { get; set; }
    public string Name { get; set; }
    [Required]
    public int DomainId { get; set; }
    public Domain Domain { get; set; }
    public IQueryable<Process> Processes { get; set; }
  }
}