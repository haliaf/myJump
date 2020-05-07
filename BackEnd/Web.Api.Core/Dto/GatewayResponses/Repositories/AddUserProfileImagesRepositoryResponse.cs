using System.Collections.Generic;

namespace Web.Api.Core.Dto.GatewayResponses.Repositories
{
    public sealed class AddUserProfileImagesRepositoryResponse : BaseGatewayResponse
    {
        public string ImagesPath { get; }
        public AddUserProfileImagesRepositoryResponse(string imagesPath, bool success = false, IEnumerable<Error> errors = null) : base(success, errors)
        {
            ImagesPath = imagesPath;
        }
    }
}
