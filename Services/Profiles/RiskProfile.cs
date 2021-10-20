using AutoMapper;
using RiskManagement.Dtos;
using RiskManagement.Models;

namespace RiskManagement.Profiles
{
  public class RiskProfile : Profile
  {
    public RiskProfile()
    {
      CreateMap<RiskFormDto, Risk>()
        .ForMember(r => r.Id, opt => opt.Ignore())
        .ForMember(r => r.IdentificationId, opt => opt.Ignore())
        .ForMember(r => r.EvaluationInherentId, opt => opt.Ignore())
        .ForMember(r => r.EvaluationResiduelId, opt => opt.Ignore())
        .ForMember(r => r.EvaluationDispositifId, opt => opt.Ignore());
    }
  }
}