using RiskManagement.Enums;

namespace RiskManagement.Models
{
  public class EvaluationResiduel
  {
    public int Id { get; set; }
    public Risk Risk { get; set; }
    public EEfficency ControlLevelEfficency { get; set; }
    public string ControlLevelDescription { get; set; }
    public EEfficency ControlAutoEfficency { get; set; }
    public string ControlAutoDescription { get; set; }
    public EEfficency ProcedureCircularEfficency { get; set; }
    public string ProcedureCircularDescription { get; set; }
    public EEfficency SensibilisationFormationEfficency { get; set; }
    public string SensibilisationFormationDescription { get; set; }
  }
}