using System.Collections.Generic;
using Web.Api.Core.Interfaces;

namespace Web.Api.Core.Dto.UseCaseResponses
{
    public class AddUserImagesResponse : UseCaseResponseMessage
    {
        public string ImagesPath { get; }
        public IEnumerable<string> Errors {  get; }

        public AddUserImagesResponse(IEnumerable<string> errors, bool success=false, string message=null) : base(success, message)
        {
            Errors = errors;
        }

        public AddUserImagesResponse(string imagesPath, bool success = false, string message = null) : base(success, message)
        {
            ImagesPath = ImagesPath;
        }
    }
}
