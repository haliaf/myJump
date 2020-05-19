using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.Api.Core.Interfaces.Shared;

namespace Web.Api.Models.Request
{
    public class CoordinateDto : ICoordinate
    {
        public decimal Longitude { get; set; }
        public decimal Latitude { get; set; }
    }
}
