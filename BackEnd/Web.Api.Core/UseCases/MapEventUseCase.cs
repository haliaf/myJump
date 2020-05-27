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
    public sealed class MapEventUseCase : IMapEventUseCase
    {
        private readonly ICoordinateRepository _coordinateRepository;
        private readonly IMapRepository _mapRepository;

        public MapEventUseCase(ICoordinateRepository coordinateRepository, IMapRepository mapRepository)
        {
            _coordinateRepository = coordinateRepository;
            _mapRepository = mapRepository;
        }


        public async Task<bool> Handle(MapEventUseCaseRequest message, IOutputPort<MapEventUseCaseResponse> outputPort)
        {
            var startCoordinate =  await _coordinateRepository.Create(message.StartCoordinate);
            var endCoordinate = await _coordinateRepository.Create(message.EndCoordinate);
            await _mapRepository.Create(startCoordinate.coordinate, endCoordinate.coordinate);
            outputPort.Handle(new MapEventUseCaseResponse(null, true, "Map Event Create Complete"));
            return true;
        }
    }
}
