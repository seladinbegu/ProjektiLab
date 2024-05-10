﻿// <auto-generated />
using InpositionLibrary.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace InpositionLibrary.Migrations
{
    [DbContext(typeof(ApplicationDBContext))]
    [Migration("20240510220223_migration1")]
    partial class migration1
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("InpositionLibrary.Models.Bibloteka", b =>
                {
                    b.Property<string>("Pika")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Adresa")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Kontakti")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Pika");

                    b.ToTable("Bibloteka");
                });

            modelBuilder.Entity("InpositionLibrary.Models.Punetori", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("BiblotekaPika")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Emri")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Pika")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Pozita")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("BiblotekaPika");

                    b.ToTable("Punetori");
                });

            modelBuilder.Entity("InpositionLibrary.Models.Punetori", b =>
                {
                    b.HasOne("InpositionLibrary.Models.Bibloteka", "Bibloteka")
                        .WithMany()
                        .HasForeignKey("BiblotekaPika");

                    b.Navigation("Bibloteka");
                });
#pragma warning restore 612, 618
        }
    }
}
