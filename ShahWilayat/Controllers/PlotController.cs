using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ShahWilayat.Controllers
{
    [SessionCheck]
    public class PlotController : Controller
    {
        ShahWilayatEntities context = new ShahWilayatEntities();
        // GET: Plot
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetAllPlots()
        {
            try
            {
                var lst = context.Plots.Where(x => x.IsActive == true)
               .AsEnumerable()
               .Select(x => new
               {
                   x.PlotId,
                   x.PlotTypeId,
                   PlotType = x.PlotType.PlotType1,
                   x.PlotSubTypeId,
                   PlotSubType = x.PlotSubType.PlotSubType1,
                   x.PlotSizeId,
                   PlotSize = x.PlotSize.PlotSize1,
                   x.UnitId,
                   Unit = x.Unit.Unit1,
                   x.HasExtraSize,
                   x.ExtraSize,
                   x.PlotNo,
                   x.HasAlotted,
                   x.SitePlan,
                   x.ManagementCommitteeId,
                   
                   TotalSize = x.HasExtraSize == true ? (x.ExtraSize + x.PlotSize.PlotSize1) : x.PlotSize.PlotSize1
               }).OrderByDescending(x => x.PlotId).ToList();

                return Json(lst, JsonRequestBehavior.AllowGet);

            }
            catch (Exception e)
            {
                return Json(e.ToString(), JsonRequestBehavior.AllowGet);
            }

        }
        public JsonResult GetAllPlotSubType()
        {
            try
            {
                var lst = context.PlotSubTypes.Where(x => x.IsActive == true)
             .Select(x => new
             {
                 Id = x.PlotSubTypeId,
                 Value = x.PlotSubType1,
                 x.PlotTypeId
             }).ToList();

                return Json(lst, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e, JsonRequestBehavior.AllowGet);
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

        public JsonResult GetAllPlotSize()
        {
            try
            {
                var lst = context.PlotSizes.Where(x => x.IsActive == true)
             .Select(x => new
             {
                 Id = x.PlotSizeId,
                 Value = x.PlotSize1
             }).ToList();

                return Json(lst, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetAllUnits()
        {
            try
            {
                var lst = context.Units.Where(x => x.IsActive == true)
             .Select(x => new
             {
                 Id = x.UnitId,
                 Value = x.Unit1
             }).ToList();

                return Json(lst, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e, JsonRequestBehavior.AllowGet);
            }
        }

        public string CreateNewPlot(Plot plot)
        {
            try
            {
                plot.IsActive = true;
                plot.CreatedDate = DateTime.Now;
                plot.CreatedBy = (int)HttpContext.Session["UserId"];
                context.Plots.Add(plot);
                context.SaveChanges();


                return "true";

            }
            catch (Exception e)
            {
                return e.ToString();
            }
        }
        public string UpdatePlot(Plot plot)
        {
            try
            {
                var obj = context.Plots.FirstOrDefault(x => x.PlotId == plot.PlotId);
                obj.PlotTypeId = plot.PlotTypeId;
                obj.PlotSubTypeId = plot.PlotSubTypeId;
                obj.PlotSizeId = plot.PlotSizeId;
                obj.UnitId = plot.UnitId;
                obj.PlotNo = plot.PlotNo;
                obj.HasExtraSize = plot.HasExtraSize;
                obj.ExtraSize = plot.ExtraSize;
                obj.PlotSize = plot.PlotSize;
                obj.SitePlan = plot.SitePlan;
                obj.ManagementCommitteeId = plot.ManagementCommitteeId;
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