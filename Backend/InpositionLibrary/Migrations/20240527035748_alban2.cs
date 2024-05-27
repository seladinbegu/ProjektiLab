﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InpositionLibrary.Migrations
{
    /// <inheritdoc />
    public partial class alban2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "NumriTelefonit",
                table: "Lexuesi",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "NumriTelefonit",
                table: "Lexuesi",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");
        }
    }
}
