using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(JS_FormValidation.Startup))]
namespace JS_FormValidation
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
