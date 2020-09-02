using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System.Net.Http;
using System.Threading.Tasks;
using Web.Api.Core.Dto;
using Web.Api.Core.Dto.UseCaseRequests;
using Web.Api.Core.Dto.UseCaseResponses;
using Web.Api.Core.Interfaces;
using Web.Api.Core.Interfaces.Gateways.Repositories;
using Web.Api.Core.Interfaces.Services;
using Web.Api.Core.Interfaces.UseCases.Auth;
using Web.Api.Infrastructure.Auth;
using Web.Api.Models.Request.Auth;
using Web.Api.Models.Request.Auth.Facebook;

namespace Web.Api.Core.UseCases
{
    public sealed class FacebookLoginUseCase : IFacebookAuthUseCase
    {
        private readonly IUserRepository _userRepository;
        private readonly IJwtFactory _jwtFactory;
        private readonly ITokenFactory _tokenFactory;
        private static readonly HttpClient Client = new HttpClient();
        public IConfiguration _configuration;
        public FacebookLoginUseCase(IUserRepository userRepository, IJwtFactory jwtFactory, ITokenFactory tokenFactory, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _jwtFactory = jwtFactory;
            _tokenFactory = tokenFactory;
            _configuration = configuration;
        }

        public async Task<bool> Handle(LoginRequest message, IOutputPort<LoginResponse> outputPort)
        {
            if (!string.IsNullOrEmpty(message.UserName) && !string.IsNullOrEmpty(message.Password))
            {
                // ensure we have a user with the given user name
                var user = await _userRepository.FindByName(message.UserName);
                if (user != null)
                {
                    // validate password
                    if (await _userRepository.CheckPassword(user, message.Password))
                    {
                        // generate refresh token
                        var refreshToken = _tokenFactory.GenerateToken();
                        user.AddRefreshToken(refreshToken, user.Id, message.RemoteIpAddress);
                        await _userRepository.Update(user);

                        // generate access token
                        outputPort.Handle(new LoginResponse(await _jwtFactory.GenerateEncodedToken(user.IdentityId, user.UserName), refreshToken, true));
                        return true;
                    }
                }
            }
            outputPort.Handle(new LoginResponse(new[] { new Error("login_failure", "Invalid username or password.") }));
            return false;
        }

        public async Task<bool> Handle(FaceBookLoginRequest message, IOutputPort<LoginResponse> outputPort)
        {
            if (!string.IsNullOrEmpty(message.AccessToken))
            {
                // ensure we have a user with the given user name
                // 1.generate an app access token
                var facebookOptions = _configuration.GetSection(nameof(FacebookAuthOptions));
                var appAccessTokenResponse = await Client.GetStringAsync($"https://graph.facebook.com/oauth/access_token?client_id={facebookOptions[nameof(FacebookAuthOptions.ApiId)]}&client_secret={facebookOptions[nameof(FacebookAuthOptions.SecretKey)]}&grant_type=client_credentials");
                var appAccessToken = JsonConvert.DeserializeObject<Models.Request.Auth.FacebookAppAccessToken>(appAccessTokenResponse);
                // 2. validate the user access token
                var userAccessTokenValidationResponse = await Client.GetStringAsync($"https://graph.facebook.com/debug_token?input_token={message.AccessToken}&access_token={appAccessToken.AccessToken}");
                var userAccessTokenValidation = JsonConvert.DeserializeObject<Models.Request.Auth.FacebookUserAccessTokenValidation>(userAccessTokenValidationResponse);

                if (!userAccessTokenValidation.Data.IsValid)
                {
                    outputPort.Handle(new LoginResponse(new[] { new Error("login_failure", "Not valid auth data") }));
                    return false;
                }

                // 3. we've got a valid token so we can request user data from fb
                var userInfoResponse = await Client.GetStringAsync($"https://graph.facebook.com/v2.8/me?fields=id,email,first_name,last_name,name,gender,locale,birthday,picture&access_token={message.AccessToken}");
                var userInfo = JsonConvert.DeserializeObject<FacebookUserData>(userInfoResponse);

                // 4. ready to create the local user account (if necessary) and jwt
                var user = await _userRepository.FindByEmail(userInfo.Email);
                if (user != null)
                {
                        var refreshToken = _tokenFactory.GenerateToken();
                        user.AddRefreshToken(refreshToken, user.Id, message.RemoteIpAddress);
                        await _userRepository.Update(user);

                        // generate access token
                        outputPort.Handle(new LoginResponse(await _jwtFactory.GenerateEncodedToken(user.IdentityId, user.UserName), refreshToken, true));
                        return true;
                }
                else
                {
                    var response = await _userRepository.Create(userInfo.FirstName, userInfo.LastName, userInfo.Email, userInfo.Name, "12345" ); //TODO дописать генерацию пароля
                    var refreshToken = _tokenFactory.GenerateToken();
                    user.AddRefreshToken(refreshToken, user.Id, message.RemoteIpAddress);
                    await _userRepository.Update(user);

                    // generate access token
                    outputPort.Handle(new LoginResponse(await _jwtFactory.GenerateEncodedToken(user.IdentityId, user.UserName), refreshToken, true));
                    return true;
                }
            }

            outputPort.Handle(new LoginResponse(new[] { new Error("login_failure", "Failure.") }));
            return false;
        }
    }
}
