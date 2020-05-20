using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Threading.Tasks;
using Web.Api.Core.Dto.UseCaseRequests;
using Web.Api.Core.Interfaces.UseCases;
using Web.Api.Models.Request;
using Web.Api.Presenters;

namespace Web.Api.Controllers
{
    [Authorize(Policy = "ApiUser")]
    [Route("api/[controller]")]
    [ApiController]
    public class MapController : ControllerBase
    {
        private readonly MapEventPresenter _mapEventPresenter;
        private readonly IMapEventUseCase _mapEventUseCase;
        public MapController(MapEventPresenter mapEventPresenter, IMapEventUseCase mapEventUseCase)
        {
            _mapEventPresenter = mapEventPresenter;
            _mapEventUseCase = mapEventUseCase;
        }

        // GET api/protected/home
        [HttpPost("createMapEvent")]
        public async Task<ActionResult> CreateMapEvent([FromBody] MapEventRequestDto request)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }
            var user = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            await _mapEventUseCase.Handle(new MapEventUseCaseRequest(request.StartCoordinate, request.EndCoordinate), _mapEventPresenter);
            return _mapEventPresenter.ContentResult;
        }
    }
}
