using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace InpositionLibrary.Migrations
{
    /// <inheritdoc />
    public partial class init16 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "af60fc7e-2aa7-4881-9928-ea780a29183a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ef76585f-bc85-4b49-b3e9-02337c883e2c");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1e81d710-4c1c-4fd9-a187-ba45252efbe5", null, "User", "USER" },
                    { "8c0203e7-e7b6-4301-99ec-b318a06cb55f", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1e81d710-4c1c-4fd9-a187-ba45252efbe5");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8c0203e7-e7b6-4301-99ec-b318a06cb55f");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "af60fc7e-2aa7-4881-9928-ea780a29183a", null, "Admin", "ADMIN" },
                    { "ef76585f-bc85-4b49-b3e9-02337c883e2c", null, "User", "USER" }
                });
        }
    }
}
