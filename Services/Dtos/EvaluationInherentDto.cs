using RiskManagement.Enums;

namespace RiskManagement.Dtos
{
  public class EvaluationInherentDto
  {
    public EFrequency Frequency { get; set; }
    public EImpactRating ImpactRaw { get; set; }
    public ERiskRating RatingRaw { get; set; }
    public bool CanProfit { get; set; }
    public bool ImpactRegulatory { get; set; }
    public bool ImpactLegal { get; set; }
    public bool ImpactImageRisk { get; set; }
    public bool ImpactInsatisfaction { get; set; }
    public bool ImpactCreditRisk { get; set; }
    public bool ImpactMarketRisk { get; set; }
    public bool ImpactProcessInterrupted { get; set; }
    public bool ImpactOther { get; set; }

    public CommentsDto Comments { get; set; }
  }
}