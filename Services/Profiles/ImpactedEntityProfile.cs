using AutoMapper;
using RiskManagement.Dtos;
using RiskManagement.Models;

namespace RiskManagement.Profiles
{
  public class ImpactedEntityProfile : Profile
  {
    public ImpactedEntityProfile()
    {
      CreateMap<ImpactedEntityDto, Entity>();
    }
  }
}