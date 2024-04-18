using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace inpositionlibrary.Migrations
{
    /// <inheritdoc />
    public partial class BiblotekaMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Bibloteka",
                columns: table => new
                {
                    Pika = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Adresa = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Kontakti = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NumriPunetoreve = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bibloteka", x => x.Pika);
                });

            migrationBuilder.CreateTable(
                name: "Punetori",
                columns: table => new
                {
                    ID_Punetori = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Emri = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Mbarimi_iKontrates = table.Column<DateOnly>(type: "date", nullable: false),
                    Pozicioni = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Pika = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BiblotekaPika = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Punetori", x => x.ID_Punetori);
                    table.ForeignKey(
                        name: "FK_Punetori_Bibloteka_BiblotekaPika",
                        column: x => x.BiblotekaPika,
                        principalTable: "Bibloteka",
                        principalColumn: "Pika");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Punetori_BiblotekaPika",
                table: "Punetori",
                column: "BiblotekaPika");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Punetori");

            migrationBuilder.DropTable(
                name: "Bibloteka");
        }
    }
}
