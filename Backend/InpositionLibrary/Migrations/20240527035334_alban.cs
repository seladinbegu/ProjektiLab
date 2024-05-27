using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InpositionLibrary.Migrations
{
    /// <inheritdoc />
    public partial class alban : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Lexuesi",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Emri = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EmriPerdoruesit = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Fjalekalimi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NumriTelefonit = table.Column<int>(type: "int", nullable: false),
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

            migrationBuilder.CreateIndex(
                name: "IX_Lexuesi_BiblotekaPika",
                table: "Lexuesi",
                column: "BiblotekaPika");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Lexuesi");
        }
    }
}
