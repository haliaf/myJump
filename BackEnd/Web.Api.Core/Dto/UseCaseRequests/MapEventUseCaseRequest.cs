using Web.Api.Core.Dto.UseCaseResponses;
using Web.Api.Core.Interfaces;
using Web.Api.Core.Interfaces.Shared;

namespace Web.Api.Core.Dto.UseCaseRequests
{
    public class MapEventUseCaseRequest : IUseCaseRequest<MapEventUseCaseResponse>
    {
        public ICoordinate StartCoordinate { get; }
        public ICoordinate EndCoordinate { get; }

        public MapEventUseCaseRequest(ICoordinate startCoordinate, ICoordinate endCoordinate)
        {
            StartCoordinate = startCoordinate;
            EndCoordinate = endCoordinate;
        }
    }
}
