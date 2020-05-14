using System;
using Web.Api.Common.Services.Interface;

namespace Web.Api.Common.Services
{
    internal sealed class UserContext : IUserContext
    {
        public string CurrentUserName { get; }

        public UserContext(string userName)
        {
            if (userName == null)
                throw new ArgumentNullException(nameof(userName));

            CurrentUserName = userName;
        }

    }
}
