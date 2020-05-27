using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Web.Api.Core.Domain.Entities;
using Web.Api.Core.Dto;
using Web.Api.Core.Dto.GatewayResponses;
using Web.Api.Core.Dto.GatewayResponses.Repositories;
using Web.Api.Core.Interfaces.Gateways.Repositories;
using Web.Api.Core.Interfaces.Shared;
using Web.Api.Core.Specifications;
using Web.Api.Infrastructure.Identity;


namespace Web.Api.Infrastructure.Data.Repositories
{
    internal sealed class CoordinateRepository : EfRepository<Coordinate>, ICoordinateRepository
    {
        public CoordinateRepository(AppDbContext appDbContext) : base(appDbContext)
        {
        }

        public async Task<CreateCoordinateResponse> Create(ICoordinate coordinate)
        {
            var addCoordinate = new Coordinate { Latitude = coordinate.Latitude, Longitude = coordinate.Longitude };
            _appDbContext.Coordinates.Add(addCoordinate);
            await _appDbContext.SaveChangesAsync();
            return new CreateCoordinateResponse(addCoordinate, true, null);
        }

    }

}
