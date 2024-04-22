using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace inpositionlibrary.Migrations
{
    /// <inheritdoc />
    public partial class init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Punetori_Bibloteka_BiblotekaPika",
                table: "Punetori");

            migrationBuilder.DropIndex(
                name: "IX_Punetori_BiblotekaPika",
                table: "Punetori");

            migrationBuilder.DropColumn(
                name: "Pika",
                table: "Punetori");

            migrationBuilder.AlterColumn<DateTime>(
                name: "Mbarimi_iKontrates",
                table: "Punetori",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(DateOnly),
                oldType: "date");

            migrationBuilder.AlterColumn<string>(
                name: "BiblotekaPika",
                table: "Punetori",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateOnly>(
                name: "Mbarimi_iKontrates",
                table: "Punetori",
                type: "date",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AlterColumn<string>(
                name: "BiblotekaPika",
                table: "Punetori",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<string>(
                name: "Pika",
                table: "Punetori",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Punetori_BiblotekaPika",
                table: "Punetori",
                column: "BiblotekaPika");

            migrationBuilder.AddForeignKey(
                name: "FK_Punetori_Bibloteka_BiblotekaPika",
                table: "Punetori",
                column: "BiblotekaPika",
                principalTable: "Bibloteka",
                principalColumn: "Pika");
        }
    }
}
