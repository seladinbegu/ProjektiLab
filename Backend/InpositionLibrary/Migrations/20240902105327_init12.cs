using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace InpositionLibrary.Migrations
{
    /// <inheritdoc />
    public partial class init12 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9f40eb1c-4e3a-4888-927f-c90945e64e00");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c9ddc3c2-8001-46b0-9cb8-3b1ddff1d9e5");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "822e2c2c-4bde-42b8-bd88-b2ddb1884f6c", null, "User", "USER" },
                    { "8ba3a3c3-cf6b-431a-9fe3-052d361993ca", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "822e2c2c-4bde-42b8-bd88-b2ddb1884f6c");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8ba3a3c3-cf6b-431a-9fe3-052d361993ca");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "9f40eb1c-4e3a-4888-927f-c90945e64e00", null, "Admin", "ADMIN" },
                    { "c9ddc3c2-8001-46b0-9cb8-3b1ddff1d9e5", null, "User", "USER" }
                });
        }
    }
}
