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
    public class PlotTransferAdminController : Controller
    {
        ShahWilayatEntities context = new ShahWilayatEntities();
        // GET: PlotTransferAdmin
        public ActionResult Index()
        {
            return View();
        }

        public string GetRptPlotTransferAdmin()
        {
            try
            {
                DataSet ds = new DataSet();
                DataTable dt = new DataTable();
                string dbConnectionString = context.Database.Connection.ConnectionString;
                SqlConnection con = new SqlConnection(dbConnectionString);
                SqlDataAdapter da = new SqlDataAdapter("RptPlotTransferAdmin", con);
                da.SelectCommand.CommandType = CommandType.StoredProcedure;
                da.Fill(dt);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception e)
            {
                return e.ToString();
            }

        }
    }
}