using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using HotChocolate;
using GraphQL.Server.Ui.Voyager;
using RiskManagement.Services.MacroProcesses;
using RiskManagement.Services.Processes;
using RiskManagement.Services.Risks;

namespace RiskManagement.Api
{
  public class Startup
  {
    public Startup(IConfiguration configuration, IWebHostEnvironment env)
    {
      Configuration = configuration;
      _env = env;
    }

    public IConfiguration Configuration { get; }
    private readonly IWebHostEnvironment _env;

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      services.AddControllers();
      #region DbContext
      var config = Configuration.GetSection("SqlServerConnection").Get<ConnectionConfig>();
      var builder = new SqlConnectionStringBuilder();
      builder.Password = config.Password;
      builder.DataSource = config.Server;
      builder.InitialCatalog = config.Database;
      builder.UserID = config.User;
      services.AddPooledDbContextFactory<Models.RiskAppContext>(
        options => options.UseSqlServer(builder.ConnectionString)
      );
      #endregion

      #region GraphQl
      services.AddGraphQLServer()
        .AddQueryType<Services.Query>()
        .AddMutationType<Services.Mutation>()
        .AddType<RiskType>()
        .AddType<ProcessType>()
        .AddType<MacroProcessType>()
        .AddFiltering()
        .AddSorting()
        .ModifyRequestOptions(opt => opt.IncludeExceptionDetails = _env.IsDevelopment());
      #endregion

      services.AddAutoMapper(cfg =>
      {
        cfg.AddProfile<Profiles.CommentsProfile>();
        cfg.AddProfile<Profiles.ImpactedEntityProfile>();
        cfg.AddProfile<Profiles.IdentificationProfile>();
        cfg.AddProfile<Profiles.EvaluationInherentProfile>();
        cfg.AddProfile<Profiles.EvaluationResiduelProfile>();
        cfg.AddProfile<Profiles.EvaluationDispositifProfile>();
        cfg.AddProfile<Profiles.RiskProfile>();
      });
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }

      app.UseRouting();

      app.UseAuthorization();

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapGraphQL();
        endpoints.MapControllers();
      });

      app.UseGraphQLVoyager(new VoyagerOptions
      {
        GraphQLEndPoint = "/graphql"
      });
    }
  }
}
