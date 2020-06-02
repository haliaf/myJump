﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Web.Api.Infrastructure.Data;

namespace Web.Api.Infrastructure.Migrations.AppDb
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20200529125239_MyMigration4")]
    partial class MyMigration4
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.0-preview2-35157")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Web.Api.Core.Domain.Entities.Coordinate", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("Created");

                    b.Property<int?>("CreatedUserId");

                    b.Property<string>("Latitude");

                    b.Property<string>("Longitude");

                    b.Property<DateTime>("Modified");

                    b.Property<int?>("ModifiedUserId");

                    b.HasKey("Id");

                    b.ToTable("Coordinates");
                });

            modelBuilder.Entity("Web.Api.Core.Domain.Entities.MapEvent", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("CreateUserId");

                    b.Property<DateTime>("Created");

                    b.Property<int?>("CreatedUserId");

                    b.Property<DateTime?>("EndDateMapEvent");

                    b.Property<DateTime>("Modified");

                    b.Property<int?>("ModifiedUserId");

                    b.Property<int?>("StartCoordinateId");

                    b.Property<DateTime?>("StartDateMapEvent");

                    b.Property<int?>("StopCoordinateId");

                    b.HasKey("Id");

                    b.HasIndex("StartCoordinateId");

                    b.HasIndex("StopCoordinateId");

                    b.ToTable("MapEvents");
                });

            modelBuilder.Entity("Web.Api.Core.Domain.Entities.RefreshToken", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("Created");

                    b.Property<int?>("CreatedUserId");

                    b.Property<DateTime>("Expires");

                    b.Property<DateTime>("Modified");

                    b.Property<int?>("ModifiedUserId");

                    b.Property<string>("RemoteIpAddress");

                    b.Property<string>("Token");

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("RefreshTokens");
                });

            modelBuilder.Entity("Web.Api.Core.Domain.Entities.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("Created");

                    b.Property<int?>("CreatedUserId");

                    b.Property<string>("FirstName");

                    b.Property<string>("IdentityId");

                    b.Property<string>("LastName");

                    b.Property<DateTime>("Modified");

                    b.Property<int?>("ModifiedUserId");

                    b.Property<string>("UserName");

                    b.Property<string>("UserProfileImages");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Web.Api.Core.Domain.Entities.UserMapEvent", b =>
                {
                    b.Property<int>("UserId");

                    b.Property<int>("MapEventId");

                    b.Property<DateTime>("Created");

                    b.Property<int?>("CreatedUserId");

                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("Modified");

                    b.Property<int?>("ModifiedUserId");

                    b.HasKey("UserId", "MapEventId");

                    b.HasAlternateKey("Id");

                    b.HasIndex("MapEventId");

                    b.ToTable("UserMapEvents");
                });

            modelBuilder.Entity("Web.Api.Core.Domain.Entities.MapEvent", b =>
                {
                    b.HasOne("Web.Api.Core.Domain.Entities.Coordinate", "StartCoordinate")
                        .WithMany()
                        .HasForeignKey("StartCoordinateId");

                    b.HasOne("Web.Api.Core.Domain.Entities.Coordinate", "StopCoordinate")
                        .WithMany()
                        .HasForeignKey("StopCoordinateId");
                });

            modelBuilder.Entity("Web.Api.Core.Domain.Entities.RefreshToken", b =>
                {
                    b.HasOne("Web.Api.Core.Domain.Entities.User")
                        .WithMany("RefreshTokens")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Web.Api.Core.Domain.Entities.UserMapEvent", b =>
                {
                    b.HasOne("Web.Api.Core.Domain.Entities.MapEvent", "MapEvent")
                        .WithMany("CurrentUsers")
                        .HasForeignKey("MapEventId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Web.Api.Core.Domain.Entities.User", "User")
                        .WithMany("MapEvents")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
