using Web.Api.Core.Dto.GatewayResponses.Repositories;
using Web.Api.Core.Dto.UseCaseResponses;
using Web.Api.Core.Interfaces;

namespace Web.Api.Core.Dto.UseCaseRequests
{
    public class ConnectToMapEventsUseCaseRequest : IUseCaseRequest<ConnectToMapEventsUseCaseResponse>
    {
        public int mapEventId { get; }
        public ConnectToMapEventsUseCaseRequest(int eventId)
        {
            mapEventId = eventId;
        }
    }
}
