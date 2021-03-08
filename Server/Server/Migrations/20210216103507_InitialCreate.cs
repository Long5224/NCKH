using Microsoft.EntityFrameworkCore.Migrations;

namespace Server.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Faculties",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(100)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Faculties", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Classes",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    facultyID = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Classes", x => x.id);
                    table.ForeignKey(
                        name: "FK_Classes_Faculties_facultyID",
                        column: x => x.facultyID,
                        principalTable: "Faculties",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Students",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    firstName = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    lastName = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    dateOfBirth = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    placeOfBirth = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    phoneNumber = table.Column<string>(type: "nvarchar(16)", nullable: true),
                    gender = table.Column<bool>(type: "bit", nullable: false),
                    yearOfAdmission = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    classID = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Students", x => x.id);
                    table.ForeignKey(
                        name: "FK_Students_Classes_classID",
                        column: x => x.classID,
                        principalTable: "Classes",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Classes_facultyID",
                table: "Classes",
                column: "facultyID");

            migrationBuilder.CreateIndex(
                name: "IX_Students_classID",
                table: "Students",
                column: "classID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Students");

            migrationBuilder.DropTable(
                name: "Classes");

            migrationBuilder.DropTable(
                name: "Faculties");
        }
    }
}
