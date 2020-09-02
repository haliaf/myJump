using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Web.Api.Common.Services.Interface;
using Web.Api.Core.Domain.Entities;
using Web.Api.Core.Dto;
using Web.Api.Core.Dto.GatewayResponses.Repositories;
using Web.Api.Core.Interfaces.Gateways.Repositories;
using Web.Api.Core.Specifications;
using Web.Api.Infrastructure.Identity;


namespace Web.Api.Infrastructure.Data.Repositories
{
    internal sealed class UserRepository : EfRepository<User>, IUserRepository
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IMapper _mapper;
        private readonly IUserContextFactory _userContextFactory;

        public UserRepository(UserManager<AppUser> userManager, IMapper mapper, AppDbContext appDbContext, IUserContextFactory userContextFactory) : base(appDbContext)
        {
            _userManager = userManager;
            _mapper = mapper;
            _userContextFactory = userContextFactory;
        }
       
        public async Task<CreateUserResponse> Create(string firstName, string lastName, string email, string userName, string password)
        {
            var appUser = new AppUser {Email = email, UserName = userName};
            var identityResult = await _userManager.CreateAsync(appUser, password);

            if (!identityResult.Succeeded) return new CreateUserResponse(appUser.Id, false,identityResult.Errors.Select(e => new Error(e.Code, e.Description)));
            var user = new User(firstName, lastName, appUser.Id, appUser.UserName);
            _appDbContext.Users.Add(user);
            await _appDbContext.SaveChangesAsync();

            return new CreateUserResponse(appUser.Id, identityResult.Succeeded, identityResult.Succeeded ? null : identityResult.Errors.Select(e => new Error(e.Code, e.Description)));
        }

        public async Task<User> FindByName(string userName)
        {
            var appUser = await _userManager.FindByNameAsync(userName);
            return appUser == null ? null : _mapper.Map(appUser, await GetSingleBySpec(new UserSpecification(appUser.Id)));
        }
        public async Task<User> FindByEmail(string email)
        {
            var appUser = await _userManager.FindByEmailAsync(email);
            return appUser == null ? null : _mapper.Map(appUser, await GetSingleBySpec(new UserSpecification(appUser.Id)));
        }

        public async Task<User> GetCurrentUser()
        {
            var userName = _userContextFactory.CreateUserContext().CurrentUserName;
            var appUser = await _userManager.FindByNameAsync(userName);
            return appUser == null ? null : _mapper.Map(appUser, await GetSingleBySpec(new UserSpecification(appUser.Id)));
        }
        public async Task<bool> CheckPassword(User user, string password)
        {
            return await _userManager.CheckPasswordAsync(_mapper.Map<AppUser>(user), password);
        }

        public async Task<AddUserProfileImagesRepositoryResponse> AddUserProfileImages(string imagesPath, string userName)
        {
            var user = _appDbContext.Users.Single(m => m.UserName == userName);
            user.AddUserProfileImages(imagesPath);
            await _appDbContext.SaveChangesAsync();
            return new AddUserProfileImagesRepositoryResponse(imagesPath);
        }
    }
}
