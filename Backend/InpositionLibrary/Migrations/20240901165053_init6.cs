using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace InpositionLibrary.Migrations
{
    /// <inheritdoc />
    public partial class init6 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Punetori_Bibloteka_BiblotekaId",
                table: "Punetori");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "666226ce-cb4e-4762-822c-42baa984708c");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8fc2417c-180e-4082-9681-49723bd2fd83");

            migrationBuilder.AlterColumn<int>(
                name: "BiblotekaId",
                table: "Punetori",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "Libri",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Titulli = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Autori = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Burimi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Statusi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Pika = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BiblotekaId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Libri", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Libri_Bibloteka_BiblotekaId",
                        column: x => x.BiblotekaId,
                        principalTable: "Bibloteka",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "49703b43-3bf2-45ab-ae96-028f1ba4739e", null, "Admin", "ADMIN" },
                    { "4bee932d-47ee-47fc-b3cc-c2b684f4bb27", null, "User", "USER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Libri_BiblotekaId",
                table: "Libri",
                column: "BiblotekaId");

            migrationBuilder.AddForeignKey(
                name: "FK_Punetori_Bibloteka_BiblotekaId",
                table: "Punetori",
                column: "BiblotekaId",
                principalTable: "Bibloteka",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Punetori_Bibloteka_BiblotekaId",
                table: "Punetori");

            migrationBuilder.DropTable(
                name: "Libri");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "49703b43-3bf2-45ab-ae96-028f1ba4739e");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4bee932d-47ee-47fc-b3cc-c2b684f4bb27");

            migrationBuilder.AlterColumn<int>(
                name: "BiblotekaId",
                table: "Punetori",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "666226ce-cb4e-4762-822c-42baa984708c", null, "User", "USER" },
                    { "8fc2417c-180e-4082-9681-49723bd2fd83", null, "Admin", "ADMIN" }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Punetori_Bibloteka_BiblotekaId",
                table: "Punetori",
                column: "BiblotekaId",
                principalTable: "Bibloteka",
                principalColumn: "Id");
        }
    }
}
