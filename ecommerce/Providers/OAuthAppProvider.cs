using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using ecommerce.Models;
using ecommerce.Requests;
using ecommerce.Services;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.OAuth;

namespace ecommerce.Providers
{
    public class OAuthAppProvider :OAuthAuthorizationServerProvider
    {
        public override Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            return Task.Factory.StartNew(() =>
            {
                UserLoginRequest req = new UserLoginRequest();
                var userService = new UserService();
                LoginResult loginRes = userService.Login(req);
                if (loginRes != null)
                {
                    var claims = new List<Claim>()
                    {
                    new Claim(ClaimTypes.Email, loginRes.Email),
                    new Claim(ClaimTypes.Name, loginRes.Email )
                };
                    ClaimsIdentity oAuthIdentity = new ClaimsIdentity(claims, Startup.OAuthOptions.AuthenticationType);
                    context.Validated(new AuthenticationTicket(oAuthIdentity, new AuthenticationProperties() { }));
                }
                else
                {
                    context.SetError("Invalid_grant", "Error");
                }
            }
          );
        }
    }
}