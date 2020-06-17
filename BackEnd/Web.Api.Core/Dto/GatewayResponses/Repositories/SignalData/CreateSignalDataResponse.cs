using System.Collections.Generic;
using Web.Api.Core.Domain.Entities;
using Web.Api.Core.Interfaces.Shared.Interface;

namespace Web.Api.Core.Dto.GatewayResponses.Repositories
{
    public sealed class CreateSignalDataResponse : BaseGatewayResponse
    {
        public CreateSignalDataResponse(bool success = false, IEnumerable<Error> errors = null) : base(success, errors)
        {

        }
    }
}
