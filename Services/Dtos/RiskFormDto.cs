
namespace RiskManagement.Dtos
{
  public class RiskFormDto
  {
    public IdentificationDto Identification { get; set; }
    public EvaluationInherentDto EvaluationInherent { get; set; }
    public EvaluationResiduelDto EvaluationResiduel { get; set; }
    public EvaluationDispositifDto EvaluationDispositif { get; set; }
  }
}