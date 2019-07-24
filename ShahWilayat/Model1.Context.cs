﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ShahWilayat
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class ShahWilayatEntities : DbContext
    {
        public ShahWilayatEntities()
            : base("name=ShahWilayatEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<AllotmentOrder> AllotmentOrders { get; set; }
        public virtual DbSet<Charge> Charges { get; set; }
        public virtual DbSet<City> Cities { get; set; }
        public virtual DbSet<CnicHistory> CnicHistories { get; set; }
        public virtual DbSet<Country> Countries { get; set; }
        public virtual DbSet<FileManagement> FileManagements { get; set; }
        public virtual DbSet<Gender> Genders { get; set; }
        public virtual DbSet<InstallmentPlan> InstallmentPlans { get; set; }
        public virtual DbSet<Installment> Installments { get; set; }
        public virtual DbSet<Invoice> Invoices { get; set; }
        public virtual DbSet<IssuerDesignation> IssuerDesignations { get; set; }
        public virtual DbSet<MemberRelation> MemberRelations { get; set; }
        public virtual DbSet<Member> Members { get; set; }
        public virtual DbSet<MembershipFee> MembershipFees { get; set; }
        public virtual DbSet<MenuItem> MenuItems { get; set; }
        public virtual DbSet<Nominee> Nominees { get; set; }
        public virtual DbSet<PaymentCategory> PaymentCategories { get; set; }
        public virtual DbSet<PaymentDetail> PaymentDetails { get; set; }
        public virtual DbSet<PaymentMethod> PaymentMethods { get; set; }
        public virtual DbSet<PaymentPlan> PaymentPlans { get; set; }
        public virtual DbSet<Payment> Payments { get; set; }
        public virtual DbSet<PaymentSetup> PaymentSetups { get; set; }
        public virtual DbSet<PaymentSubCategory> PaymentSubCategories { get; set; }
        public virtual DbSet<Phase> Phases { get; set; }
        public virtual DbSet<Plot> Plots { get; set; }
        public virtual DbSet<PlotCategory> PlotCategories { get; set; }
        public virtual DbSet<PlotCategoryPercent> PlotCategoryPercents { get; set; }
        public virtual DbSet<PlotSize> PlotSizes { get; set; }
        public virtual DbSet<PlotSpec> PlotSpecs { get; set; }
        public virtual DbSet<PlotSubType> PlotSubTypes { get; set; }
        public virtual DbSet<PlotType> PlotTypes { get; set; }
        public virtual DbSet<Province> Provinces { get; set; }
        public virtual DbSet<ProvisionalAllotmentFee> ProvisionalAllotmentFees { get; set; }
        public virtual DbSet<Relation> Relations { get; set; }
        public virtual DbSet<Religion> Religions { get; set; }
        public virtual DbSet<Role> Roles { get; set; }
        public virtual DbSet<RoleMenuMapping> RoleMenuMappings { get; set; }
        public virtual DbSet<ShareCertificateFee> ShareCertificateFees { get; set; }
        public virtual DbSet<SocietyPayment> SocietyPayments { get; set; }
        public virtual DbSet<SocietyPaymentDetail> SocietyPaymentDetails { get; set; }
        public virtual DbSet<TempTable> TempTables { get; set; }
        public virtual DbSet<Tenure> Tenures { get; set; }
        public virtual DbSet<Title> Titles { get; set; }
        public virtual DbSet<Transfer> Transfers { get; set; }
        public virtual DbSet<TransferLog> TransferLogs { get; set; }
        public virtual DbSet<UnitRate> UnitRates { get; set; }
        public virtual DbSet<Unit> Units { get; set; }
        public virtual DbSet<User> Users { get; set; }
    }
}
