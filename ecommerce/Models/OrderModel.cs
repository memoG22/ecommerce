using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ecommerce.Models
{
    public class OrderModel
    {
        public int OrderId { get; set; }
        public int? OrderNumber { get; set; }
        public int ItemId { get; set; }
        public int UserId { get; set; }
        public int Id { get; set; }
        public string Image { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public string Description { get; set; }
        public int Gender { get; set; }
        public int AgeGroup { get; set; }
        public string Size { get; set; }
        public int ItemType { get; set; }

    }
}