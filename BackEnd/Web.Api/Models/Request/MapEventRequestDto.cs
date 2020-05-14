

using Web.Api.Core.Interfaces.Shared;

namespace Web.Api.Models.Request
{
    public class MapEventRequestDto
    {
        public ICoordinate StartCoordinate { get; set; }
        public ICoordinate EndCoordinate { get; set; }
    }
}
