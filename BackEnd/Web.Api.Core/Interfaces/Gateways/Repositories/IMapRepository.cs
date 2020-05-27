using System.Threading.Tasks;
using Web.Api.Core.Domain.Entities;
using Web.Api.Core.Dto.GatewayResponses.Repositories;
using Web.Api.Core.Interfaces.Shared;

namespace Web.Api.Core.Interfaces.Gateways.Repositories
{
    public interface IMapRepository : IRepository<MapEvent>
    {
        Task<CreateMapEventResponse> Create(ICoordinate startCoordinate, ICoordinate endCoordinate);
        //временно получение всего и вся
        Task<GetAllMapEventResponse> GetAll();

    }
}
