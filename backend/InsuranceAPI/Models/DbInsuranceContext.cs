using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace InsuranceAPI.Models;

public partial class DbInsuranceContext : DbContext
{
    public DbInsuranceContext()
    {
    }

    public DbInsuranceContext(DbContextOptions<DbInsuranceContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Address> Addresses { get; set; }

    public virtual DbSet<Insured> Insureds { get; set; }

    public virtual DbSet<Phone> Phones { get; set; }

    public virtual DbSet<Producer> Producers { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Address>(entity =>
        {
            entity.ToTable("address");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.City)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("city");
            entity.Property(e => e.Departament).HasColumnName("departament");
            entity.Property(e => e.Floor).HasColumnName("floor");
            entity.Property(e => e.Number)
                .HasMaxLength(8)
                .IsUnicode(false)
                .HasColumnName("number");
            entity.Property(e => e.Province)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("province");
            entity.Property(e => e.Street)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("street");
        });

        modelBuilder.Entity<Insured>(entity =>
        {
            entity.ToTable("insured");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Address).HasColumnName("address");
            entity.Property(e => e.Born)
                .HasColumnType("date")
                .HasColumnName("born");
            entity.Property(e => e.Cuit)
                .HasMaxLength(15)
                .IsUnicode(false)
                .HasColumnName("cuit");
            entity.Property(e => e.Description)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("description");
            entity.Property(e => e.Dni)
                .HasMaxLength(8)
                .IsFixedLength()
                .HasColumnName("dni");
            entity.Property(e => e.Firstname)
                .HasMaxLength(25)
                .IsUnicode(false)
                .HasColumnName("firstname");
            entity.Property(e => e.Folder).HasColumnName("folder");
            entity.Property(e => e.Lastname)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("lastname");
            entity.Property(e => e.License)
                .HasMaxLength(15)
                .IsUnicode(false)
                .HasColumnName("license");
            entity.Property(e => e.Life)
                .HasMaxLength(11)
                .IsUnicode(false)
                .HasColumnName("life");
            entity.Property(e => e.Phone).HasColumnName("phone");
            entity.Property(e => e.Producer).HasColumnName("producer");

            entity.HasOne(d => d.AddressNavigation).WithMany(p => p.Insureds)
                .HasForeignKey(d => d.Address)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_address_insured");

            entity.HasOne(d => d.PhoneNavigation).WithMany(p => p.Insureds)
                .HasForeignKey(d => d.Phone)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_phone_insured");

            entity.HasOne(d => d.ProducerNavigation).WithMany(p => p.Insureds)
                .HasForeignKey(d => d.Producer)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_producer_insured");
        });

        modelBuilder.Entity<Phone>(entity =>
        {
            entity.ToTable("phone");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.Description)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("description");
            entity.Property(e => e.Insured).HasColumnName("insured");
            entity.Property(e => e.Number)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("number");
        });

        modelBuilder.Entity<Producer>(entity =>
        {
            entity.ToTable("producer");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.Firstname)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("firstname");
            entity.Property(e => e.Joined)
                .HasColumnType("date")
                .HasColumnName("joined");
            entity.Property(e => e.Lastname)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("lastname");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
