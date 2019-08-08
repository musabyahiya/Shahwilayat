using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Web;
using System.Web.Mvc;

namespace ShahWilayat.Controllers
{
    [SessionCheck]
    public class PaymentController : Controller
    {
        ShahWilayatEntities context = new ShahWilayatEntities();
        // GET: Payment
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetAllPlotType()
        {
            try
            {
                var lst = context.PlotTypes.Where(x => x.IsActive == true)
             .Select(x => new
             {
                 Id = x.PlotTypeId,
                 Value = x.PlotType1
             }).ToList();

                return Json(lst, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e, JsonRequestBehavior.AllowGet);
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
        public JsonResult GetAllPaymentMethod()
        {
            try
            {
                var lst = context.PaymentMethods.Where(x => x.IsActive == true)
             .Select(x => new
             {
                 Id = x.PaymentMethodId,
                 Value = x.PaymentMethod1
             }).ToList();

                return Json(lst, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetAllPaymentType()
        {
            try
            {
                var lst = context.PaymentTypes.Where(x => x.IsActive == true)
             .Select(x => new
             {
                 Id = x.PaymentTypeId,
                 Value = x.PaymentType1
             }).ToList();

                return Json(lst, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e, JsonRequestBehavior.AllowGet);
            }
        }

        public string GetAllPlots()
        {
            try
            {

                DataSet ds = new DataSet();
                DataTable dt = new DataTable();
                string dbConnectionString = context.Database.Connection.ConnectionString;
                SqlConnection con = new SqlConnection(dbConnectionString);
                SqlDataAdapter da = new SqlDataAdapter("GetPlotsForPayment", con);
                da.SelectCommand.CommandType = CommandType.StoredProcedure;
                da.Fill(dt);

                return JsonConvert.SerializeObject(dt);

            }
            catch (Exception e)
            {
                return e.ToString();
            }

        }



        public string CreateNewPayment(int ChargeId, int PaymentMethodId, string PaymentDate, int MemberId,
            int PlotId, int Size, double PaymentAmount, double RemainingBalance, double PaidPercentBefore,
            double TotalAmount, string DueDate, int PaymentCategoryId, int TenureId, int Rate, int PaymentTypeId)
        {
            try
            {
                DataSet ds = new DataSet();
                DataTable dt = new DataTable();
                string dbConnectionString = context.Database.Connection.ConnectionString;
                SqlConnection con = new SqlConnection(dbConnectionString);
                SqlDataAdapter da = new SqlDataAdapter("SocietyMakePayment", con);
                da.SelectCommand.CommandType = CommandType.StoredProcedure;
                da.SelectCommand.Parameters.Add("@ChargeId", SqlDbType.Int).Value = ChargeId;
                da.SelectCommand.Parameters.Add("@PaymentMethodId", SqlDbType.Int).Value = PaymentMethodId;
                da.SelectCommand.Parameters.Add("@PaymentDate", SqlDbType.DateTime).Value = PaymentDate;
                da.SelectCommand.Parameters.Add("@MemberId", SqlDbType.Int).Value = MemberId;
                da.SelectCommand.Parameters.Add("@PlotId", SqlDbType.Int).Value = PlotId;
                da.SelectCommand.Parameters.Add("@Size", SqlDbType.Int).Value = Size;
                da.SelectCommand.Parameters.Add("@PaymentAmount", SqlDbType.Float).Value = PaymentAmount;
                da.SelectCommand.Parameters.Add("@RemainingBalance", SqlDbType.Float).Value = RemainingBalance;
                da.SelectCommand.Parameters.Add("@PaidPercentBefore", SqlDbType.Float).Value = PaidPercentBefore;
                da.SelectCommand.Parameters.Add("@TotalAmount", SqlDbType.Decimal).Value = TotalAmount;
                da.SelectCommand.Parameters.Add("@DueDate", SqlDbType.DateTime).Value = DueDate;
                da.SelectCommand.Parameters.Add("@PaymentCategoryId", SqlDbType.Int).Value = PaymentCategoryId;
                da.SelectCommand.Parameters.Add("@TenureId", SqlDbType.Int).Value = TenureId;
                da.SelectCommand.Parameters.Add("@Rate", SqlDbType.Int).Value = Rate;
                da.SelectCommand.Parameters.Add("@PaymentTypeId", SqlDbType.Int).Value = PaymentTypeId;
                da.SelectCommand.Parameters.Add("@CreatedBy", SqlDbType.Int).Value = (int)HttpContext.Session["UserId"];
                da.Fill(dt);

                return "true";
            }
            catch (Exception e)
            {
                return e.ToString();
            }
        }
        public JsonResult GetAllCharges()
        {
            try
            {
                var lst = context.Charges.Where(x => x.IsActive == true)
             .Select(x => new
             {
                 Id = x.ChargeId,
                 Value = x.Description.Substring(0, 20) + "..." + " (" + x.PaymentSetup.Tenure.PaymentCategory.PaymentCategory1 + ") "+ " (" + x.PaymentSetup.Rate + " " + "PKR | " + x.PaymentSetup.Tenure.Tenure1 + ")",
                 x.DueDate,
                 x.PaymentSetup.Tenure.StartDate,
                 x.PaymentSetup.Tenure.EndDate,
                 x.PaymentSetup.PlotId,
                 x.PaymentSetup.PlotTypeId,
                 x.PaymentSetup.TenureId,
                 x.PaymentSetup.IsFixed,
                 x.PaymentSetup.HasSizeBase,
                 x.PaymentSetup.SizeFrom,
                 x.PaymentSetup.SizeTo

               
             }).ToList();

                return Json(lst, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e, JsonRequestBehavior.AllowGet);
            }
        }
        public string SendInvoiceEmail(string Html, string Email, string Subject)
        {
            try
            {


                MailMessage message = new MailMessage();
                SmtpClient smtp = new SmtpClient("mail.myhddms.com");
                message.From = new MailAddress("info@myhddms.com", "Housing & Developers Data Management System");
                message.To.Add(new MailAddress(Email));
                message.CC.Add(new MailAddress("femtogen@gmail.com"));



                message.Subject = Subject;
                message.IsBodyHtml = true; //to make message body as html    
                message.Body = Html;
                smtp.Credentials = new NetworkCredential("info@myhddms.com", "musab@12345");
                smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                smtp.Send(message);
                return "true";

            }
            catch (Exception e)
            {
                return e.ToString();
            }
        }

        public string GetPaymentAmount(int ChargeId, int MemberId, int PlotId)
        {
            DataSet ds = new DataSet();
            DataTable dt = new DataTable();
            string dbConnectionString = context.Database.Connection.ConnectionString;
            SqlConnection con = new SqlConnection(dbConnectionString);
            SqlDataAdapter da = new SqlDataAdapter("GetPaymentAmount", con);
            da.SelectCommand.CommandType = CommandType.StoredProcedure;
            da.SelectCommand.Parameters.Add("@ChargeId", SqlDbType.Int).Value = ChargeId;
            da.SelectCommand.Parameters.Add("@MemberId", SqlDbType.Int).Value = MemberId;
            da.SelectCommand.Parameters.Add("@PlotId", SqlDbType.Int).Value = PlotId;
            da.Fill(dt);

            return JsonConvert.SerializeObject(dt);
        }

        public string GetChargesForPayment(string SelectedDate, int PlotId)
        {
            DataSet ds = new DataSet();
            DataTable dt = new DataTable();
            string dbConnectionString = context.Database.Connection.ConnectionString;
            SqlConnection con = new SqlConnection(dbConnectionString);
            SqlDataAdapter da = new SqlDataAdapter("GetChargesForPayment", con);
            da.SelectCommand.CommandType = CommandType.StoredProcedure;
            da.SelectCommand.Parameters.Add("@SelectedDate", SqlDbType.DateTime).Value = SelectedDate;
            da.SelectCommand.Parameters.Add("@PlotId", SqlDbType.Int).Value = PlotId;
            da.Fill(dt);

            return JsonConvert.SerializeObject(dt);
        }
    }
}