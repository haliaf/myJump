using System.Collections.Generic;
using Web.Api.Core.Interfaces;

namespace Web.Api.Core.Dto.UseCaseResponses
{
    public class AddUserImagesResponseDto
    {
        public string ImagesPath { get; set; }
        public IEnumerable<string> Errors { get; set; }

        public AddUserImagesResponseDto(AddUserImagesResponse currentResponse)
        {
            ImagesPath = currentResponse.ImagesPath;
            Errors = currentResponse.Errors;
        }

    }
}
