using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ShahWilayat.Controllers
{
    [SessionCheck]
    public class AssociateAllotmentController : Controller
    {
        ShahWilayatEntities context = new ShahWilayatEntities();
        // GET: AssociateAllotment
        public ActionResult Index()
        {
            return View();
        }

        public string CreateNewAllotment(AssociateAllotment ao)
        {
            try
            {
                ao.IsActive = true;
                ao.CreatedDate = DateTime.Now;
                ao.CreatedBy = (int)HttpContext.Session["UserId"];
                context.AssociateAllotments.Add(ao);
                context.SaveChanges();
                UpdatePlotAllottedStatus(ao.PlotId, "Create");
                return "true";

            }
            catch (Exception e)
            {
                return e.ToString();
            }
        }

        public string UpdateAllotment(AssociateAllotment ao)
        {
            try
            {
                var obj = context.AssociateAllotments.FirstOrDefault(x => x.AssociateAllotmentId == ao.AssociateAllotmentId);

              //  UpdatePlotAllottedStatus(obj.PlotId, "Update");
                obj.AllotmentOrderNo = ao.AllotmentOrderNo;
                obj.AllotmentOrderDate = ao.AllotmentOrderDate;
                obj.ShareCertificateNo = ao.ShareCertificateNo;
                obj.ShareCertificateDate = ao.ShareCertificateDate;
                obj.ProvisionalAllotmentNo = ao.ProvisionalAllotmentNo;
                obj.ProvisionalAllotmentDate = ao.ProvisionalAllotmentDate;
                obj.ManagementCommitteeId = ao.ManagementCommitteeId;
                obj.CreatedDate = DateTime.Now;
                obj.CreatedBy = (int)HttpContext.Session["UserId"];
                context.Entry(obj).State = EntityState.Modified;
                context.SaveChanges();

                return "true";

            }
            catch (Exception e)
            {
                return e.ToString();
            }
        }

        public string UpdateAttachment(AssociateAllotment ao)
        {
            try
            {
                var obj = context.AssociateAllotments.FirstOrDefault(x => x.AssociateAllotmentId == ao.AssociateAllotmentId);

                obj.ScanAllotmentOrder = ao.ScanAllotmentOrder;
                obj.ScanProvisionalOrder = ao.ScanProvisionalOrder;
                obj.ScanShareCertificate = ao.ScanShareCertificate;
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
        public string UpdatePlotAllottedStatus(int PlotId, string Action)
        {
            try
            {
                var obj = context.Plots.FirstOrDefault(x => x.PlotId == PlotId);
                obj.ModifiedDate = DateTime.Now;
                obj.ModifiedBy = (int)HttpContext.Session["UserId"];
                obj.HasAssociateAlollted = Action == "Create" ? true : false;
                context.SaveChanges();
                return "true";
            }
            catch (Exception e)
            {
                return e.ToString();
            }
        }
        public string DeleteAllotment(AssociateAllotment ao)
        {
            try
            {
                var obj = context.AssociateAllotments.FirstOrDefault(x => x.AssociateAllotmentId == ao.AssociateAllotmentId);
                obj.IsActive = false;
                obj.CreatedDate = DateTime.Now;
                obj.CreatedBy = (int)HttpContext.Session["UserId"];
                context.Entry(obj).State = EntityState.Modified;
                context.SaveChanges();
                return "true";
            }
            catch (Exception e)
            {
                return e.ToString();
            }
        }

        public JsonResult GetAllMembers()
        {
            try
            {
                var lst = context.Members.Where(x => x.IsActive == true && x.IsMember == true)
             .Select(x => new
             {
                 Id = x.MemberId,
                 Value = x.FirstName + " " + x.LastName + " " + "(" + x.MembershipNo + ")"
             }).ToList();

                return Json(lst, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e, JsonRequestBehavior.AllowGet);
            }
        }


        public JsonResult GetAllPlots()
        {
            try
            {
                var lst = context.Plots.Where(x => x.IsActive == true && x.HasAssociateAlollted == false)
             .Select(x => new
             {
                 Id = x.PlotId,
                 Value = x.PlotNo + " (" + x.PlotSize.PlotSize1 + " - " + x.Unit.Unit1 + ")"
             }).ToList();

                return Json(lst, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetAllAllotment()
        {
            try
            {
                var lst = context.AssociateAllotments.Where(x => x.IsActive == true && x.Plot.HasAlotted == true)
               .AsEnumerable()
               .Select(x => new
               {
                   x.AssociateAllotmentId,
                   x.MemberId,
                   x.Member.FirstName,
                   x.Member.LastName,
                   x.Member.MembershipNo,
                   x.PlotId,
                   Plot = x.Plot.PlotNo + " (" + x.Plot.PlotSize.PlotSize1 + ")",
                   x.AllotmentOrderDate,
                   x.AllotmentOrderNo,
                   x.ShareCertificateNo,
                   x.ShareCertificateDate,
                   x.ProvisionalAllotmentNo,
                   x.ProvisionalAllotmentDate,
                   x.ScanAllotmentOrder,
                   x.ScanProvisionalOrder,
                   x.ScanShareCertificate,
                   x.ManagementCommitteeId,

               }).ToList();

                return Json(lst, JsonRequestBehavior.AllowGet);

            }
            catch (Exception e)
            {
                return Json(e.ToString(), JsonRequestBehavior.AllowGet);
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
    }
}