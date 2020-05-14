using Microsoft.AspNetCore.Http;
using Web.Api.Common.Services.Interface;

namespace Web.Api.Common.Services
{
    public sealed class HttpUserContextFactory : IUserContextFactory
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private IUserContext _userContext;

        public HttpUserContextFactory(
            IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

       public bool CanUse => true;

        public IUserContext CreateUserContext()
        {
            _userContext = GetUserContextAsync();
            return _userContext;
        }

        private IUserContext GetUserContextAsync()
        {
            return new UserContext(_httpContextAccessor.HttpContext.User.Identity.Name);
        }
    }
}
