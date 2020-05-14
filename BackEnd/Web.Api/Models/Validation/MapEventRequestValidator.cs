using FluentValidation;
using Web.Api.Models.Request;

namespace Web.Api.Models.Validation
{
    public class MapEventRequestValidator : AbstractValidator<MapEventRequestDto>
    {
        public MapEventRequestValidator()
        {
            RuleFor(x => x.StartCoordinate).NotEmpty();
            RuleFor(x => x.EndCoordinate).NotEmpty();
        }
    }
}
