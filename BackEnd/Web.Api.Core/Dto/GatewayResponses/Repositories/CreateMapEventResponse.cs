using System.Collections.Generic;

namespace Web.Api.Core.Dto.GatewayResponses.Repositories
{
  public sealed class CreateMapEventResponse : BaseGatewayResponse
  {
    public CreateMapEventResponse(bool success = false, IEnumerable<Error> errors = null) : base(success, errors)
        {

        }
  }
}
