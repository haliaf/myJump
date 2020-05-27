using System.Collections.Generic;
using Web.Api.Core.Domain.Entities;

namespace Web.Api.Core.Dto.GatewayResponses.Repositories
{
  public sealed class GetAllMapEventResponse : BaseGatewayResponse
  {
    public IEnumerable<MapEvent> MapEvents { get; }
    public GetAllMapEventResponse(IEnumerable<MapEvent> mapEvent, bool success = false, IEnumerable<Error> errors = null) : base(success, errors)
        {
            MapEvents = mapEvent;
        }
  }
}
