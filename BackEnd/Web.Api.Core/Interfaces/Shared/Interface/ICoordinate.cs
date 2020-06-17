using System;
using System.Collections.Generic;
using System.Text;

namespace Web.Api.Core.Interfaces.Shared
{
    public interface ICoordinate
    {
        string Longitude { get;  set; }
        string Latitude { get;  set; }
    }
}
