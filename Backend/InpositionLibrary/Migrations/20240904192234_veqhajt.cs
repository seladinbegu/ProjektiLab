using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace InpositionLibrary.Migrations
{
    /// <inheritdoc />
    public partial class veqhajt : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "26f8012b-46e9-44a0-ba71-e5728eae20dd");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5d407922-ca34-4e7f-b3d7-a0d7cc933e90");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "ab4171dd-a5e7-4c91-b7e6-e454f27c726a", null, "User", "USER" },
                    { "baa113b6-7801-4e6a-8937-0a782e53595f", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ab4171dd-a5e7-4c91-b7e6-e454f27c726a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "baa113b6-7801-4e6a-8937-0a782e53595f");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "26f8012b-46e9-44a0-ba71-e5728eae20dd", null, "User", "USER" },
                    { "5d407922-ca34-4e7f-b3d7-a0d7cc933e90", null, "Admin", "ADMIN" }
                });
        }
    }
}
