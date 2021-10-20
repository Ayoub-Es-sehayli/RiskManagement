using RiskManagement.Enums;

namespace RiskManagement.Dtos
{
  public class EvaluationDispositifDto
  {
    public EEfficency DmrGlobal { get; set; }
    public EDmrTypology DmrTypology { get; set; }
    public ERiskRating RatingNet { get; set; }
    public string Comment { get; set; }
  }
}