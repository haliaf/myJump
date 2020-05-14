using System;
using System.Collections.Generic;
using System.Text;
using Web.Api.Core.Interfaces.Shared;
using Web.Api.Core.Shared;

namespace Web.Api.Core.Domain.Entities
{
    public class MapEvent : BaseEntity
    {
        public int? UserId { get; set; }
        public User User { get; private set; }
        public DateTime? StartMapEvent { get; set; }
        public DateTime? EndMapEvent { get; set; }
        public Coordinate StartCoordinate { get; set; }
        public Coordinate StopCoordinate { get; set; }
    }
}
