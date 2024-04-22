using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace inpositionlibrary.Migrations
{
    /// <inheritdoc />
    public partial class v2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Punetori",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Emri = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Mbarimi_iKontrates = table.Column<DateOnly>(type: "date", nullable: false),
                    Pozita = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BiblotekaPika = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Punetori", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Punetori_Bibloteka_BiblotekaPika",
                        column: x => x.BiblotekaPika,
                        principalTable: "Bibloteka",
                        principalColumn: "Pika",
                        onDelete: ReferentialAction.Cascade);
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
        }
    }
}
