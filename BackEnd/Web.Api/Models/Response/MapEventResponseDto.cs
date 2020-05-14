using System.Collections.Generic;
using Web.Api.Core.Interfaces;

namespace Web.Api.Core.Dto.UseCaseResponses
{
    public class MapEventResponseDto
    {
        public IEnumerable<Error> Errors { get; set; }

        public MapEventResponseDto(MapEventUseCaseResponse response)
        {
            Errors = response.Errors;
        }

    }
}
