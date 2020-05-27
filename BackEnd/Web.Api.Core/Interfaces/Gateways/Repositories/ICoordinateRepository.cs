using System.Threading.Tasks;
using Web.Api.Core.Domain.Entities;
using Web.Api.Core.Dto.GatewayResponses;
using Web.Api.Core.Dto.GatewayResponses.Repositories;
using Web.Api.Core.Interfaces.Shared;

namespace Web.Api.Core.Interfaces.Gateways.Repositories
{
    public interface ICoordinateRepository : IRepository<Coordinate>
    {
        Task<CreateCoordinateResponse> Create(ICoordinate coordinate);
    }
}
