using System.Web;
using System.Web.Optimization;

namespace ShahWilayat
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new ScriptBundle("~/bundles/MainlyScripts").Include(
                     "~/Scripts/app-assets/vendors/js/vendors.min.js",
                     "~/Scripts/app-assets/js/core/app-menu.js",
                     "~/Scripts/app-assets/js/core/app.js",
                     "~/Scripts/app-assets/js/scripts/customizer.js",
                     "~/Scripts/assets/js/jquery.tmpl.min.js"
                     ));

            bundles.Add(new ScriptBundle("~/bundles/SweetAlert").Include(
                     "~/Scripts/app-assets/vendors/js/sweetalert/sweetalert.min.js"
                     ));

            bundles.Add(new ScriptBundle("~/bundles/DatePicker").Include(
                  "~/Scripts/app-assets/vendors/js/pickers/pickadate/picker.js",
                  "~/Scripts/app-assets/vendors/js/pickers/pickadate/picker.date.js",
                   "~/Scripts/app-assets/vendors/js/pickers/pickadate/picker.time.js",
                   "~/Scripts/app-assets/vendors/js/pickers/pickadate/legacy.js",
                   "~/Scripts/app-assets/vendors/js/pickers/dateTime/moment-with-locales.min.js",
                   "~/Scripts/app-assets/vendors/js/pickers/daterange/daterangepicker.js",
                   "~/Scripts/app-assets/vendors/js/pickers//dateTime/pick-a-datetime.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/Select2").Include(
                     "~/Scripts/app-assets/vendors/js/forms/select/select2.full.min.js",
                     "~/Scripts/app-assets/vendors/js/forms/select/form-select2.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/FileUpload").Include(
                    "~/Scripts/app-assets/vendors/js/dropzone/dropzone.js",
                    "~/Scripts/app-assets/vendors/js/jasny/jasny-bootstrap.min.js",
                     "~/Scripts/app-assets/vendors/js/codemirror/codemirror.js",
                     "~/Scripts/app-assets/vendors/js/codemirror/mode/xml/xml.js"));

            // CSS Bundle

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));


            bundles.Add(new StyleBundle("~/Content/MainlyCSS").Include(
                     "~/Content/app-assets/css/vendors.css",
                     "~/Content/app-assets/css/bootstrap.min.css",
                     "~/Content/app-assets/css/bootstrap-extended.min.css",
                     "~/Content/app-assets/css/colors.min.css",
                     "~/Content/app-assets/css/components.min.css",
                     "~/Content/app-assets/css/app.css",
                     "~/Content/app-assets/css/core/menu/menu-types/vertical-menu.css",
                     "~/Content/app-assets/css/core/colors/palette-gradient.css",
                     "~/Content/assets/css/style.css"

                  ));

            bundles.Add(new StyleBundle("~/Content/DatePicker").Include(
                "~/Content/app-assets/css/plugins/pickers/daterange/daterange.min.css",
                "~/Content/app-assets/vendors/css/pickers/daterange/daterangepicker.css",
                "~/Content/app-assets/vendors/css/pickers/pickadate/pickadate.css"
             ));

            bundles.Add(new StyleBundle("~/Content/SweetAlert").Include(
              "~/Content/app-assets/css/plugins/sweetalert/sweetalert.css"
           ));

            bundles.Add(new StyleBundle("~/Content/Select2").Include(
            "~/Content/app-assets/vendors/css/forms/selects/select2.min.css"
         ));

            bundles.Add(new StyleBundle("~/Content/FileUpload").Include(
                "~/Content/app-assets/vendors/css/dropzone/basic.css",
                "~/Content/app-assets/vendors/css/dropzone/dropzone.css",
                "~/Content/app-assets/vendors/css/jasny/jasny-bootstrap.min.css",
                "~/Content/app-assets/vendors/css/codemirror/codemirror.css"
            ));
        }
    }
}
