using AutoMapper;
using RiskManagement.Dtos;
using RiskManagement.Models;

namespace RiskManagement.Profiles
{
  public class ActivityProfile : Profile
  {
    public ActivityProfile()
    {
      CreateMap<ActivityDto, Activity>()
        .ForMember(a => a.Actor, opt => opt.Ignore())
        .ForMember(a => a.ActorId, opt => opt.MapFrom(adto => adto.Actor))
        .ForMember(a => a.Process, opt => opt.Ignore())
        .ForMember(a => a.ProcessId, opt => opt.MapFrom(adto => adto.Process))
        .ForMember(a => a.Name, opt => opt.MapFrom(adto => adto.Activity));
    }
  }
}