using System;
using System.Collections.Generic;
using System.Text;
using Web.Api.Core.Interfaces.Shared;
using Web.Api.Core.Shared;

namespace Web.Api.Core.Domain.Entities
{
    public class MapEvent : BaseEntity
    {
        public int? CreateUserId { get; set; }
        public DateTime? StartDateMapEvent { get; set; }
        public DateTime? EndDateMapEvent { get; set; }
        public Coordinate StartCoordinate { get; set; }
        public Coordinate StopCoordinate { get; set; }
        public ICollection<UserMapEvent> CurrentUsers { get; set; }

    }
}
