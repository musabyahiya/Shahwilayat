using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(ShahWilayat.Startup))]
namespace ShahWilayat
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
