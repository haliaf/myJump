using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Web.Api.Core.Dto;
using Web.Api.Core.Dto.UseCaseRequests;
using Web.Api.Core.Dto.UseCaseResponses;
using Web.Api.Core.Interfaces;
using Web.Api.Core.Interfaces.Gateways.Repositories;
using Web.Api.Core.Interfaces.UseCases;

namespace Web.Api.Core.UseCases
{
    public sealed class AddUserProfileImagesUseCase : IAddUserProfileImagesUseCase
    {
        private readonly IUserRepository _userRepository;
        private readonly IHostingEnvironment _env;
       

        public AddUserProfileImagesUseCase(IUserRepository userRepository, IHostingEnvironment env)
        {
            _userRepository = userRepository;
            _env = env;
        
        }

        public async Task<bool> Handle(AddUserImagesRequest message, IOutputPort<AddUserImagesResponse> outputPort)
        {
            var webRoot = _env.ContentRootPath +@"\upload";
            var file = System.IO.Path.Combine(webRoot, Guid.NewGuid().ToString() + "_userImages.jpg");
            File.WriteAllBytes(file, Convert.FromBase64String(message.Base64Images));
            var userImagesPath = await _userRepository.AddUserProfileImages(file);
            outputPort.Handle(new AddUserImagesResponse(userImagesPath.ImagesPath, true));
            return true;
        }
    }
}
