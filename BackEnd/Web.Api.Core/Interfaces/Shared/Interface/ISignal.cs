using System;
using System.Collections.Generic;
using System.Text;

namespace Web.Api.Core.Interfaces.Shared.Interface
{
    public interface ISignal
    {
        int SignalId { get; set; }
        string Zone { get; set; }
        DateTime SignalDate { get; set; }
    }
}
