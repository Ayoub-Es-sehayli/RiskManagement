using AutoMapper;
using RiskManagement.Models;
using RiskManagement.Dtos;

namespace RiskManagement.Profiles
{
  public class CommentsProfile : Profile
  {
    public CommentsProfile()
    {
      CreateMap<CommentsDto, Comments>();
    }
  }
}