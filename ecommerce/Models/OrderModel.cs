using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ecommerce.Models
{
    public class OrderModel
    {
        public int OrderId { get; set; }
        public int ItemId { get; set; }
        public int Userid { get; set; }

    }
}