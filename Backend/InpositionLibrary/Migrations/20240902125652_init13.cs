using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace InpositionLibrary.Migrations
{
    /// <inheritdoc />
    public partial class init13 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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
                    { "6493ae6a-174a-4e8b-a39d-aaab7f48fe1e", null, "User", "USER" },
                    { "81923ca3-a7aa-47ea-9483-f2033ae3f631", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6493ae6a-174a-4e8b-a39d-aaab7f48fe1e");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "81923ca3-a7aa-47ea-9483-f2033ae3f631");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "822e2c2c-4bde-42b8-bd88-b2ddb1884f6c", null, "User", "USER" },
                    { "8ba3a3c3-cf6b-431a-9fe3-052d361993ca", null, "Admin", "ADMIN" }
                });
        }
    }
}
