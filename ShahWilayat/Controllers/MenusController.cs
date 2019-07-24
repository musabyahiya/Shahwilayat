using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ShahWilayat.Controllers
{
    [SessionCheck]
    public class MenusController : Controller
    {
        ShahWilayatEntities context = new ShahWilayatEntities();
        // GET: Menus
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetAllMenus()
        {
            var RoleId = (int)HttpContext.Session["RoleId"];
            var lst = context.RoleMenuMappings
           .Where(x => x.IsActive == true && x.MenuItem.IsActive == true && x.RoleId == RoleId)
           .Select(x => new { x.MenuItemId, x.MenuItem.MenuItemName, x.MenuItem.MenuItemURL, x.MenuItem.Icon, x.MenuItem.IsParent, x.MenuItem.MenuOrder, x.MenuItem.ParentId }).OrderBy(x => x.MenuOrder).ToList();
            return Json(lst, JsonRequestBehavior.AllowGet);
        }
    }
}