

using Web.Api.Core.Interfaces.Shared;

namespace Web.Api.Models.Request
{
    public class MapEventRequestDto
    {
        public CoordinateDto StartCoordinate { get; set; }
        public CoordinateDto EndCoordinate { get; set; }
    }

}
