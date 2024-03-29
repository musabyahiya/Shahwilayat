﻿using System;
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
    public class AssociateTransferController : Controller
    {
        ShahWilayatEntities context = new ShahWilayatEntities();
        // GET: AssociateTransfer
        public ActionResult Index()
        {
            return View();
        }

        public string CreateNewTransfer(AssociateTransfer tr)
        {
            try
            {
                GetCurrentAssociateAllottees();
                var obj = context.AssociateTempTables.FirstOrDefault(x => x.PlotId == tr.PlotId);
                int MemberId = obj.MemberId;


                if (CheckDuplicateAllotment(tr.MemberId, tr.PlotId) == "true")
                {

                    UpdateTransferedFile(tr, "Create");
                    tr.IsActive = true;
                    tr.CreatedDate = DateTime.Now;
                    tr.CreatedBy = (int)HttpContext.Session["UserId"];
                    context.AssociateTransfers.Add(tr);
                    context.SaveChanges();
                    ActivateAssociateGoneMember(MemberId, tr.PlotId);
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

        public string ActivateAssociateGoneMember(int MemberId, int PlotId)
        {
            try
            {
                DataSet ds = new DataSet();
                DataTable dt = new DataTable();
                string dbConnectionString = context.Database.Connection.ConnectionString;
                SqlConnection con = new SqlConnection(dbConnectionString);
                SqlDataAdapter da = new SqlDataAdapter("ActivateAssociateGoneMember", con);
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
        public void GetCurrentAssociateAllottees()
        {
            try
            {
                DataSet ds = new DataSet();
                DataTable dt = new DataTable();
                string dbConnectionString = context.Database.Connection.ConnectionString;

                SqlConnection con = new SqlConnection(dbConnectionString);
                SqlDataAdapter da = new SqlDataAdapter("GetCurrentAssociateAllottees", con);
                da.SelectCommand.CommandType = CommandType.StoredProcedure;
                da.Fill(dt);
            }


            catch (Exception e)
            {

            }
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

        public string UpdateAttachments(AssociateTransfer tr)
        {
            try
            {
                var obj = context.AssociateTransfers.FirstOrDefault(x => x.AssociateTransferId == tr.AssociateTransferId);
                obj.NewspaperScan = tr.NewspaperScan;
                obj.IndemnityBondScan = tr.IndemnityBondScan;
                obj.MCMDate = tr.MCMDate;

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

        public string UpdateTransferedFile(AssociateTransfer tr, string Action)
        {
            try
            {
                if (Action == "Create")
                {
                    using (var db = new ShahWilayatEntities())
                    {
                        var rows = db.AssociateTransfers.Where(x => x.PlotId == tr.PlotId).ToList();
                        rows.ForEach(a => a.IsTransfered = false);
                        db.SaveChanges();
                    }
                }
                else
                {
                    using (var db = new ShahWilayatEntities())
                    {
                        var rows = db.AssociateTransfers.Where(x => x.PlotId == tr.PlotId && x.AssociateTransferId != tr.AssociateTransferId).ToList();
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




        public string DeleteTransfer(AssociateTransfer tr)
        {
            try
            {
                var obj = context.AssociateTransfers.FirstOrDefault(x => x.AssociateTransferId == tr.AssociateTransferId);
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
                var lst = context.AssociateTransfers.Where(x => x.IsActive == true && x.IsTransfered == true)
             .Select(x => new
             {
                 x.AssociateTransferId,
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
                GetCurrentAssociateAllottees();
                var lst = context.AssociateTempTables.FirstOrDefault(x => x.MemberId == MemberId && x.PlotId == PlotId);

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



        public string CheckAllotteeIsTransfered(int PlotId)
        {
            try
            {
                var obj = context.AssociateTransfers.FirstOrDefault(x => x.PlotId == PlotId && x.IsActive == true);
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