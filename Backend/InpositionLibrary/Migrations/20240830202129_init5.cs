using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace InpositionLibrary.Migrations
{
    /// <inheritdoc />
    public partial class init5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "44c4b0b1-2cb4-4702-b4e2-033a95088d8a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8b23d6f1-3f21-41c2-add8-2c07a64d4f84");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "829f3cc6-4ab4-4233-a7f8-54add7a676ec", null, "User", "USER" },
                    { "a0e478b7-98f2-4ac8-9025-5d59c17a6457", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "829f3cc6-4ab4-4233-a7f8-54add7a676ec");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a0e478b7-98f2-4ac8-9025-5d59c17a6457");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "44c4b0b1-2cb4-4702-b4e2-033a95088d8a", null, "User", "USER" },
                    { "8b23d6f1-3f21-41c2-add8-2c07a64d4f84", null, "Admin", "ADMIN" }
                });
        }
    }
}
