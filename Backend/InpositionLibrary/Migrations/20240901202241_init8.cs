using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace InpositionLibrary.Migrations
{
    /// <inheritdoc />
    public partial class init8 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "06cad0d0-8d6e-4739-8bfb-82e15ca4c560");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "fdbc4533-c570-4ec1-9c3b-7f443889e0e2");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "83ea467a-ea42-44f8-8359-621f6096fcf6", null, "Admin", "ADMIN" },
                    { "8e0d57a0-8692-48db-b8bd-0321f135ffe8", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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
                    { "06cad0d0-8d6e-4739-8bfb-82e15ca4c560", null, "Admin", "ADMIN" },
                    { "fdbc4533-c570-4ec1-9c3b-7f443889e0e2", null, "User", "USER" }
                });
        }
    }
}
