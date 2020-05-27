using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;
using Web.Api.Core.Interfaces.Shared;

namespace Web.Api.Models.Dto
{
    public class MapEventDto
    {
        [DataMember]
        public int? UserId { get; set; }
        public DateTime? StartMapEvent { get; set; }
        public DateTime? EndMapEvent { get; set; }
        [DataMember]
        public ICoordinate StartCoordinate { get; set; }
        [DataMember]
        public ICoordinate StopCoordinate { get; set; }
    }
}
