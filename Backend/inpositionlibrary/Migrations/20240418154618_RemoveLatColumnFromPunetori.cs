using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace inpositionlibrary.Migrations
{
    /// <inheritdoc />
    public partial class RemoveLatColumnFromPunetori : Migration
    {
        /// <inheritdoc />
       protected override void Up(MigrationBuilder migrationBuilder)
{
    migrationBuilder.DropColumn(
        name: "Pika",
        table: "Punetori");
}


        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
