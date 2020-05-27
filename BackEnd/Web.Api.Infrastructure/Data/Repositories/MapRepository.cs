using System;
using System.Collections;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Web.Api.Core.Domain.Entities;
using Web.Api.Core.Dto;
using Web.Api.Core.Dto.GatewayResponses.Repositories;
using Web.Api.Core.Interfaces.Gateways.Repositories;
using Web.Api.Core.Interfaces.Shared;
using Web.Api.Core.Specifications;
using Web.Api.Infrastructure.Identity;


namespace Web.Api.Infrastructure.Data.Repositories
{
    internal sealed class MapRepository : EfRepository<MapEvent>, IMapRepository
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ICoordinateRepository _coordinateRepository;
        private readonly IMapper _mapper;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public MapRepository(UserManager<AppUser> userManager, IMapper mapper, AppDbContext appDbContext, ICoordinateRepository coordinateRepository, IHttpContextAccessor httpContextAccessor) : base(appDbContext)
        {
            _userManager = userManager;
            _coordinateRepository = coordinateRepository;
            _mapper = mapper;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<CreateMapEventResponse> Create(ICoordinate startCoordinate, ICoordinate endCoordinate)
        {
            var start = await _coordinateRepository.Create(startCoordinate);
            var end = await _coordinateRepository.Create(endCoordinate);
            var addMapEvent = new MapEvent {StartCoordinate = start.coordinate, StopCoordinate = end.coordinate };
            _appDbContext.MapEvents.Add(addMapEvent);
            await _appDbContext.SaveChangesAsync();
            return new CreateMapEventResponse(true, null);
        }

        public async Task<GetAllMapEventResponse> GetAll()
        {
            var retEnum =  _appDbContext.MapEvents
                                        .Include(s=> s.StopCoordinate)
                                        .Include(p => p.StartCoordinate)
                                        .Where(m => m.Id > 0).ToArray().AsEnumerable();
            return await Task.FromResult<GetAllMapEventResponse>(new GetAllMapEventResponse(retEnum, true, null)); 
        }
    }
}
