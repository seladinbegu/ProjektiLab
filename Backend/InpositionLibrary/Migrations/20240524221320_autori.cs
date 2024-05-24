using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InpositionLibrary.Migrations
{
    /// <inheritdoc />
    public partial class autori : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Autori",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Emri = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LibriId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Autori", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Autori_Libri_LibriId",
                        column: x => x.LibriId,
                        principalTable: "Libri",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Autori_LibriId",
                table: "Autori",
                column: "LibriId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Autori");
        }
    }
}
