using System;
using Web.Api.Core.Interfaces.Shared.Interface;
using Web.Api.Core.Shared;

namespace Web.Api.Core.Domain.Entities
{
    public class SignalData : BaseEntity, ISignal
    {
        public int SignalId { get; set; }
        public string Zone { get; set; }
        public DateTime SignalDate { get; set; }
        internal SignalData(int signalId, string zone)
        {
            SignalDate = DateTime.UtcNow;
            SignalId = signalId;
            Zone = zone;
        }
        public void AddUser(int userId)
        {
            CreatedUserId = userId;
        }
    }
}
