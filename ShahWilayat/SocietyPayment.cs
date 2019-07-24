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
    
    public partial class SocietyPayment
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public SocietyPayment()
        {
            this.SocietyPaymentDetails = new HashSet<SocietyPaymentDetail>();
        }
    
        public int SocietyPaymentId { get; set; }
        public int ChargeId { get; set; }
        public int PaymentMethodId { get; set; }
        public int MemberId { get; set; }
        public int PlotId { get; set; }
        public Nullable<System.DateTime> PaymentDate { get; set; }
        public double PaymentAmount { get; set; }
        public int PaymentCategoryId { get; set; }
        public int PaymentSubCategoryId { get; set; }
        public string ReceiptNo { get; set; }
        public bool HasPaid { get; set; }
        public bool IsTransfered { get; set; }
        public bool IsActive { get; set; }
        public int CreatedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
    
        public virtual Charge Charge { get; set; }
        public virtual Member Member { get; set; }
        public virtual PaymentMethod PaymentMethod { get; set; }
        public virtual Plot Plot { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<SocietyPaymentDetail> SocietyPaymentDetails { get; set; }
    }
}