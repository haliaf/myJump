using System.Collections.Generic;
using Web.Api.Core.Domain.Entities;
using Web.Api.Core.Interfaces;
using Web.Api.Core.Interfaces.Shared;

namespace Web.Api.Core.Dto.UseCaseResponses
{
    public class GetMapEventUseCaseResponse : UseCaseResponseMessage
    {
        public IEnumerable<Error> Errors { get; }
        public IEnumerable<MapEvent> StartMapEventsCoordinate { get; }


        public GetMapEventUseCaseResponse(IEnumerable<MapEvent>  mapEvents, IEnumerable<Error> errors, bool success = false, string message = null) : base(success, message)
        {
            Errors = errors;
            StartMapEventsCoordinate = mapEvents;
        }


    }
}
