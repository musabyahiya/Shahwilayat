using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ShahWilayat.Controllers
{
    [SessionCheck]
    public class GeneralPaymentAdminController : Controller
    {
        ShahWilayatEntities context = new ShahWilayatEntities();
        // GET: GeneralPaymentAdmin
        public ActionResult Index()
        {
            return View();
        }
        public string GetRptGetPaymentAmountGeneralAdmin()
        {
            try
            {
                DataSet ds = new DataSet();
                DataTable dt = new DataTable();
                string dbConnectionString = context.Database.Connection.ConnectionString;
                SqlConnection con = new SqlConnection(dbConnectionString);
                SqlDataAdapter da = new SqlDataAdapter("RptGetPaymentAmountGeneralAdmin", con);
                da.SelectCommand.CommandType = CommandType.StoredProcedure;
                da.Fill(ds);
                return JsonConvert.SerializeObject(ds.Tables[1]);
            }
            catch (Exception e)
            {
                return e.ToString();
            }


        }
    }
}

    