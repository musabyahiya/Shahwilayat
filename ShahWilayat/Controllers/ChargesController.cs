using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ShahWilayat.Controllers
{
    [SessionCheck]
    public class ChargesController : Controller
    {
        ShahWilayatEntities context = new ShahWilayatEntities();
        // GET: Charges
        public ActionResult Index()
        {
            return View();
        }


        public JsonResult GetAllCharges()
        {
            try
            {
                var lst = context.Charges.Where(x => x.IsActive == true)
             .Select(x => new
             {
               
                 x.ChargeId,
                 x.PaymentSetupId,
                 PaymentSetup = x.PaymentSetup.Tenure.PaymentCategory.PaymentCategory1 + " (" + x.PaymentSetup.Rate + " " + "PKR | " + x.PaymentSetup.Tenure.Tenure1 + ")",
                 x.Surcharge,
                 x.Description,
                 x.DueDate,
                 x.PaymentSetup.IsFixed,
                 x.PaymentSetup.PlotTypeId,
                 PlotType = x.PaymentSetup.PlotType.PlotType1,
                 x.PaymentSetup.PlotId,
                 x.PaymentSetup.TenureId,
                 Plot = x.PaymentSetup.PlotId == 0 ? "NULL" : context.Plots.FirstOrDefault(m => m.IsActive == true && x.PaymentSetup.PlotId == m.PlotId).PlotNo
             }).OrderByDescending(x => x.ChargeId).ToList();

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
                 Id = x.PaymentSetupId,
                 Value = x.Tenure.PaymentCategory.PaymentCategory1 + " - " + " (" + x.Rate + " " + "PKR | " + x.Tenure.Tenure1 + ")",
                 x.Tenure.StartDate
             }).OrderBy(x => x.StartDate).ToList();

                return Json(lst, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetAllPaymentSetupUnique()
        {
            try
            {
                var itemIds = context.Charges.Select(x => x.PaymentSetupId).ToArray();
                var otherObjects = context.PaymentSetups.Where(x => !itemIds.Contains(x.PaymentSetupId));

                var lst = otherObjects.Where(x => x.IsActive == true)
             .Select(x => new
             {
                 Id = x.PaymentSetupId,
                 Value = x.Tenure.PaymentCategory.PaymentCategory1 + " - " + " (" + x.Rate + " " + "PKR | " + x.Tenure.Tenure1 + ")",
                 x.Tenure.StartDate
             }).OrderBy(x => x.StartDate).ToList();

                return Json(lst, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e, JsonRequestBehavior.AllowGet);
            }
        }


        public string CreateNewCharge(Charge charge)
        {
            try
            {

                charge.IsActive = true;
                charge.CreatedDate = DateTime.Now;
                charge.CreatedBy = (int)HttpContext.Session["UserId"];
                context.Charges.Add(charge);
                context.SaveChanges();
                return "true";

            }
            catch (Exception e)
            {
                return e.ToString();
            }
        }
        public string UpdateCharge(Charge charge)
        {
            try
            {
                var obj = context.Charges.FirstOrDefault(x => x.ChargeId == charge.ChargeId);

                obj.Description = charge.Description;
                obj.DueDate = charge.DueDate;
                obj.Surcharge = charge.Surcharge;

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
        public string DeleteCharge(Charge charge)
        {
            try
            {
                var obj = context.Charges.FirstOrDefault(x => x.ChargeId == charge.ChargeId);
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

    }
}