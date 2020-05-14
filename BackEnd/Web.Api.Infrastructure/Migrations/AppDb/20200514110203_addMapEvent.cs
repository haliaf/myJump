using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Web.Api.Infrastructure.Migrations.AppDb
{
    public partial class addMapEvent : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Coordinates",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Created = table.Column<DateTime>(nullable: false),
                    Modified = table.Column<DateTime>(nullable: false),
                    Longitude = table.Column<decimal>(nullable: false),
                    Latitude = table.Column<decimal>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Coordinates", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MapEvents",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Created = table.Column<DateTime>(nullable: false),
                    Modified = table.Column<DateTime>(nullable: false),
                    UserId = table.Column<int>(nullable: true),
                    StartMapEvent = table.Column<DateTime>(nullable: true),
                    EndMapEvent = table.Column<DateTime>(nullable: true),
                    StartCoordinateId = table.Column<int>(nullable: true),
                    StopCoordinateId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MapEvents", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MapEvents_Coordinates_StartCoordinateId",
                        column: x => x.StartCoordinateId,
                        principalTable: "Coordinates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_MapEvents_Coordinates_StopCoordinateId",
                        column: x => x.StopCoordinateId,
                        principalTable: "Coordinates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_MapEvents_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MapEvents_StartCoordinateId",
                table: "MapEvents",
                column: "StartCoordinateId");

            migrationBuilder.CreateIndex(
                name: "IX_MapEvents_StopCoordinateId",
                table: "MapEvents",
                column: "StopCoordinateId");

            migrationBuilder.CreateIndex(
                name: "IX_MapEvents_UserId",
                table: "MapEvents",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MapEvents");

            migrationBuilder.DropTable(
                name: "Coordinates");
        }
    }
}
