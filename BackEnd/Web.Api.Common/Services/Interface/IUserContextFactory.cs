namespace Web.Api.Common.Services.Interface
{
    public interface IUserContextFactory
    {
        IUserContext CreateUserContext();
        bool CanUse { get; }
    }
}
