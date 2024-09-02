using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace InpositionLibrary.Migrations
{
    /// <inheritdoc />
    public partial class init7 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "49703b43-3bf2-45ab-ae96-028f1ba4739e");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4bee932d-47ee-47fc-b3cc-c2b684f4bb27");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "06cad0d0-8d6e-4739-8bfb-82e15ca4c560", null, "Admin", "ADMIN" },
                    { "fdbc4533-c570-4ec1-9c3b-7f443889e0e2", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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
                    { "49703b43-3bf2-45ab-ae96-028f1ba4739e", null, "Admin", "ADMIN" },
                    { "4bee932d-47ee-47fc-b3cc-c2b684f4bb27", null, "User", "USER" }
                });
        }
    }
}
