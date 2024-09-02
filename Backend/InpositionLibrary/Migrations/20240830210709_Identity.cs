using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace InpositionLibrary.Migrations
{
    /// <inheritdoc />
    public partial class Identity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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
                    { "666226ce-cb4e-4762-822c-42baa984708c", null, "User", "USER" },
                    { "8fc2417c-180e-4082-9681-49723bd2fd83", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "666226ce-cb4e-4762-822c-42baa984708c");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8fc2417c-180e-4082-9681-49723bd2fd83");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "829f3cc6-4ab4-4233-a7f8-54add7a676ec", null, "User", "USER" },
                    { "a0e478b7-98f2-4ac8-9025-5d59c17a6457", null, "Admin", "ADMIN" }
                });
        }
    }
}
