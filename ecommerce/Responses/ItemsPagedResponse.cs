using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ecommerce.Responses
{
    public class ItemsPagedResponse<TItem>
    {

        public int TotalPages { get; set; }
        public int TotalCount { get; set; }
        public int PageSize { get; set; }
        public int PageIndex { get; set; }
        public List<TItem> PagedItems { get; set; }
        public bool HasPrevPage { get; set; }
        public bool HasNextPage { get; set; }

    }
}