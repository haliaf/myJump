using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Web.Api.Core.Dto;
using Web.Api.Core.Dto.UseCaseRequests;
using Web.Api.Core.Dto.UseCaseResponses;
using Web.Api.Core.Interfaces;
using Web.Api.Core.Interfaces.Gateways.Repositories;
using Web.Api.Core.Interfaces.UseCases;
using static System.Net.Mime.MediaTypeNames;

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
            string webRoot = _env.ContentRootPath;
            int pos = webRoot.LastIndexOf('\\');
            webRoot = webRoot.Substring(0, pos) + @"\Main\upload";
            // var file = System.IO.Path.Combine(webRoot, Guid.NewGuid().ToString() + "_userImages.jpg");
            foreach (var formFile in message.files)
            {
                if (formFile.Length > 0)
                {
                    var fileName = Guid.NewGuid().ToString() + "_" + formFile.FileName;
                    var filePath = System.IO.Path.Combine(webRoot, fileName);

                    using (var stream = System.IO.File.Create(filePath))
                    {
                        await formFile.CopyToAsync(stream);
                        using (var image = new Bitmap(stream))
                        {
                            var resized = new Bitmap(20, 20);
                            using (var graphics = Graphics.FromImage(resized))
                            {
                                graphics.CompositingQuality = CompositingQuality.HighSpeed;
                                graphics.InterpolationMode = InterpolationMode.HighQualityBicubic;
                                graphics.CompositingMode = CompositingMode.SourceCopy;
                                graphics.DrawImage(image, 0, 0, 20, 20);
                                var resfilePath = System.IO.Path.Combine(webRoot, $"resized-{fileName}");
                                resized.Save(resfilePath, ImageFormat.Jpeg);
                            }
                        }
                    }
                    var userImagesPath = await _userRepository.AddUserProfileImages(fileName, message.currentUser);
                    outputPort.Handle(new AddUserImagesResponse(userImagesPath.ImagesPath, true));
                }
            }
        //    File.WriteAllBytes(file, Convert.FromBase64String(message.Base64Images));
            return true;
        }
    }
}
