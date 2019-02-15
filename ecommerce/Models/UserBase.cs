using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ecommerce.Models
{
    public class UserBase : IUserAuthData
    {
        public int Id { get; set; }
        public string Email { get; set; }
    }
}