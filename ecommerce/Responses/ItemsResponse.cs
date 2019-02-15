using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ecommerce.Responses
{
    public class ItemsResponse<T>:IsSuccessful
    {
        public List<T> Items { get; set; }
    }
}