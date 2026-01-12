using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace pcstore.API.Migrations
{
    /// <inheritdoc />
    public partial class updatevailabilityoftheitem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Availability",
                table: "Items",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Availability",
                table: "Items");
        }
    }
}
