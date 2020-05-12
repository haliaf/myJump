using System.Collections.Generic;
using Web.Api.Core.Interfaces;

namespace Web.Api.Core.Dto.UseCaseResponses
{
    public class CurrentUserResponseDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string UserProfileImages { get; set; }
        public IEnumerable<string> Errors { get; set; }

        public CurrentUserResponseDto(CurrentUserResponse currentUserResponse)
        {
            FirstName = currentUserResponse.FirstName;
            LastName = currentUserResponse.LastName;
            Email = currentUserResponse.Email;
            Errors = currentUserResponse.Errors;
            UserProfileImages = currentUserResponse.UserProfileImages;
        }

    }
}
