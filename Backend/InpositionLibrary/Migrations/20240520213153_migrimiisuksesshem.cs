using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InpositionLibrary.Migrations
{
    /// <inheritdoc />
    public partial class migrimiisuksesshem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Libri",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Titulli = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Autori = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Pika = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BiblotekaPika = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Libri", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Libri_Bibloteka_BiblotekaPika",
                        column: x => x.BiblotekaPika,
                        principalTable: "Bibloteka",
                        principalColumn: "Pika");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Libri_BiblotekaPika",
                table: "Libri",
                column: "BiblotekaPika");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Libri");
        }
    }
}
