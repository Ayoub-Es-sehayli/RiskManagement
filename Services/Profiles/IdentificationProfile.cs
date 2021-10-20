using AutoMapper;
using RiskManagement.Dtos;
using RiskManagement.Models;

namespace RiskManagement.Profiles
{
  public class IdentificationProfile : Profile
  {
    public IdentificationProfile()
    {
      CreateMap<IdentificationDto, Identification>()
        .ForMember(i => i.Causes, opt => opt.MapFrom(idto => Identification.CausesFromList(idto.Causes)))
        .ForMember(i => i.ProcessId, opt => opt.MapFrom(idto => idto.Process))
        .ForMember(i => i.Process, opt => opt.Ignore());
    }
  }
}