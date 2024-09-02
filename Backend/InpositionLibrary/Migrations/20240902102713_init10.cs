using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace InpositionLibrary.Migrations
{
    /// <inheritdoc />
    public partial class init10 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "804ea3fc-fdce-4f76-b10b-3c0765518387");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b153956e-9758-4970-92e6-404f2eec1f14");

            migrationBuilder.DropColumn(
                name: "Pika",
                table: "Libri");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "55ee64d1-3e99-4f08-9c37-b545f587e104", null, "Admin", "ADMIN" },
                    { "f6ec4bf8-e685-4996-8bd4-eb9d7cbd1d9c", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "55ee64d1-3e99-4f08-9c37-b545f587e104");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f6ec4bf8-e685-4996-8bd4-eb9d7cbd1d9c");

            migrationBuilder.AddColumn<string>(
                name: "Pika",
                table: "Libri",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "804ea3fc-fdce-4f76-b10b-3c0765518387", null, "Admin", "ADMIN" },
                    { "b153956e-9758-4970-92e6-404f2eec1f14", null, "User", "USER" }
                });
        }
    }
}
