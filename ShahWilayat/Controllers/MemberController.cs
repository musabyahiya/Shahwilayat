using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ShahWilayat.Controllers
{
    [SessionCheck]
    public class MemberController : Controller
    {
        // GET: Member
        ShahWilayatEntities context = new ShahWilayatEntities();
        public ActionResult Index()
        {
            return View();
        }
      

        public string CreateNewMember(Member member)
        {
            try
            {
                member.IsActive = true;
                member.CreatedDate = DateTime.Now;
                member.CreatedBy = (int)HttpContext.Session["UserId"];
                context.Members.Add(member);
                context.SaveChanges();
                return "true";

            }
            catch (Exception e)
            {
                return e.ToString();
            }
        }
        public string UpdateAttachment(Member member)
        {
            try
            {
                var obj = context.Members.FirstOrDefault(x => x.MemberId == member.MemberId);
                obj.ProfileFile = member.ProfileFile;
                obj.CnicFrontFile = member.CnicFrontFile;
                obj.CnicBackFile = member.CnicBackFile;
                obj.ModifiedDate = DateTime.Now;
                obj.ModifiedBy = (int)HttpContext.Session["UserId"];
                context.Entry(obj).State = EntityState.Modified;
                context.SaveChanges();
                return "true";
            }
            catch (Exception e)
            {
                return e.ToString();
            }
        }

        public string UpdateMember(Member member)
        {
            try
            {
                var obj = context.Members.FirstOrDefault(x => x.MemberId == member.MemberId);
                obj.TitleId = member.TitleId;
                obj.MemberRelationId = member.MemberRelationId;
                obj.GenderId = member.GenderId;
                obj.CountryId = member.CountryId;
                obj.ProvinceId = member.ProvinceId;
                obj.CityId = member.CityId;
                obj.FirstName = member.FirstName;
                obj.LastName = member.LastName;
                obj.FatherName = member.FatherName;
                obj.CellNo = member.CellNo;
                obj.Landline = member.Landline;
                obj.WhatsApp = member.WhatsApp;
                obj.OfficePhone = member.OfficePhone;
                obj.Email = member.Email;
                obj.Dob = member.Dob;
                obj.BirthPlace = member.BirthPlace;
                obj.BloodGroup = member.BloodGroup;
                obj.CNIC = member.CNIC;
                obj.CnicExpiryDate = member.CnicExpiryDate;
                obj.PostalCode = member.PostalCode;
                obj.Occupation = member.Occupation;
                obj.PermanentAddress = member.PermanentAddress;
                obj.MembershipNo = member.MembershipNo;
                obj.MembershipDate = member.MembershipDate;
                obj.ReferenceNo = member.ReferenceNo;
                obj.FolioNo = member.FolioNo;
                obj.ManagementCommitteeId = member.ManagementCommitteeId;
                obj.ModifiedDate = DateTime.Now;
                obj.ModifiedBy = (int)HttpContext.Session["UserId"];
                context.Entry(obj).State = EntityState.Modified;
                context.SaveChanges();
                return "true";
            }
            catch (Exception e)
            {
                return e.ToString();
            }
        }
        public JsonResult GetAllManagementCommittee()
        {
            try
            {
                var lst = context.ManagementCommittees.Where(x => x.IsActive == true)
             .Select(x => new
             {
                 Id = x.ManagementCommitteeId,
                 Value = x.FirstName + " " + x.LastName + " (" + x.ManagementCommitteeTenure.Description + ")"

             }).ToList();

                return Json(lst, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e, JsonRequestBehavior.AllowGet);
            }
        }
        public string DeleteMember(int MemberId)
        {
            try
            {
                var obj = context.Members.FirstOrDefault(x => x.MemberId == MemberId);
                obj.ModifiedDate = DateTime.Now;
                obj.ModifiedBy = (int)HttpContext.Session["UserId"];
                obj.IsActive = false;
                context.SaveChanges();
                return "true";

            }
            catch (Exception e)
            {
                return e.ToString();
            }
        }

        public string GetCurrentAllottee()
        {
            try
            {
                DataSet ds = new DataSet();
                DataTable dt = new DataTable();
                string dbConnectionString = context.Database.Connection.ConnectionString;
                SqlConnection con = new SqlConnection(dbConnectionString);
                SqlDataAdapter da = new SqlDataAdapter("GetCurrentAllottees", con);
                da.SelectCommand.CommandType = CommandType.StoredProcedure;
                da.Fill(dt);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception e)
            {
                return e.ToString();
            }

        }
        public JsonResult GetAllCountry()
        {
            try
            {
                var lst = context.Countries.Where(x => x.IsActive == true)
             .Select(x => new
             {
                 Id = x.CountryId,
                 Value = x.Country1
             }).ToList();

                return Json(lst, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetAllTitle()
        {
            try
            {
                var lst = context.Titles.Where(x => x.IsActive == true)
             .Select(x => new
             {
                 Id = x.TitleId,
                 Value = x.Title1
             }).ToList();

                return Json(lst, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetAllMemberRelations()
        {
            try
            {
                var lst = context.MemberRelations.Where(x => x.IsActive == true)
             .Select(x => new
             {
                 Id = x.MemberRelationId,
                 Value = x.MemberRelation1
             }).ToList();

                return Json(lst, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetAllProvince()
        {
            try
            {
                var lst = context.Provinces.Where(x => x.IsActive == true)
             .Select(x => new
             {
                 Id = x.ProvinceId,
                 Value = x.Province1,
                 x.CountryId
             }).ToList();

                return Json(lst, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetAllCity()
        {
            try
            {
                var lst = context.Cities.Where(x => x.IsActive == true)
             .Select(x => new
             {
                 Id = x.CityId,
                 Value = x.City1,
                 x.ProvinceId
             }).ToList();

                return Json(lst, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetAllGender()
        {
            try
            {
                var lst = context.Genders.Where(x => x.IsActive == true)
             .Select(x => new
             {
                 Id = x.GenderId,
                 Value = x.Gender1,
             }).ToList();

                return Json(lst, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e, JsonRequestBehavior.AllowGet);
            }
        }
    
       
        public JsonResult GetAllMembers()
        {
            try
            {
                var lst = context.Members.Where(x => x.IsActive == true)
               .AsEnumerable()
               .Select(x => new
               {
                   x.MemberId,
                   x.TitleId,
                   Title = x.Title.Title1,
                   x.MemberRelationId,
                   MemberRelation = x.MemberRelation.MemberRelation1,
                   x.GenderId,
                   Gender = x.Gender.Gender1,
                   x.CountryId,
                   Country = x.Country.Country1,
                   x.ProvinceId,
                   Province = x.Province.Province1,
                   x.CityId,
                   City = x.City.City1,
                   x.FirstName,
                   x.LastName,
                   x.FatherName,
                   x.CellNo,
                   x.Landline,
                   x.WhatsApp,
                   x.OfficePhone,
                   x.Email,
                   x.Dob,
                   x.BirthPlace,
                   x.CNIC,
                   x.CnicExpiryDate,
                   x.PostalCode,
                   x.PermanentAddress,
                   x.Occupation,
                   x.BloodGroup,
                   x.MembershipNo,
                   x.MembershipDate,
                   x.ReferenceNo,
                   x.FolioNo,
                   x.ManagementCommitteeId,
                   x.CnicBackFile,
                   x.CnicFrontFile,
                   x.ProfileFile

               }).OrderByDescending(x => x.MemberId).ToList();

                return Json(lst, JsonRequestBehavior.AllowGet);

            }
            catch (Exception e)
            {
                return Json(e.ToString(), JsonRequestBehavior.AllowGet);
            }

        }

    



    }
}