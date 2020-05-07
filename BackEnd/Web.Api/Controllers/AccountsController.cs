using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Web.Api.Core.Dto.UseCaseRequests;
using Web.Api.Core.Interfaces.UseCases;
using Web.Api.Models.Request;
using Web.Api.Presenters;

namespace Web.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly IRegisterUserUseCase _registerUserUseCase;
        private readonly IGetCurrentUserProfileUseCase _getCurrentUserProfileUseCase;
        private readonly IAddUserProfileImagesUseCase _addUserProfileImagesUseCase;
        private readonly RegisterUserPresenter _registerUserPresenter;
        private readonly CurrentUserPresenter _currentUserPresenter;
        private readonly AddUserImagesPresenter _addUserImagesPresenter;

        public AccountsController(IAddUserProfileImagesUseCase addUserProfileImagesUseCase, IGetCurrentUserProfileUseCase getCurrentUserProfileUseCase, IRegisterUserUseCase registerUserUseCase, RegisterUserPresenter registerUserPresenter, CurrentUserPresenter currentUserPresenter, AddUserImagesPresenter addUserImagesPresenter)
        {
            _registerUserUseCase = registerUserUseCase;
            _getCurrentUserProfileUseCase = getCurrentUserProfileUseCase;
            _registerUserPresenter = registerUserPresenter;
            _currentUserPresenter = currentUserPresenter;
            _addUserProfileImagesUseCase = addUserProfileImagesUseCase;
            _addUserImagesPresenter = addUserImagesPresenter;
        }

        // POST api/accounts
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] Models.Request.RegisterUserRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            await _registerUserUseCase.Handle(new Core.Dto.UseCaseRequests.RegisterUserRequest(request.FirstName, request.LastName, request.Email, request.UserName, request.Password), _registerUserPresenter);
            return _registerUserPresenter.ContentResult;
        }

        [Authorize(Policy = "ApiUser")]
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var user = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            await _getCurrentUserProfileUseCase.Handle(new CurrentUserRequest(user), _currentUserPresenter);
            return _currentUserPresenter.ContentResult;
        }

        [Authorize(Policy = "ApiUser")]
        [HttpPut]
        [Route("updateimage")]
        public async Task<ActionResult> UpdateImage([FromBody] AddUserImagesRequestDto addUserImagesRequestDto)
        {
            await _addUserProfileImagesUseCase.Handle(new AddUserImagesRequest(addUserImagesRequestDto.ImagesBase64), _addUserImagesPresenter);
            return _addUserImagesPresenter.ContentResult;
        }
    }
}
