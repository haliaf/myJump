using Newtonsoft.Json;

using Web.Api.Models.Request.Auth.Facebook;

namespace Web.Api.Models.Request.Auth
{
    public class FacebookUserAccessTokenValidation
    {
        public FacebookUserAccessTokenData Data { get; set; }
    }

    public class FacebookAppAccessToken
    {
        [JsonProperty("token_type")]
        public string TokenType { get; set; }
        [JsonProperty("access_token")]
        public string AccessToken { get; set; }
    }
}
