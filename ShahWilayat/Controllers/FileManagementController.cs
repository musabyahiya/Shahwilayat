using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ShahWilayat.Controllers
{
    [SessionCheck]
    public class FileManagementController : Controller
    {
        // GET: FileManagement

        ShahWilayatEntities context = new ShahWilayatEntities();
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult GetAllParents()
        {
            try
            {
                var lst = context.FileManagements.Where(x => x.IsActive == true && x.IsParent == 1)
             .Select(x => new
             {
                 Id = x.FileManagementId,
                 Value = x.ContentName
             }).ToList();

                return Json(lst, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e, JsonRequestBehavior.AllowGet);
            }
        }
        public string CreateNewFileManagement(FileManagement fm)
        {
            try
            {
                fm.IsActive = true;
                fm.CreatedDate = DateTime.Now;
                fm.CreatedBy = (int)HttpContext.Session["UserId"];
                context.FileManagements.Add(fm);
                context.SaveChanges();
                return "true";

            }
            catch (Exception e)
            {
                return e.ToString();
            }
        }
        public JsonResult GetAllChilds()
        {
            try
            {
                var lst = context.FileManagements.Where(x => x.IsActive == true)
             .Select(x => new
             {
                 Id = x.FileManagementId,
                 Value = x.ContentName,
                 x.ParentId,
                 x.IsChildHead
             }).ToList();

                return Json(lst, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetAllFileManagement()
        {
            try
            {
                var lst = context.FileManagements.Where(x => x.IsActive == true)
             .Select(x => new
             {
                 x.FileManagementId,
                 x.ContentName,
                 x.FilePath,
                 x.ParentId,
                 x.IsParent,
                 x.IsSubParent,
                 x.IsSubChild,
                 x.ParentOrder,
                 x.SubParentOrder,
                 x.SubChildOrder,
                 x.IsChildHead

             }).OrderBy(x => x.ParentOrder).ThenBy(x => x.SubParentOrder).ThenBy(x => x.SubChildOrder).ToList();

                return Json(lst, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e, JsonRequestBehavior.AllowGet);
            }
        }
    }
}