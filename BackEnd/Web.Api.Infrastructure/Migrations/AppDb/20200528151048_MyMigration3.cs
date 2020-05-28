using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Web.Api.Infrastructure.Migrations.AppDb
{
    public partial class MyMigration3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MapEvents_Users_UserId",
                table: "MapEvents");

            migrationBuilder.DropIndex(
                name: "IX_MapEvents_UserId",
                table: "MapEvents");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "MapEvents",
                newName: "CreateUserId");

            migrationBuilder.RenameColumn(
                name: "StartMapEvent",
                table: "MapEvents",
                newName: "StartDateMapEvent");

            migrationBuilder.RenameColumn(
                name: "EndMapEvent",
                table: "MapEvents",
                newName: "EndDateMapEvent");

            migrationBuilder.CreateTable(
                name: "UserMapEvents",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Created = table.Column<DateTime>(nullable: false),
                    Modified = table.Column<DateTime>(nullable: false),
                    CreatedUserId = table.Column<int>(nullable: true),
                    ModifiedUserId = table.Column<int>(nullable: true),
                    UserId = table.Column<int>(nullable: false),
                    MapEventId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserMapEvents", x => new { x.UserId, x.MapEventId });
                    table.UniqueConstraint("AK_UserMapEvents_Id", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserMapEvents_MapEvents_MapEventId",
                        column: x => x.MapEventId,
                        principalTable: "MapEvents",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserMapEvents_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserMapEvents_MapEventId",
                table: "UserMapEvents",
                column: "MapEventId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserMapEvents");

            migrationBuilder.RenameColumn(
                name: "StartDateMapEvent",
                table: "MapEvents",
                newName: "StartMapEvent");

            migrationBuilder.RenameColumn(
                name: "EndDateMapEvent",
                table: "MapEvents",
                newName: "EndMapEvent");

            migrationBuilder.RenameColumn(
                name: "CreateUserId",
                table: "MapEvents",
                newName: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_MapEvents_UserId",
                table: "MapEvents",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_MapEvents_Users_UserId",
                table: "MapEvents",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
