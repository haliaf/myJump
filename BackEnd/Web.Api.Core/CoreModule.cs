using Autofac;
using Web.Api.Core.Interfaces.UseCases;
using Web.Api.Core.Interfaces.UseCases.MapEvent;
using Web.Api.Core.UseCases;
using Web.Api.Core.UseCases.MapEvent;

namespace Web.Api.Core
{
    public class CoreModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<GetMapEventUseCase>().As<IGetMapEventUseCase>().InstancePerLifetimeScope();
            builder.RegisterType<ConnectToMapEventUseCase>().As<IConnectToMapEventUseCase>().InstancePerLifetimeScope();
            
            builder.RegisterType<RegisterUserUseCase>().As<IRegisterUserUseCase>().InstancePerLifetimeScope();
            builder.RegisterType<LoginUseCase>().As<ILoginUseCase>().InstancePerLifetimeScope();
            builder.RegisterType<MapEventUseCase>().As<IMapEventUseCase>().InstancePerLifetimeScope();
            builder.RegisterType<GetCurrentUserProfileUseCase>().As<IGetCurrentUserProfileUseCase>().InstancePerLifetimeScope();
            builder.RegisterType<ExchangeRefreshTokenUseCase>().As<IExchangeRefreshTokenUseCase>().InstancePerLifetimeScope();
            builder.RegisterType<AddUserProfileImagesUseCase>().As<IAddUserProfileImagesUseCase>().InstancePerLifetimeScope();
        }
    }
}
