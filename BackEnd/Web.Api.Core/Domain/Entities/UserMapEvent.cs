using System;
using System.Collections.Generic;
using System.Text;
using Web.Api.Core.Shared;

namespace Web.Api.Core.Domain.Entities
{
   public class UserMapEvent: BaseEntity
    {
        public int UserId { get; set; }
        public User User { get; set; }
        public int MapEventId { get; set; }
        public MapEvent MapEvent { get; set; }
    }
}
