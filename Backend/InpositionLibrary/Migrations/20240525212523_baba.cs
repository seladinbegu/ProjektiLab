using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InpositionLibrary.Migrations
{
    /// <inheritdoc />
    public partial class baba : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Autori_Libri_LibriId",
                table: "Autori");

            migrationBuilder.AddColumn<string>(
                name: "Burimi",
                table: "Libri",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "Statusi",
                table: "Libri",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AlterColumn<int>(
                name: "LibriId",
                table: "Autori",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Autori_Libri_LibriId",
                table: "Autori",
                column: "LibriId",
                principalTable: "Libri",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Autori_Libri_LibriId",
                table: "Autori");

            migrationBuilder.DropColumn(
                name: "Burimi",
                table: "Libri");

            migrationBuilder.DropColumn(
                name: "Statusi",
                table: "Libri");

            migrationBuilder.AlterColumn<int>(
                name: "LibriId",
                table: "Autori",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Autori_Libri_LibriId",
                table: "Autori",
                column: "LibriId",
                principalTable: "Libri",
                principalColumn: "Id");
        }
    }
}
