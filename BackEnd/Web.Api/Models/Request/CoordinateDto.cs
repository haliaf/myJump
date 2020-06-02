using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.Api.Core.Interfaces.Shared;

namespace Web.Api.Models.Request
{
    public class CoordinateDto : ICoordinate
    {
        public string Longitude { get; set; }
        public string Latitude { get; set; }
    }
}
