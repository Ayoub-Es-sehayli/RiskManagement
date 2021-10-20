using Xunit;
using AutoMapper;
using RiskManagement.Profiles;
using RiskManagement.Dtos;
using RiskManagement.Models;
using RiskManagement.Enums;

namespace RiskManagement.Tests.Profiles
{
  public class MappingTests
  {
    [Fact]
    public void MapComments_ReturnsObject()
    {
      var config = new MapperConfiguration(cfg =>
      {
        cfg.AddProfile<CommentsProfile>();
      });

      var map = config.CreateMapper();
      var dto = new CommentsDto
      {
        CanProfit = "asdfasdf",
        ImpactCreditRisk = "asdfasdf",
        ImpactImageRisk = "asdfasdf",
        ImpactInsatisfaction = "asdfasdf",
        ImpactLegal = "asdfasdf",
        ImpactMarketRisk = "asdfasdf",
        ImpactOther = "asdfasdf",
        ImpactProcessInterrupted = "asdfasdf",
        ImpactRegulatory = "asdfasdf"
      };

      var result = map.Map<Comments>(dto);
      Assert.NotNull(result);
      Assert.NotEmpty(result.CanProfit);
    }

    [Fact]
    public void MapEvaluationDispositif_ReturnsObject()
    {
      var config = new MapperConfiguration(cfg =>
      {
        cfg.AddProfile<EvaluationDispositifProfile>();
      });

      var map = config.CreateMapper();
      var dto = new EvaluationDispositifDto
      {
        Comment = "asdf",
        DmrGlobal = EEfficency.NotApplicable,
        DmrTypology = EDmrTypology.Curative,
        RatingNet = ERiskRating.Low
      };

      var result = map.Map<EvaluationDispositif>(dto);
      Assert.NotNull(result);
    }

    [Fact]
    public void MapEvaluationInherent_ReturnsObject()
    {
      var config = new MapperConfiguration(cfg =>
      {
        cfg.AddProfile<CommentsProfile>();
        cfg.AddProfile<EvaluationInherentProfile>();
      });

      var map = config.CreateMapper();
      var dto = new EvaluationInherentDto
      {
        Frequency = EFrequency.ExtremelyRare,
        ImpactRaw = EImpactRating.Insignificant,
        RatingRaw = ERiskRating.Low,
        CanProfit = false,
        ImpactCreditRisk = false,
        ImpactImageRisk = false,
        ImpactInsatisfaction = false,
        ImpactLegal = false,
        ImpactMarketRisk = false,
        ImpactOther = false,
        ImpactProcessInterrupted = false,
        ImpactRegulatory = false,
        Comments = new CommentsDto
        {
          CanProfit = "asdfasdf",
          ImpactCreditRisk = "asdfasdf",
          ImpactImageRisk = "asdfasdf",
          ImpactInsatisfaction = "asdfasdf",
          ImpactLegal = "asdfasdf",
          ImpactMarketRisk = "asdfasdf",
          ImpactOther = "asdfasdf",
          ImpactProcessInterrupted = "asdfasdf",
          ImpactRegulatory = "asdfasdf",
        }
      };

      var result = map.Map<EvaluationInherent>(dto);
      Assert.NotNull(result);
    }

    [Fact]
    public void MapEvaluationResiduel_ReturnsObject()
    {
      var config = new MapperConfiguration(cfg =>
      {
        cfg.AddProfile<EvaluationResiduelProfile>();
      });

      var map = config.CreateMapper();
      var dto = new EvaluationResiduelDto
      {
        ControlLevelEfficency = EEfficency.NotApplicable,
        ControlAutoEfficency = EEfficency.NotApplicable,
        ProcedureCircularEfficency = EEfficency.NotApplicable,
        SensibilisationFormationEfficency = EEfficency.NotApplicable,
        ControlLevelDescription = "asdfasdf",
        ControlAutoDescription = "asdfasdf",
        ProcedureCircularDescription = "asdfasdf",
        SensibilisationFormationDescription = "asdfasdf"
      };

      var result = map.Map<EvaluationResiduel>(dto);
      Assert.NotNull(result);
    }

    [Fact]
    public void MapIdentification_ReturnsObject()
    {
      var config = new MapperConfiguration(cfg =>
      {
        cfg.AddProfile<IdentificationProfile>();
      });

      var map = config.CreateMapper();
      var dto = new IdentificationDto
      {
        RiskName = "Test",
        RiskCause = "Test",
        Process = 1,
        Description = "asdfasdf",
        ImpactsOthers = false,
      };

      var result = map.Map<Identification>(dto);
      Assert.NotNull(result);
    }

    [Fact]
    public void MapImpactedEntity_ReturnsObject()
    {
      var config = new MapperConfiguration(cfg =>
      {
        cfg.AddProfile<ImpactedEntityProfile>();
      });

      var map = config.CreateMapper();
      var dto = new ImpactedEntityDto
      {

      };

      var result = map.Map<Entity>(dto);
      Assert.NotNull(result);
    }

    [Fact]
    public void MapRisk_ReturnsObject()
    {
      var config = new MapperConfiguration(cfg =>
      {
        cfg.AddProfile<RiskProfile>();
      });

      var map = config.CreateMapper();
      var dto = new RiskFormDto
      {

      };

      var result = map.Map<Risk>(dto);
      Assert.NotNull(result);
    }

  }
}