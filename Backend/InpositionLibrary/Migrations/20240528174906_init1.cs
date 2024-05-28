using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InpositionLibrary.Migrations
{
    /// <inheritdoc />
    public partial class init1 : Migration
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
                    Kontakti = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bibloteka", x => x.Pika);
                });

            migrationBuilder.CreateTable(
                name: "Lexuesi",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Emri = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EmriPerdoruesit = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Fjalekalimi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NumriTelefonit = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BiblotekaPika = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Lexuesi", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Lexuesi_Bibloteka_BiblotekaPika",
                        column: x => x.BiblotekaPika,
                        principalTable: "Bibloteka",
                        principalColumn: "Pika");
                });

            migrationBuilder.CreateTable(
                name: "Punetori",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Emri = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Pozita = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Pika = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BiblotekaPika = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Punetori", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Punetori_Bibloteka_BiblotekaPika",
                        column: x => x.BiblotekaPika,
                        principalTable: "Bibloteka",
                        principalColumn: "Pika");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Lexuesi_BiblotekaPika",
                table: "Lexuesi",
                column: "BiblotekaPika");

            migrationBuilder.CreateIndex(
                name: "IX_Punetori_BiblotekaPika",
                table: "Punetori",
                column: "BiblotekaPika");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Lexuesi");

            migrationBuilder.DropTable(
                name: "Punetori");

            migrationBuilder.DropTable(
                name: "Bibloteka");
        }
    }
}
