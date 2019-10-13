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
    public class ManagementCommitteePaymentsController : Controller
    {
        ShahWilayatEntities context = new ShahWilayatEntities();
        // GET: ManagementCommitteePayments
        public ActionResult Index()
        {
            return View();
        }
        public string GetRptGetPaymentAmountGeneral()
        {
            try
            {
                DataSet ds = new DataSet();
                DataTable dt = new DataTable();
                string dbConnectionString = context.Database.Connection.ConnectionString;
                SqlConnection con = new SqlConnection(dbConnectionString);
                SqlDataAdapter da = new SqlDataAdapter("RptGetPaymentManagementCommitteeWise", con);
                da.SelectCommand.CommandType = CommandType.StoredProcedure;
                da.Fill(ds);
                return JsonConvert.SerializeObject(ds.Tables[0]);
            }
            catch (Exception e)
            {
                return e.ToString();
            }

        }

    }
}