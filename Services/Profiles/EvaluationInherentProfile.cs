using AutoMapper;
using RiskManagement.Dtos;
using RiskManagement.Models;

namespace RiskManagement.Profiles
{
  public class EvaluationInherentProfile : Profile
  {
    public EvaluationInherentProfile()
    {
      CreateMap<EvaluationInherentDto, EvaluationInherent>();
    }
  }
}