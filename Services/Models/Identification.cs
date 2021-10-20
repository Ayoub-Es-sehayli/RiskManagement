using System.Collections.Generic;

namespace RiskManagement.Models
{
  public class Identification
  {
    public int Id { get; set; }
    public string RiskName { get; set; }
    public string RiskCause { get; set; }
    public int ProcessId { get; set; }
    public string Description { get; set; }
    public bool ImpactsOthers { get; set; }
    public string Causes { get; set; }
    public List<Entity> ImpactedEntities { get; set; }

    public Process Process { get; set; }
    public static string CausesFromList(List<string> causes)
    {
      return string.Join("###", causes);
    }
  }
}