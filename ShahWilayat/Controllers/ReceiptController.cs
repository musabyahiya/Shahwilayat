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
    public class ReceiptController : Controller
    {
       
        ShahWilayatEntities context = new ShahWilayatEntities();
        // GET: Receipt
        public ActionResult Index()
        {
            return View();
        }

        public string GetAllReceipt()
        {
            DataSet ds = new DataSet();
            DataTable dt = new DataTable();
            string dbConnectionString = context.Database.Connection.ConnectionString;
            SqlConnection con = new SqlConnection(dbConnectionString);
            SqlDataAdapter da = new SqlDataAdapter("GetPaidReceipt", con);
            da.SelectCommand.CommandType = CommandType.StoredProcedure;
            da.SelectCommand.Parameters.Add("@ReceiptNo", SqlDbType.VarChar).Value = "947";
            da.Fill(dt);

            return JsonConvert.SerializeObject(dt);
        }

    }
}