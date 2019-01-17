using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ecommerce.Responses
{
    public class ErrorResponse:BaseClass
    {

        public List<String> Errors { get; set; }

        public ErrorResponse(string errMsg)
        {
            Errors = new List<string>();
            Errors.Add(errMsg);

            IsSuccessful = false;
        }

        public ErrorResponse(IEnumerable<String> errMsg)
        {
            Errors = new List<string>();
            Errors.AddRange(errMsg);

            IsSuccessful = false;
        }


    }
}