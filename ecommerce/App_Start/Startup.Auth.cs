using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ecommerce.Providers;
using Microsoft.Owin.Security.OAuth;
using Owin;

namespace ecommerce
{
    public partial class Startup
    {
        public static OAuthAuthorizationServerOptions OAuthOptions { get; private set; }
        static Startup()
        {
            OAuthOptions = new OAuthAuthorizationServerOptions
            {
                TokenEndpointPath = new Microsoft.Owin.PathString("/token"),
                Provider = new OAuthAppProvider(),
                AccessTokenExpireTimeSpan = TimeSpan.FromDays(2),
                AllowInsecureHttp = true
            };
        }
        public void ConfigurationAuth(IAppBuilder app)
        {
            app.UseOAuthBearerTokens(OAuthOptions);
        }
    }
}