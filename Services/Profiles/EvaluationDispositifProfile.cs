using AutoMapper;
using RiskManagement.Dtos;
using RiskManagement.Models;

namespace RiskManagement.Profiles
{
  public class EvaluationDispositifProfile : Profile
  {
    public EvaluationDispositifProfile()
    {
      CreateMap<EvaluationDispositifDto, EvaluationDispositif>();
    }
  }
}