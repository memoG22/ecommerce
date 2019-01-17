using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ecommerce.Requests
{
    public class ItemUpdateRequest : ItemsInsertRequest
    {
        [Required]
        public int? Id { get; set; }
    }
}