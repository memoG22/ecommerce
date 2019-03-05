using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ecommerce.Requests
{
    public class OrderInsertRequest
    {
        public int ItemId { get; set; }
        public int UserId { get; set; }
    }
}