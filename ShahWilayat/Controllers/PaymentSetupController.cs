using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ShahWilayat.Controllers
{
    [SessionCheck]
    public class PaymentSetupController : Controller
    {
        ShahWilayatEntities context = new ShahWilayatEntities();
        // GET: PaymentSetup
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetAllPlotType()
        {
            try
            {
                var lst = context.PlotTypes.Where(x => x.IsActive == true)
             .Select(x => new
             {
                 Id = x.PlotTypeId,
                 Value = x.PlotType1
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
                var lst = context.Plots.Where(x => x.IsActive == true)
             .Select(x => new
             {
                 Id = x.PlotId,
                 Value = x.PlotNo + " (" + x.PlotSize.PlotSize1 + " - " + x.Unit.Unit1 + ")",
                 x.PlotTypeId
             }).ToList();

                return Json(lst, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e, JsonRequestBehavior.AllowGet);
            }
        }
        public string CreateNewPaymentSetup(PaymentSetup ps)
        {
            try
            {

                ps.IsActive = true;
                ps.CreatedDate = DateTime.Now;
                ps.CreatedBy = (int)HttpContext.Session["UserId"];
                context.PaymentSetups.Add(ps);
                context.SaveChanges();
                return "true";

            }
            catch (Exception e)
            {
                return e.ToString();
            }
        }

        public string UpdatePaymentSetup(PaymentSetup ps)
        {
            try
            {
                var obj = context.PaymentSetups.FirstOrDefault(x => x.PaymentSetupId == ps.PaymentSetupId);
                obj.PaymentCategoryId = ps.PaymentCategoryId;
                obj.PaymentSubCategoryId = ps.PaymentSubCategoryId;
                obj.TenureId = ps.TenureId;
                obj.Rate = ps.Rate;
                obj.PlotTypeId = ps.PlotTypeId;
                obj.PlotId = ps.PlotId;
                obj.IsActive = true;
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

        public string DeletePaymentSetup(PaymentSetup ps)
        {
            try
            {
                var obj = context.PaymentSetups.FirstOrDefault(x => x.PaymentSetupId == ps.PaymentSetupId);
                obj.IsActive = false;
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

        public JsonResult GetAllTenure()
        {
            try
            {
                var lst = context.Tenures.Where(x => x.IsActive == true)
             .Select(x => new
             {
                 Id = x.TenureId,
                 Value = x.Tenure1,
                 x.PaymentSubCategoryId
             }).ToList();

                return Json(lst, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetAllPaymentSetup()
        {
            try
            {
                var lst = context.PaymentSetups.Where(x => x.IsActive == true)
             .Select(x => new
             {
                 x.PaymentSetupId,
                 x.PaymentCategoryId,
                 x.PaymentSubCategoryId,
                 PaymentCategory = x.PaymentCategory.PaymentCategory1,
                 x.TenureId,
                 Tenure = x.Tenure.Tenure1,
                 PaymentSubCategory = x.PaymentSubCategory.PaymentSubCategory1,
                 x.PlotTypeId,
                 PlotType = x.PlotType.PlotType1,
                 x.PlotId,
                 Plot = x.PlotId == 0 ? "NULL" : context.Plots.FirstOrDefault(m => m.IsActive == true && x.PlotId == m.PlotId).PlotNo,
                 x.Rate
                 
             }).OrderBy(x => x.PlotType).OrderBy(x => x.PaymentCategory).ThenBy(x => x.PaymentSubCategory).ToList();

                return Json(lst, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetAllPaymentCategory()
        {
            try
            {
                var lst = context.PaymentCategories.Where(x => x.IsActive == true)
             .Select(x => new
             {
                 Id = x.PaymentCategoryId,
                 Value = x.PaymentCategory1
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