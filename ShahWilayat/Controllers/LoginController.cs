using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ShahWilayat.Controllers
{
    public class LoginController : Controller
    {
        ShahWilayatEntities context = new ShahWilayatEntities();
        // GET: Login
        public ActionResult Index()
        {
            return View();
        }
        public bool Login(string Email, string Password)
        {


            var obj = context.Users.FirstOrDefault(x => x.IsActive == true && x.Email == Email && x.Password == Password);
            if (obj != null)
            {
                Session["Email"] = obj.Email;
                Session["FirstName"] = obj.FirstName;
                Session["lastname"] = obj.LastName;
                Session["RoleId"] = obj.RoleId;
                Session["Role"] = obj.Role.Role1;
                Session["UserId"] = obj.UserId;

                return true;
            }
            else
            {
                return false;
            }
        }
        public bool Logout()
        {
            Session["Email"] = null;
            Session["FirstName"] = null;
            Session["lastname"] = null;
            Session["RoleId"] = null;
            Session["Role"] = null;
            Session["UserId"] = null;

            return true;
        }
    }
}