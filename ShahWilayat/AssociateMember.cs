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
    
    public partial class AssociateMember
    {
        public int AssociateMemberId { get; set; }
        public int MemberId { get; set; }
        public int TitleId { get; set; }
        public int MemberRelationId { get; set; }
        public int GenderId { get; set; }
        public int CountryId { get; set; }
        public int ProvinceId { get; set; }
        public int CityId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FatherName { get; set; }
        public string CellNo { get; set; }
        public string Landline { get; set; }
        public string WhatsApp { get; set; }
        public string OfficePhone { get; set; }
        public string Email { get; set; }
        public System.DateTime Dob { get; set; }
        public string BirthPlace { get; set; }
        public string CNIC { get; set; }
        public System.DateTime CnicExpiryDate { get; set; }
        public string BloodGroup { get; set; }
        public string PostalCode { get; set; }
        public string PermanentAddress { get; set; }
        public string Occupation { get; set; }
        public string CnicFrontFile { get; set; }
        public string CnicBackFile { get; set; }
        public string ProfileFile { get; set; }
        public bool IsMember { get; set; }
        public bool IsGone { get; set; }
        public Nullable<System.DateTime> GoneDate { get; set; }
        public bool IsActive { get; set; }
        public int CreatedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
    
        public virtual City City { get; set; }
        public virtual Country Country { get; set; }
        public virtual Gender Gender { get; set; }
        public virtual MemberRelation MemberRelation { get; set; }
        public virtual Member Member { get; set; }
        public virtual Province Province { get; set; }
        public virtual Title Title { get; set; }
    }
}
