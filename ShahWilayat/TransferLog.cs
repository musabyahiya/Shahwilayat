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
    
    public partial class TransferLog
    {
        public int TransferLogId { get; set; }
        public int TransferId { get; set; }
        public int PlotId { get; set; }
        public int MemberId { get; set; }
        public System.DateTime TransferDate { get; set; }
        public bool IsActive { get; set; }
        public int CreatedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
    
        public virtual Member Member { get; set; }
        public virtual Plot Plot { get; set; }
        public virtual Transfer Transfer { get; set; }
    }
}
