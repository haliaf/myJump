using AutoMapper;
using System.Collections.Generic;
using System.Linq;
using Web.Api.Core.Interfaces;
using Web.Api.Models.Dto;

namespace Web.Api.Core.Dto.UseCaseResponses
{
    public class GetMapEventResponseDto
    {
        public IEnumerable<Error> Errors { get; set; }
        public IEnumerable<MapEventDto> mapEvents { get; set; }
        public GetMapEventResponseDto(GetMapEventUseCaseResponse response)
        {
            Errors = response.Errors;
            mapEvents = response.StartMapEventsCoordinate.Select( m=> new MapEventDto
            {
                EndMapEvent = m.EndDateMapEvent,
                StartCoordinate = m.StartCoordinate,
                StartMapEvent = m.StartDateMapEvent,
                StopCoordinate = m.StopCoordinate,
                UserId = 1,
                Id = m.Id
            }).ToArray();
        }

    }

}
