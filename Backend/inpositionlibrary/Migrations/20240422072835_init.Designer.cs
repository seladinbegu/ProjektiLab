﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using inpositionlibrary.Data;

#nullable disable

namespace inpositionlibrary.Migrations
{
    [DbContext(typeof(ApplicationDBContext))]
    [Migration("20240422072835_init")]
    partial class init
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("inpositionlibrary.Models.Bibloteka", b =>
                {
                    b.Property<string>("Pika")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Adresa")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Kontakti")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("NumriPunetoreve")
                        .HasColumnType("int");

                    b.HasKey("Pika");

                    b.ToTable("Bibloteka");
                });

            modelBuilder.Entity("inpositionlibrary.Models.Punetori", b =>
                {
                    b.Property<int>("ID_Punetori")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID_Punetori"));

                    b.Property<string>("BiblotekaPika")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Emri")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Mbarimi_iKontrates")
                        .HasColumnType("datetime2");

                    b.Property<string>("Pozicioni")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID_Punetori");

                    b.ToTable("Punetori");
                });
#pragma warning restore 612, 618
        }
    }
}
