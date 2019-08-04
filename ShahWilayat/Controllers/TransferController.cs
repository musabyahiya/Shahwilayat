using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ShahWilayat.Controllers
{
    [SessionCheck]
    public class TransferController : Controller
    {
        ShahWilayatEntities context = new ShahWilayatEntities();
        // GET: Transfer
        public ActionResult Index()
        {
            return View();
        }

        public string CreateNewTransfer(Transfer tr)
        {
            try
            {
                GetCurrentAllottees();
                var obj = context.TempTables.FirstOrDefault(x => x.PlotId == tr.PlotId);
                int MemberId = obj.MemberId;


                if ((CheckFullPaid(tr.PlotId) == "true") && (CheckDuplicateAllotment(tr.MemberId, tr.PlotId) == "true"))
                {

                    UpdateTransferedFile(tr, "Create");
                    tr.IsActive = true;
                    tr.CreatedDate = DateTime.Now;
                    tr.CreatedBy = (int)HttpContext.Session["UserId"];
                    context.Transfers.Add(tr);
                    context.SaveChanges();

                    ActivateGoneMember(MemberId, tr.PlotId);
                    SetPaymentTransfered(MemberId, tr.PlotId);
                    return "true";


                }
                else
                {
                    return "false";
                }


            }
            catch (Exception e)
            {
                return e.ToString();
            }
        }

        public string ActivateGoneMember(int MemberId, int PlotId)
        {
            try
            {
                DataSet ds = new DataSet();
                DataTable dt = new DataTable();
                string dbConnectionString = context.Database.Connection.ConnectionString;
                SqlConnection con = new SqlConnection(dbConnectionString);
                SqlDataAdapter da = new SqlDataAdapter("ActivateGoneMember", con);
                da.SelectCommand.CommandType = CommandType.StoredProcedure;
                da.SelectCommand.Parameters.Add("@MemberId", SqlDbType.Int).Value = MemberId;
                da.SelectCommand.Parameters.Add("@PlotId", SqlDbType.Int).Value = PlotId;
                da.Fill(ds);
                return "true";
            }
            catch (Exception e)
            {
                return "false";
            }

        }

        public string SetPaymentTransfered(int MemberId, int PlotId)
        {
            try
            {
                using (var db = new ShahWilayatEntities())
                {
                    var rows = db.SocietyPayments.Where(x => x.MemberId == MemberId && x.PlotId == PlotId).ToList();
                    rows.ForEach(a => a.IsTransfered = true);
                    db.SaveChanges();
                }



                return "true";
            }
            catch (Exception e)
            {
                return e.ToString();
            }

          ;
        }
        public void GetCurrentAllottees()
        {


            DataSet ds = new DataSet();
            DataTable dt = new DataTable();
            string dbConnectionString = context.Database.Connection.ConnectionString;
            SqlConnection con = new SqlConnection(dbConnectionString);
            SqlDataAdapter da = new SqlDataAdapter("GetCurrentAllottees", con);
            da.SelectCommand.CommandType = CommandType.StoredProcedure;
            da.Fill(dt);

        }
        public string UpdateTransfer(Transfer tr)
        {
            try
            {
                var obj = context.Transfers.FirstOrDefault(x => x.TransferId == tr.TransferId);
                obj.TransferOrderNo = tr.TransferOrderNo;
                obj.TransferDate = tr.TransferDate;
                obj.MCMDate = tr.MCMDate;
                obj.NewspaperAdvDate = tr.NewspaperAdvDate;
                obj.NewspaperName = tr.NewspaperName;
                obj.ModifiedDate = DateTime.Now;
                obj.ModifiedBy = (int)HttpContext.Session["UserId"];
                context.Entry(obj).State = EntityState.Modified;
                context.SaveChanges();
                return "true";

            }
            catch (Exception e)
            {
                return e.ToString();
            }
        }

        public string UpdateAttachments(Transfer tr)
        {
            var obj = context.Transfers.FirstOrDefault(x => x.TransferId == tr.TransferId);
            obj.NewspaperScan = tr.NewspaperScan;
            obj.IndemnityBondScan = tr.IndemnityBondScan;
            obj.MCMDate = tr.MCMDate;
          
            obj.ModifiedDate = DateTime.Now;
            obj.ModifiedBy = (int)HttpContext.Session["UserId"];
            context.Entry(obj).State = EntityState.Modified;
            context.SaveChanges();
            return "true";
        }

        public string UpdateTransferedFile(Transfer tr, string Action)
        {
            try
            {
                if (Action == "Create")
                {
                    using (var db = new ShahWilayatEntities())
                    {
                        var rows = db.Transfers.Where(x => x.PlotId == tr.PlotId).ToList();
                        rows.ForEach(a => a.IsTransfered = false);
                        db.SaveChanges();
                    }
                }
                else
                {
                    using (var db = new ShahWilayatEntities())
                    {
                        var rows = db.Transfers.Where(x => x.PlotId == tr.PlotId && x.TransferId != tr.TransferId).ToList();
                        rows.ForEach(a => a.IsTransfered = false);
                        db.SaveChanges();
                    }

                }

                return "true";
            }
            catch (Exception e)
            {
                return e.ToString();
            }
        }


        public string CreateNewTransferLogs(Transfer tr)
        {
            try
            {
                var obj = new TransferLog();
                obj.TransferId = tr.TransferId;
                obj.MemberId = tr.MemberId;
                obj.PlotId = tr.PlotId;
                obj.TransferDate = tr.TransferDate;
                obj.IsActive = true;
                obj.CreatedDate = DateTime.Now;
                obj.CreatedBy = (int)HttpContext.Session["UserId"];
                context.TransferLogs.Add(obj);
                context.SaveChanges();
                return "true";

            }
            catch (Exception e)
            {
                return e.ToString();
            }
        }

        public string DeleteTransfer(Transfer tr)
        {
            try
            {
                var obj = context.Transfers.FirstOrDefault(x => x.TransferId == tr.TransferId);
                obj.IsActive = false;
                obj.ModifiedDate = DateTime.Now;
                obj.ModifiedBy = (int)HttpContext.Session["UserId"];
                context.Entry(obj).State = EntityState.Modified;
                context.SaveChanges();
                return "true";

            }
            catch (Exception e)
            {
                return e.ToString();
            }
        }

        public JsonResult GetAllPlots()
        {
            try
            {
                var lst = context.Plots.Where(x => x.IsActive == true && x.HasAlotted == true)
             .Select(x => new
             {
                 Id = x.PlotId,
                 Value = x.PlotNo + " (" + x.PlotSize.PlotSize1 + " - " + x.Unit.Unit1 + ")"
             }).ToList();

                return Json(lst, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetAllTransfers()
        {
            try
            {
                var lst = context.Transfers.Where(x => x.IsActive == true && x.IsTransfered == true)
             .Select(x => new
             {
                 x.TransferId,
                 x.PlotId,
                 x.TransferOrderNo,
                 Plot = x.Plot.PlotNo + " (" + x.Plot.PlotSize.PlotSize1 + " - " + x.Plot.Unit.Unit1 + ")",
                 x.MemberId,
                 Member = x.Member.FirstName + " " + x.Member.LastName,
                 x.Member.MembershipNo,
                 x.TransferDate,
                 x.MCMDate,
                 x.NewspaperAdvDate,
                 x.NewspaperName,
                 x.NewspaperScan,
                 x.IndemnityBondScan

             }).ToList();

                return Json(lst, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e, JsonRequestBehavior.AllowGet);
            }
        }

        public string CheckDuplicateAllotment(int MemberId, int PlotId)
        {
            try
            {
                GetCurrentAllottees();
                var lst = context.TempTables.FirstOrDefault(x => x.MemberId == MemberId && x.PlotId == PlotId);

                if (lst == null)
                {
                    return "true";
                }

                else
                {
                    return "false";
                }

            }
            catch (Exception e)
            {
                return e.ToString();
            }
        }

        public string CheckFullPaid(int PlotId)
        {
            try
            {

                DataSet ds = new DataSet();
                DataTable dt = new DataTable();
                string dbConnectionString = context.Database.Connection.ConnectionString;
                SqlConnection con = new SqlConnection(dbConnectionString);
                SqlDataAdapter da = new SqlDataAdapter("CheckFullPaid", con);
                da.SelectCommand.Parameters.Add("@PlotId", SqlDbType.Int).Value = PlotId;
                da.SelectCommand.CommandType = CommandType.StoredProcedure;
                da.Fill(ds);
                dt = ds.Tables[1];
                string result = dt.Rows[0]["HasPaid"].ToString() == "1" ? "true" : "false";
                return result;

            }
            catch (Exception e)
            {
                return e.ToString();
            }
        }

        public string CheckAllotteeIsTransfered(int PlotId)
        {
            try
            {

                var obj = context.Transfers.FirstOrDefault(x => x.PlotId == PlotId && x.IsActive == true);
                if (obj == null)
                {
                    return "false";
                }
                else
                {
                    return "true"; // record is exist on transfer
                }

            }
            catch (Exception e)
            {
                return e.ToString();
            }
        }
        public JsonResult GetAllMembers()
        {
            try
            {
                var lst = context.Members.Where(x => x.IsActive == true && x.IsMember == true)
             .Select(x => new
             {
                 Id = x.MemberId,
                 Value = x.FirstName + " " + x.LastName + " " + "(" + x.MembershipNo + ")"
             }).ToList();

                return Json(lst, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e, JsonRequestBehavior.AllowGet);
            }
        }
    }
}