using System.Collections.Generic;
using Web.Api.Core.Interfaces;

namespace Web.Api.Core.Dto.UseCaseResponses
{
    public class CurrentUserResponse : UseCaseResponseMessage
    {
        public string FirstName { get; }
        public string LastName { get; }
        public string Email { get; }
        public IEnumerable<string> Errors {  get; }

        public CurrentUserResponse(IEnumerable<string> errors, bool success=false, string message=null) : base(success, message)
        {
            Errors = errors;
        }

        public CurrentUserResponse(string email, string firstName, string lastName, bool success = false, string message = null) : base(success, message)
        {
            FirstName = firstName;
            LastName = lastName;
            Email = email;
        }
    }
}
