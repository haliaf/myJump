using System.Threading.Tasks;
using Web.Api.Core.Domain.Entities;
using Web.Api.Core.Dto.GatewayResponses.Repositories;
using Web.Api.Core.Interfaces.Shared;
using Web.Api.Core.Interfaces.Shared.Interface;

namespace Web.Api.Core.Interfaces.Gateways.Repositories
{
    public interface ISignalRepository : IRepository<SignalData>
    {
        Task<CreateSignalDataResponse> Create(ISignal signal);

    }
}
