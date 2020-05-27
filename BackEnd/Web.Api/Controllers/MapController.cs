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
  //  [Authorize(Policy = "ApiUser")]
    [Route("api/[controller]")]
    [ApiController]
    public class MapController : ControllerBase
    {
        private readonly MapEventPresenter _mapEventPresenter;
        private readonly GetMapEventPresenter _getMapEventPresenter;
        private readonly IMapEventUseCase _mapEventUseCase;
        private readonly IGetMapEventUseCase _getMapEventUseCase;
        public MapController(GetMapEventPresenter getMapEventPresenter, MapEventPresenter mapEventPresenter, IMapEventUseCase mapEventUseCase, IGetMapEventUseCase getMapEventUseCase)
        {
            _mapEventPresenter = mapEventPresenter;
            _getMapEventPresenter = getMapEventPresenter;
            _mapEventUseCase = mapEventUseCase;
            _getMapEventUseCase = getMapEventUseCase;
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
        [HttpGet("getMapEvent")]
        public async Task<ActionResult> GetMapEvent()
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }
            await _getMapEventUseCase.Handle(new GetMapEventsUseCaseRequest(), _getMapEventPresenter);
            return _getMapEventPresenter.ContentResult;
        }
    }
}
