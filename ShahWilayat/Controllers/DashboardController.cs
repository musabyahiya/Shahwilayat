using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ShahWilayat.Controllers
{
    public class DashboardController : Controller
    {
        // GET: Dashboard
        [SessionCheck]
        public ActionResult Index()
        {
            return View();
        }
    }
}