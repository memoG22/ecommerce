using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ecommerce.Responses
{
    public class ItemResponse<T> :IsSuccessful
    {
        public T Item { get; set; }
    }
}