using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ShahWilayat.Controllers
{
    [SessionCheck]
    public class TenureController : Controller
    {
        // GET: Tenure
        ShahWilayatEntities context = new ShahWilayatEntities();
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetAllTenure()
        {
            try
            {
                var lst = context.Tenures.Where(x => x.IsActive == true)
               .AsEnumerable()
               .Select(x => new
               {
                   x.TenureId,
                   x.PaymentCategoryId,
                   PaymentCategory = x.PaymentCategory.PaymentCategory1,
                   Tenure = x.Tenure1,
                   x.StartDate,
                   x.EndDate
               }).ToList().OrderBy(x => x.PaymentCategory).ThenBy(x => x.PaymentCategory);

                return Json(lst, JsonRequestBehavior.AllowGet);

            }
            catch (Exception e)
            {
                return Json(e.ToString(), JsonRequestBehavior.AllowGet);
            }

        }

        public string DeleteTenure(Tenure tenure)
        {
            try
            {
                var obj = context.Tenures.FirstOrDefault(x => x.TenureId == tenure.TenureId);
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
        public string CreateNewTenure(Tenure tenure)
        {
            try
            {
                tenure.IsActive = true;
                tenure.CreatedDate = DateTime.Now;
                tenure.CreatedBy = (int)HttpContext.Session["UserId"];
                context.Tenures.Add(tenure);
                context.SaveChanges();
                return "true";

            }
            catch (Exception e)
            {
                return e.ToString();
            }
        }

        public string UpdateTenure(Tenure tenure)
        {
            try
            {
                var obj = context.Tenures.FirstOrDefault(x => x.TenureId == tenure.TenureId);

                obj.PaymentCategoryId = tenure.PaymentCategoryId;
                obj.Tenure1 = tenure.Tenure1;
                obj.StartDate = tenure.StartDate;
                obj.EndDate = tenure.EndDate;
                obj.IsActive = true;
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
    }
}