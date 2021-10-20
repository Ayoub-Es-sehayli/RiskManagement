using System;
using System.ComponentModel.DataAnnotations;

namespace RiskManagement.Models
{
  public class Risk
  {
    public int Id { get; set; }
    [DataType("date")]
    public DateTime DateStamp { get; set; }
    public int IdentificationId { get; set; }
    public int EvaluationInherentId { get; set; }
    public int EvaluationResiduelId { get; set; }
    public int EvaluationDispositifId { get; set; }

    public Identification Identification { get; set; }
    public EvaluationInherent EvaluationInherent { get; set; }
    public EvaluationResiduel EvaluationResiduel { get; set; }
    public EvaluationDispositif EvaluationDispositif { get; set; }
  }
}