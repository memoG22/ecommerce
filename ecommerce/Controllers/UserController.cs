using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Security;
using ecommerce.Models;
using ecommerce.Requests;
using ecommerce.Responses;
using ecommerce.Services;
using ecommerce.Services.Interfaces;

namespace ecommerce.Controllers
{
    public class UserController : ApiController
    {
        UserService userService = new UserService();
        IAuthenticationService authService;

        [HttpPost, Route("api/create/user")]
        public HttpResponseMessage Register(UserCreateRequest request)

        {
            if (request == null)
            {
                ModelState.AddModelError("", "Missing body data");
            }
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse
                    (HttpStatusCode.BadRequest, ModelState);
            }

            int newid = userService.Register(request);
            // call into your service and get back the user id
            int userId = newid;

            // This is how you set the cookie
            FormsAuthentication.SetAuthCookie(userId.ToString(), true);
            return Request.CreateResponse(HttpStatusCode.OK, newid);
        }

        [HttpPost, Route("api/login")]
        public HttpResponseMessage Login(UserLoginRequest userLogin)
        {
            LoginResult result = userService.Login(userLogin);
            if (result != null && result.Id.HasValue)
            {
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }

            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, new ErrorResponse("Invalid username or password"));
            }
        }
    }
}


    // FOR EXAMPLE, if you needed the user ID:
    //int userId = Int32.Parse(User.Identity.Name);

    //  return Request.CreateResponse(HttpStatusCode.OK, userId);

// [HttpGet, Route("api/currentuser/{Id:int}")]
// public UserModel GetCurrentUser(int Id)
// public HttpResponseMessage GetCurrentUser(int Id)
//{

//  return userService.GetCurrentUser(Id);
//int userId = Int32.Parse(User.Identity.Name);
// UserModel user = userService.GetCurrentUser(Id);

// return Request.CreateResponse( HttpStatusCode.OK, user);
// }
