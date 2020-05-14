using System;
using System.Collections.Generic;
using System.Text;

namespace Web.Api.Core.Interfaces.Shared
{
    public interface ICoordinate
    {
        decimal Longitude { get;  set; }
        decimal Latitude { get;  set; }
    }
}
