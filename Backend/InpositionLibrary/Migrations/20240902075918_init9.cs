using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace InpositionLibrary.Migrations
{
    /// <inheritdoc />
    public partial class init9 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "83ea467a-ea42-44f8-8359-621f6096fcf6");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8e0d57a0-8692-48db-b8bd-0321f135ffe8");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "804ea3fc-fdce-4f76-b10b-3c0765518387", null, "Admin", "ADMIN" },
                    { "b153956e-9758-4970-92e6-404f2eec1f14", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "804ea3fc-fdce-4f76-b10b-3c0765518387");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b153956e-9758-4970-92e6-404f2eec1f14");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "83ea467a-ea42-44f8-8359-621f6096fcf6", null, "Admin", "ADMIN" },
                    { "8e0d57a0-8692-48db-b8bd-0321f135ffe8", null, "User", "USER" }
                });
        }
    }
}
