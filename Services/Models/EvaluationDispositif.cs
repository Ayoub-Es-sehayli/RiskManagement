using RiskManagement.Enums;

namespace RiskManagement.Models
{
  public class EvaluationDispositif
  {
    public int Id { get; set; }
    public Risk Risk { get; set; }
    public EEfficency DmrGlobal { get; set; }
    public EDmrTypology DmrTypology { get; set; }
    public ERiskRating RatingNet { get; set; }
    public string Comment { get; set; }
  }
}