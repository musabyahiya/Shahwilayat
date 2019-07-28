//------------------------------------------------------------------------------
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
    using System.Collections.Generic;
    
    public partial class Plot
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Plot()
        {
            this.Installments = new HashSet<Installment>();
            this.Invoices = new HashSet<Invoice>();
            this.PaymentPlans = new HashSet<PaymentPlan>();
            this.Payments = new HashSet<Payment>();
            this.SocietyPayments = new HashSet<SocietyPayment>();
            this.Transfers = new HashSet<Transfer>();
            this.TransferLogs = new HashSet<TransferLog>();
            this.Allotments = new HashSet<Allotment>();
            this.AssociateAllotments = new HashSet<AssociateAllotment>();
        }
    
        public int PlotId { get; set; }
        public int PlotTypeId { get; set; }
        public int PlotSubTypeId { get; set; }
        public int PlotSizeId { get; set; }
        public int UnitId { get; set; }
        public string PlotNo { get; set; }
        public bool HasExtraSize { get; set; }
        public Nullable<int> ExtraSize { get; set; }
        public bool HasAlotted { get; set; }
        public bool IsActive { get; set; }
        public int CreatedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Installment> Installments { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Invoice> Invoices { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<PaymentPlan> PaymentPlans { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Payment> Payments { get; set; }
        public virtual Plot Plot1 { get; set; }
        public virtual Plot Plot2 { get; set; }
        public virtual Plot Plot11 { get; set; }
        public virtual Plot Plot3 { get; set; }
        public virtual PlotSize PlotSize { get; set; }
        public virtual PlotSubType PlotSubType { get; set; }
        public virtual PlotType PlotType { get; set; }
        public virtual Unit Unit { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<SocietyPayment> SocietyPayments { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Transfer> Transfers { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TransferLog> TransferLogs { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Allotment> Allotments { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<AssociateAllotment> AssociateAllotments { get; set; }
    }
}
