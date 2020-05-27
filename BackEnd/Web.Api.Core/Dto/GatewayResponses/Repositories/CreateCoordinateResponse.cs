using System.Collections.Generic;
using Web.Api.Core.Domain.Entities;
using Web.Api.Core.Interfaces.Shared;

namespace Web.Api.Core.Dto.GatewayResponses.Repositories
{
  public sealed class CreateCoordinateResponse : BaseGatewayResponse
  {
    public Coordinate coordinate { get; set; }
    public CreateCoordinateResponse(Coordinate coord, bool success = false, IEnumerable<Error> errors = null) : base(success, errors)
        {
            coordinate = coord;
        }
  }
}
