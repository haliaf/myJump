using Web.Api.Core.Dto.UseCaseResponses;
using Web.Api.Core.Interfaces;

namespace Web.Api.Core.Dto.UseCaseRequests
{
    public class AddUserImagesRequest : IUseCaseRequest<AddUserImagesResponse>
    {
        public string Base64Images { get; }

        public AddUserImagesRequest(string base64Images)
        {
            Base64Images = base64Images;
        }
    }
}


