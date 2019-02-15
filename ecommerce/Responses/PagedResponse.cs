using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ecommerce.Responses
{
        public class PagedResponse<TItem>
        {
            public int TotalCount { get; set; }
            public List<TItem> PagedItems { get; set; }
        }
    
}
