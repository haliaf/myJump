using System.Collections.Generic;
using Web.Api.Core.Interfaces;

namespace Web.Api.Core.Dto.UseCaseResponses
{
    public class MapEventUseCaseResponse : UseCaseResponseMessage
    {
        public IEnumerable<Error> Errors { get; }

        public MapEventUseCaseResponse(IEnumerable<Error> errors, bool success = false, string message = null) : base(success, message)
        {
            Errors = errors;
        }


    }
}
