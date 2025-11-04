using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace pcstore.API.Migrations
{
    /// <inheritdoc />
    public partial class Fix_Item_ItemSpecifications_Relationship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ItemsSpecification_Items_ItemId",
                table: "ItemsSpecification");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ItemsSpecification",
                table: "ItemsSpecification");

            migrationBuilder.RenameTable(
                name: "ItemsSpecification",
                newName: "ItemsSpecifications");

            migrationBuilder.RenameIndex(
                name: "IX_ItemsSpecification_ItemId",
                table: "ItemsSpecifications",
                newName: "IX_ItemsSpecifications_ItemId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ItemsSpecifications",
                table: "ItemsSpecifications",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ItemsSpecifications_Items_ItemId",
                table: "ItemsSpecifications",
                column: "ItemId",
                principalTable: "Items",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ItemsSpecifications_Items_ItemId",
                table: "ItemsSpecifications");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ItemsSpecifications",
                table: "ItemsSpecifications");

            migrationBuilder.RenameTable(
                name: "ItemsSpecifications",
                newName: "ItemsSpecification");

            migrationBuilder.RenameIndex(
                name: "IX_ItemsSpecifications_ItemId",
                table: "ItemsSpecification",
                newName: "IX_ItemsSpecification_ItemId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ItemsSpecification",
                table: "ItemsSpecification",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ItemsSpecification_Items_ItemId",
                table: "ItemsSpecification",
                column: "ItemId",
                principalTable: "Items",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
