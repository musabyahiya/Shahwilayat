using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace ShahWilayat
{
    /// <summary>
    /// Summary description for FileUploadHandler
    /// </summary>
    public class FileUploadHandler : IHttpHandler
    {


        public void ProcessRequest(HttpContext context)
        {
            if (context.Request.Files.Count > 0)
            {
                HttpFileCollection files = context.Request.Files;
                string fname = "";
                // string[] newFname = new string[ConfigurationManager.ConnectionStrings.Count];
                string[] newFname = new string[context.Request.Files.Count];


                DateTime dt = DateTime.Now;
                for (int i = 0; i < files.Count; i++)
                {
                    HttpPostedFile file = files[i];
                    var fileextension = new FileInfo(file.FileName).Extension;
                    string origFname = file.FileName.Substring(0, file.FileName.IndexOf("."));
                    newFname[i] = origFname + "_" + dt.ToString("yyyyMMddHHmmss") + fileextension;
                    fname = context.Server.MapPath("~/Uploads/" + newFname[i]);
                    file.SaveAs(fname);
                }
                context.Response.ContentType = "text/plain";

                context.Response.Write(JsonConvert.SerializeObject(newFname));
            }
        }

        public void ProcessRequestBackup(HttpContext context)
        {
            if (context.Request.Files.Count > 0)
            {
                HttpFileCollection files = context.Request.Files;
                string fname = "";
                string newFname = "";

                DateTime dt = DateTime.Now;
                for (int i = 0; i < files.Count; i++)
                {
                    HttpPostedFile file = files[i];
                    var fileextension = new FileInfo(file.FileName).Extension;
                    string origFname = file.FileName.Substring(0, file.FileName.IndexOf("."));
                    newFname = origFname + "_" + dt.ToString("yyyyMMddHHmmss") + fileextension;
                    fname = context.Server.MapPath("~/Uploads/" + newFname);
                    file.SaveAs(fname);
                }
                context.Response.ContentType = "text/plain";
                context.Response.Write(newFname + "");
            }
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}