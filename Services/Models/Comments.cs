using System.ComponentModel.DataAnnotations;

namespace RiskManagement.Models
{
  public class Comments
  {
    public int Id { get; set; }
    public int EvaluationInherentId { get; set; }
    public EvaluationInherent EvaluationInherent { get; set; }
    public string CanProfit { get; set; }
    public string ImpactRegulatory { get; set; }
    public string ImpactLegal { get; set; }
    public string ImpactImageRisk { get; set; }
    public string ImpactInsatisfaction { get; set; }
    public string ImpactCreditRisk { get; set; }
    public string ImpactMarketRisk { get; set; }
    public string ImpactProcessInterrupted { get; set; }
    public string ImpactOther { get; set; }
  }
}