using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using Web.Api.Core.Dto.UseCaseResponses;
using Web.Api.Core.Interfaces;

namespace Web.Api.Core.Dto.UseCaseRequests
{
    public class AddUserImagesRequest : IUseCaseRequest<AddUserImagesResponse>
    {
        public IEnumerable<IFormFile> files { get; }
        public string currentUser { get;  }

    public AddUserImagesRequest(IEnumerable<IFormFile> fileArr, string usr)
        {
            files = fileArr;
            currentUser = usr;
        }
    }
}


