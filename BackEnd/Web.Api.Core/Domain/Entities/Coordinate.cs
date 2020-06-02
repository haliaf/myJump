using System;
using System.Collections.Generic;
using System.Text;
using Web.Api.Core.Interfaces.Shared;
using Web.Api.Core.Shared;

namespace Web.Api.Core.Domain.Entities
{
    public class Coordinate : BaseEntity, ICoordinate
    {
        public string Longitude { get; set; }
        public string Latitude { get; set; }
    }
}
