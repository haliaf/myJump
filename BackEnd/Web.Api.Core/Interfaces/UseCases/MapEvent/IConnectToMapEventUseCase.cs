using Web.Api.Core.Dto.UseCaseRequests;
using Web.Api.Core.Dto.UseCaseResponses;

namespace Web.Api.Core.Interfaces.UseCases.MapEvent
{
    public interface IConnectToMapEventUseCase : IUseCaseRequestHandler<ConnectToMapEventsUseCaseRequest, ConnectToMapEventsUseCaseResponse>
    {
    }
}
