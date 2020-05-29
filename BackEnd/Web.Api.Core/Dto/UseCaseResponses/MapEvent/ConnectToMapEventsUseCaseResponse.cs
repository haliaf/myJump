using System.Collections.Generic;
using Web.Api.Core.Domain.Entities;
using Web.Api.Core.Interfaces;
using Web.Api.Core.Interfaces.Shared;

namespace Web.Api.Core.Dto.UseCaseResponses
{
    public class ConnectToMapEventsUseCaseResponse : UseCaseResponseMessage
    {
        public IEnumerable<Error> Errors { get; }

        public ConnectToMapEventsUseCaseResponse(IEnumerable<Error> errors, bool success = false, string message = null) : base(success, message)
        {
            Errors = errors;
        }


    }
}
