using System.Threading.Tasks;
using Web.Api.Common.Services.Interface;
using Web.Api.Core.Dto;
using Web.Api.Core.Dto.UseCaseRequests;
using Web.Api.Core.Dto.UseCaseResponses;
using Web.Api.Core.Interfaces;
using Web.Api.Core.Interfaces.Gateways.Repositories;
using Web.Api.Core.Interfaces.Services;
using Web.Api.Core.Interfaces.UseCases;


namespace Web.Api.Core.UseCases
{
    public sealed class GetMapEventUseCase : IGetMapEventUseCase
    {
        private readonly ICoordinateRepository _coordinateRepository;
        private readonly IMapRepository _mapRepository;

        public GetMapEventUseCase(ICoordinateRepository coordinateRepository, IMapRepository mapRepository)
        {
            _coordinateRepository = coordinateRepository;
            _mapRepository = mapRepository;
        }

        public async Task<bool> Handle(GetMapEventsUseCaseRequest message, IOutputPort<GetMapEventUseCaseResponse> outputPort)
        {
            var coordinate = await _mapRepository.GetAll();
            outputPort.Handle(new GetMapEventUseCaseResponse(coordinate.MapEvents, null, true, "Map Event get all Complete"));
            return true;
        }
    }
}
