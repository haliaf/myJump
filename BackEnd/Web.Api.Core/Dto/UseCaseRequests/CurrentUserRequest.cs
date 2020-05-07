using Web.Api.Core.Dto.UseCaseResponses;
using Web.Api.Core.Interfaces;

namespace Web.Api.Core.Dto.UseCaseRequests
{
  public class CurrentUserRequest : IUseCaseRequest<CurrentUserResponse>
  {

    public string UserName { get; }

    public CurrentUserRequest(string userName)
    {
      UserName = userName;

    }
  }
}
