using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System.Security.Claims;
using System.Threading.Tasks;
using Web.Api.Core.Dto.UseCaseRequests;
using Web.Api.Core.Interfaces.UseCases;
using Web.Api.Core.Interfaces.UseCases.MapEvent;
using Web.Api.Hubs;
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
        private readonly ConnectToMapEventsPresenter _connectToMapEventsPresenter;
        private readonly IMapEventUseCase _mapEventUseCase;
        private readonly IConnectToMapEventUseCase _connectToMapEventUseCase;
        private readonly IGetMapEventUseCase _getMapEventUseCase;
        private readonly IHubContext<SignalHub> _hubContext;
        public MapController(IHubContext<SignalHub> hubContext, IConnectToMapEventUseCase connectToMapEventUseCase, ConnectToMapEventsPresenter connectToMapEventsPresenter, GetMapEventPresenter getMapEventPresenter, MapEventPresenter mapEventPresenter, IMapEventUseCase mapEventUseCase, IGetMapEventUseCase getMapEventUseCase)
        {
            _hubContext = hubContext;
            _connectToMapEventUseCase = connectToMapEventUseCase;
            _mapEventPresenter = mapEventPresenter;
            _getMapEventPresenter = getMapEventPresenter;
            _mapEventUseCase = mapEventUseCase;
            _getMapEventUseCase = getMapEventUseCase;
            _connectToMapEventsPresenter = connectToMapEventsPresenter;
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

        [HttpPut("connectToMapEvent")]
        public async Task<ActionResult> ConnectToMapEvent(ConnectToMapEventRequestDto mapEventDto)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }
            await _connectToMapEventUseCase.Handle(new ConnectToMapEventsUseCaseRequest(mapEventDto.MapEventId), _connectToMapEventsPresenter);
            await _hubContext.Clients.All.SendAsync("SignalMessage", "start");
            return _connectToMapEventsPresenter.ContentResult;
        }

        [HttpPut("startMapEvent")]
        public async Task<ActionResult> StartMapEvent(int id)
        {
            await _hubContext.Clients.All.SendAsync("SignalMessage", "start");
            return Ok();
        }
    }
}

