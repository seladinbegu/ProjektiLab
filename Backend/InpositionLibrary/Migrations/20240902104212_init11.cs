using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace InpositionLibrary.Migrations
{
    /// <inheritdoc />
    public partial class init11 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "55ee64d1-3e99-4f08-9c37-b545f587e104");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f6ec4bf8-e685-4996-8bd4-eb9d7cbd1d9c");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "9f40eb1c-4e3a-4888-927f-c90945e64e00", null, "Admin", "ADMIN" },
                    { "c9ddc3c2-8001-46b0-9cb8-3b1ddff1d9e5", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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
                    { "55ee64d1-3e99-4f08-9c37-b545f587e104", null, "Admin", "ADMIN" },
                    { "f6ec4bf8-e685-4996-8bd4-eb9d7cbd1d9c", null, "User", "USER" }
                });
        }
    }
}
