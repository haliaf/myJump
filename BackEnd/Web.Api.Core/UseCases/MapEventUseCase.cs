using System.Threading.Tasks;
using Web.Api.Common.Services.Interface;
using Web.Api.Core.Dto;
using Web.Api.Core.Dto.UseCaseRequests;
using Web.Api.Core.Dto.UseCaseResponses;
using Web.Api.Core.Interfaces;
using Web.Api.Core.Interfaces.Gateways.Repositories;
using Web.Api.Core.Interfaces.Services;
using Web.Api.Core.Interfaces.UseCases;


namespace Web.Api.Core.UseCases
{
    public sealed class MapEventUseCase : IMapEventUseCase
    {
        private readonly IUserRepository _userRepository;
        private readonly IJwtFactory _jwtFactory;
        private readonly ITokenFactory _tokenFactory;
        private readonly IUserContextFactory _userContextFactory;

        public MapEventUseCase(IUserRepository userRepository, IJwtFactory jwtFactory, ITokenFactory tokenFactory, IUserContextFactory userContextFactory)
        {
            _userRepository = userRepository;
            _jwtFactory = jwtFactory;
            _tokenFactory = tokenFactory;
            _userContextFactory = userContextFactory;
        }


        public async Task<bool> Handle(MapEventUseCaseRequest message, IOutputPort<MapEventUseCaseResponse> outputPort)
        {
            var userName =_userContextFactory.CreateUserContext().CurrentUserName;
             outputPort.Handle(new MapEventUseCaseResponse(new[] { new Error("login_failure", "Invalid username or password.") }));
            return false;
        }
    }
}
