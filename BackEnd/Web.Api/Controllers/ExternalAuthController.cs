using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Web.Api.Core.Dto.UseCaseRequests;
using Web.Api.Core.Interfaces.UseCases;
using Web.Api.Core.Interfaces.UseCases.Auth;
using Web.Api.Models.Request.Auth;
using Web.Api.Models.Settings;
using Web.Api.Presenters;


namespace Web.Api.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ExternalAuthController : ControllerBase
    {
        private readonly IFacebookAuthUseCase _facebookAuthUseCase;
        private readonly LoginPresenter _loginPresenter;
        private readonly AuthSettings _authSettings;

        public ExternalAuthController(IFacebookAuthUseCase facebookAuthUseCase, LoginPresenter loginPresenter, IExchangeRefreshTokenUseCase exchangeRefreshTokenUseCase, ExchangeRefreshTokenPresenter exchangeRefreshTokenPresenter, IOptions<AuthSettings> authSettings)
        {
            _facebookAuthUseCase = facebookAuthUseCase;
            _loginPresenter = loginPresenter;
            _authSettings = authSettings.Value;
        }

        // POST api/externalauth/facebook
        [HttpPost]
        public async Task<IActionResult> Facebook([FromBody]FacebookAuthViewModelDto request)
        {
            await _facebookAuthUseCase.Handle(new FaceBookLoginRequest(request.AccessToken, Request.HttpContext.Connection.RemoteIpAddress?.ToString()), _loginPresenter);
            return _loginPresenter.ContentResult;
        }
    }
}

