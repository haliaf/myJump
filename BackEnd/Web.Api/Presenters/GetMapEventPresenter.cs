using System.Linq;
using System.Net;
using Web.Api.Core.Dto.UseCaseResponses;
using Web.Api.Core.Interfaces;
using Web.Api.Serialization;

namespace Web.Api.Presenters
{
    public sealed class GetMapEventPresenter : IOutputPort<GetMapEventUseCaseResponse>
    {
        public JsonContentResult ContentResult { get; }

        public GetMapEventPresenter()
        {
            ContentResult = new JsonContentResult();
        }

        public void Handle(GetMapEventUseCaseResponse response)
        {
            ContentResult.StatusCode = (int)(response.Errors == null? HttpStatusCode.OK : HttpStatusCode.BadRequest);
            ContentResult.Content = JsonSerializer.SerializeObject(new GetMapEventResponseDto(response));
        }
    }
}
