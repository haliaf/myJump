using System.Linq;
using System.Net;
using Web.Api.Core.Dto.UseCaseResponses;
using Web.Api.Core.Interfaces;
using Web.Api.Serialization;

namespace Web.Api.Presenters
{
    public sealed class AddUserImagesPresenter : IOutputPort<AddUserImagesResponse>
    {
        public JsonContentResult ContentResult { get; }

        public AddUserImagesPresenter()
        {
            ContentResult = new JsonContentResult();
        }

        public void Handle(AddUserImagesResponse response)
        {
            ContentResult.StatusCode = (int)(response.Errors == null? HttpStatusCode.OK : HttpStatusCode.BadRequest);
            ContentResult.Content = JsonSerializer.SerializeObject(new AddUserImagesResponseDto(response));
        }
    }
}
