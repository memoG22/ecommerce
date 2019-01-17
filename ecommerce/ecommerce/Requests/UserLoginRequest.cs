using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ecommerce.Requests
{
    public class UserLoginRequest
    {
        public string Email { get; set; }
        public string PasswordHash { get; set; }

    }
}