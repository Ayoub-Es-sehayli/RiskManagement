using System.Collections.Generic;
using System.Linq;
namespace RiskManagement.Dtos
{
  public class IdentificationDto
  {
    public string RiskName { get; set; }
    public string RiskCause { get; set; }
    public int Process { get; set; }
    public string Description { get; set; }
    public bool ImpactsOthers { get; set; }
    public List<ImpactedEntityDto> ImpactedEntities { get; set; }
    public List<string> Causes { get; set; }

    public static List<string> CausesFromString(string causes)
    {
      return causes.Split("###").ToList();
    }
  }
}