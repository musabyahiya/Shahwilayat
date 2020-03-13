using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ShahWilayat.Controllers
{
    [SessionCheck]
    public class NomineeController : Controller
    {
        // GET: Nominee
        ShahWilayatEntities context = new ShahWilayatEntities();
        public ActionResult Index()
        {
            return View();
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

        public JsonResult GetAllRelation()
        {
            try
            {
                var lst = context.Relations.Where(x => x.IsActive == true)
             .Select(x => new
             {
                 Id = x.RelationId,
                 Value = x.Relation1
             }).ToList();

                return Json(lst, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e, JsonRequestBehavior.AllowGet);
            }
        }

        public string CreateNewNominee(Nominee nom)
        {
            try
            {
                nom.IsActive = true;
                nom.CreatedDate = DateTime.Now;
                nom.CreatedBy = (int)HttpContext.Session["UserId"];
                context.Nominees.Add(nom);
                context.SaveChanges();
                return "true";

            }
            catch (Exception e)
            {
                return e.ToString();
            }
        }

        public JsonResult GetAllNominees()
        {
            try
            {
                var lst = context.Nominees.Where(x => x.IsActive == true)
             .Select(x => new
             {
                 x.NomineeId,
                 x.TitleId,
                 Title = x.Title.Title1,
                 x.RelationId,
                 Relation = x.Relation.Relation1,
                 x.MemberRelationId,
                 MemberRelation = x.MemberRelation.MemberRelation1,
                 x.MemberId,
                 x.Member.MembershipNo,
                 MemberName = x.Member.FirstName + " " + x.Member.LastName,
                 x.FirstName,
                 x.LastName,
                 x.FatherName,
                 x.Dob,
                 x.BirthPlace,
                 x.CellNo,
                 x.CNIC,
                 x.CnicFront,
                 x.CnicBack,
                 x.ProfileFile,
                 x.Address,
                 FrcFile = x.FrcFile == null ? "[]" : x.FrcFile,
                 HereshipCertificate = x.HereshipCertificate == null ? "[]" : x.HereshipCertificate,
                 GuardianCertificate = x.GuardianCertificate == null ? "[]" : x.GuardianCertificate,
                 DeathCertificate = x.DeathCertificate == null ? "[]" : x.DeathCertificate,
                 BirthCertificate = x.BirthCertificate == null ? "[]" : x.BirthCertificate

             }).OrderBy(x => x.MemberId).ToList();

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
             .Select(x => new
             {
                 Id = x.MemberId,
                 Value = x.MembershipNo + " - " + x.FirstName + " " + x.LastName
             }).ToList();

                return Json(lst, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e, JsonRequestBehavior.AllowGet);
            }
        }

        public string UpdateNominee(Nominee nominee)
        {
            try
            {
                var obj = context.Nominees.FirstOrDefault(x => x.NomineeId == nominee.NomineeId);
                obj.MemberId = nominee.MemberId;
                obj.TitleId = nominee.TitleId;
                obj.RelationId = nominee.RelationId;
                obj.MemberRelationId = nominee.MemberRelationId;
                obj.FirstName = nominee.FirstName;
                obj.LastName = nominee.LastName;
                obj.Dob = nominee.Dob;
                obj.BirthPlace = nominee.BirthPlace;
                obj.FatherName = nominee.FatherName;
                obj.CellNo = nominee.CellNo;
                obj.CNIC = nominee.CNIC;
                obj.CellNo = nominee.CellNo;
                obj.Address = nominee.Address;
     
               
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

        public string UpdateAttachment(Nominee nominee)
        {
            try
            {
                var obj = context.Nominees.FirstOrDefault(x => x.NomineeId == nominee.NomineeId);
                obj.ProfileFile = nominee.ProfileFile;
                obj.FrcFile = nominee.FrcFile;
                obj.CnicFront = nominee.CnicFront;
                obj.CnicBack = nominee.CnicBack;
                obj.HereshipCertificate = nominee.HereshipCertificate;
                obj.BirthCertificate = nominee.BirthCertificate;
                obj.GuardianCertificate = nominee.GuardianCertificate;
                obj.DeathCertificate = nominee.DeathCertificate;
      
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

        public string DeleteNominee(int NomineeId)
        {
            try
            {
                var obj = context.Nominees.FirstOrDefault(x => x.NomineeId == NomineeId);
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


    }
}