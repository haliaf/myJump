using System.Threading.Tasks;
using Web.Api.Core.Domain.Entities;
using Web.Api.Core.Dto.GatewayResponses.Repositories;
using Web.Api.Core.Interfaces.Gateways.Repositories;
using Web.Api.Core.Interfaces.Shared.Interface;

namespace Web.Api.Infrastructure.Data.Repositories
{
    internal sealed class SignalDataRepository : EfRepository<SignalData>, ISignalRepository
    {
        private readonly IUserRepository _userRepository;

        public SignalDataRepository(IUserRepository userRepository, AppDbContext appDbContext) : base(appDbContext)
        {
            _userRepository = userRepository;
        }

        public async Task<CreateSignalDataResponse> Create(ISignal signal)
        {
            var user = await _userRepository.GetCurrentUser();
            var addSignal = new SignalData(signal.SignalId, signal.Zone);
            addSignal.AddUser(user.Id);
            _appDbContext.SignalsData.Add(addSignal);
            await _appDbContext.SaveChangesAsync();
            return new CreateSignalDataResponse(true);
        }
    }
}
