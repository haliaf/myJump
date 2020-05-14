using System;
using System.Collections.Generic;
using System.Text;
using Web.Api.Core.Interfaces.Shared;
using Web.Api.Core.Shared;

namespace Web.Api.Core.Domain.Entities
{
    public class Coordinate : BaseEntity, ICoordinate
    {
        public decimal Longitude { get; set; }
        public decimal Latitude { get; set; }
    }
}
