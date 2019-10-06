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
    
    public partial class AssociateAllotment
    {
        public int AssociateAllotmentId { get; set; }
        public int MemberId { get; set; }
        public int PlotId { get; set; }
        public string AllotmentOrderNo { get; set; }
        public System.DateTime AllotmentOrderDate { get; set; }
        public string ProvisionalAllotmentNo { get; set; }
        public Nullable<System.DateTime> ProvisionalAllotmentDate { get; set; }
        public string ShareCertificateNo { get; set; }
        public Nullable<System.DateTime> ShareCertificateDate { get; set; }
        public bool IsActive { get; set; }
        public int CreatedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public string ScanAllotmentOrder { get; set; }
        public string ScanProvisionalOrder { get; set; }
        public string ScanShareCertificate { get; set; }
        public int ManagementCommitteeId { get; set; }
    
        public virtual Member Member { get; set; }
        public virtual Plot Plot { get; set; }
        public virtual ManagementCommittee ManagementCommittee { get; set; }
    }
}
