using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace InpositionLibrary.Migrations
{
    /// <inheritdoc />
    public partial class user : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c7d20912-d88a-4599-8fdb-0a3f205baf3f");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f8fe50e6-2a8c-47c7-be4e-cf58ba3b755c");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "26f8012b-46e9-44a0-ba71-e5728eae20dd", null, "User", "USER" },
                    { "5d407922-ca34-4e7f-b3d7-a0d7cc933e90", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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
                    { "c7d20912-d88a-4599-8fdb-0a3f205baf3f", null, "Admin", "ADMIN" },
                    { "f8fe50e6-2a8c-47c7-be4e-cf58ba3b755c", null, "User", "USER" }
                });
        }
    }
}
