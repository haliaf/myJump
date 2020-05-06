using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Entity.User;

namespace myJump.Model
{
   
    public class Context : IdentityDbContext
    {
        public Context()
        {
        }
        public Context(DbContextOptions<Context> options)
            : base(options)
        {
            Database.EnsureCreated();           
        }
        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<Attribute> Attributes { get; set; }
        public virtual DbSet<UserAccount> UserAccounts { get; set; }
        public virtual DbSet<JobSeeker> JobSeekers { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<UserAccount>().HasData(
                new UserAccount
                {
                    Oid = Guid.NewGuid(),
                    FullName = "test2"
                });
            builder.Entity<Attribute>().HasData(
                new Attribute
                {
                    Id = 22,
                    Name = "test2"
                });
           builder.Entity<Product>().HasData(
                  new Product
                  {
                      Id = 22,
                      Name = "test2"
                  },
                new Product
                {
                    Id = 2,
                    Name = "test2"
                });
        }   
    }
}
