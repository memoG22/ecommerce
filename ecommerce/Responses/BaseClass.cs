using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ecommerce.Responses
{
    public abstract class BaseClass
    {
        public bool IsSuccessful { get; set; }

        public string TransactionId { get; set; }

        public BaseClass()
        {
            //Sabio: This TxId we are just faking to demo the purpose
            TransactionId = Guid.NewGuid().ToString();
        }
    }
}