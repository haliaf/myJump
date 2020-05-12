using System.Linq;
using System.Threading.Tasks;
using Web.Api.Core.Dto;
using Web.Api.Core.Dto.UseCaseRequests;
using Web.Api.Core.Dto.UseCaseResponses;
using Web.Api.Core.Interfaces;
using Web.Api.Core.Interfaces.Gateways.Repositories;
using Web.Api.Core.Interfaces.UseCases;

namespace Web.Api.Core.UseCases
{
    public sealed class GetCurrentUserProfileUseCase : IGetCurrentUserProfileUseCase
    {
        private readonly IUserRepository _userRepository;

        public GetCurrentUserProfileUseCase(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<bool> Handle(CurrentUserRequest message, IOutputPort<CurrentUserResponse> outputPort)
        {
            var user = await _userRepository.FindByName(message.UserName);
            if (user == null)
            {
                outputPort.Handle(new CurrentUserResponse(new[] { "User Profile Not Found" }, false));
            }
            outputPort.Handle(new CurrentUserResponse(user.UserProfileImages, user.Email, user.FirstName, user.LastName, true));
            return true;
        }
    }
}
