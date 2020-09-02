using Web.Api.Core.Dto.UseCaseResponses;
using Web.Api.Core.Interfaces;

namespace Web.Api.Core.Dto.UseCaseRequests
{
    public class FaceBookLoginRequest : IUseCaseRequest<LoginResponse>
    {
        public string AccessToken { get; }

        public string RemoteIpAddress { get; }

        public FaceBookLoginRequest(string accessToken, string remoteIpAddress)
        {
            AccessToken = accessToken;
            RemoteIpAddress = remoteIpAddress;
        }
    }
}
