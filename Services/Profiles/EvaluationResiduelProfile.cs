using AutoMapper;
using RiskManagement.Dtos;
using RiskManagement.Models;

namespace RiskManagement.Profiles
{
  public class EvaluationResiduelProfile : Profile
  {
    public EvaluationResiduelProfile()
    {
      CreateMap<EvaluationResiduelDto, EvaluationResiduel>();
    }
  }
}