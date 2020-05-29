using System.Threading.Tasks;
using Web.Api.Core.Dto.UseCaseRequests;
using Web.Api.Core.Dto.UseCaseResponses;
using Web.Api.Core.Interfaces;
using Web.Api.Core.Interfaces.Gateways.Repositories;
using Web.Api.Core.Interfaces.UseCases.MapEvent;

namespace Web.Api.Core.UseCases.MapEvent
{
    public sealed class ConnectToMapEventUseCase : IConnectToMapEventUseCase
    {
        private readonly IMapRepository _mapRepository;

        public ConnectToMapEventUseCase(IMapRepository mapRepository)
        {
            _mapRepository = mapRepository;
        }

        public async Task<bool> Handle(ConnectToMapEventsUseCaseRequest message, IOutputPort<ConnectToMapEventsUseCaseResponse> outputPort)
        {
            await _mapRepository.AddUserToMapEvent(message.mapEventId);
            outputPort.Handle(new ConnectToMapEventsUseCaseResponse(null, true, "Add user to map event complete"));
            return true;
        }
    }
}
