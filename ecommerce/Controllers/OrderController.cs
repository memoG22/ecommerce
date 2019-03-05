using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using ecommerce.Models;
using ecommerce.Requests;
using ecommerce.Services;

namespace ecommerce.Controllers
{
    public class OrderController: ApiController
    {
        OrderServices orderServices = new OrderServices();

        [HttpPost, Route("api/deleteorderitem")]
        public HttpResponseMessage Delete(OrderDeleteItemRequest req)
        {
            if (req == null)
            {
                ModelState.AddModelError("", "Missing body data");
            }
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse
                    (HttpStatusCode.BadRequest, ModelState);
            }
            orderServices.DeleteOrderItem(req);
            return Request.CreateResponse(HttpStatusCode.OK);


        }

    [HttpGet, Route("api/getorder/{id:int}")]
        public List<OrderModel> GetOrderByUserId(int id)
        {
            List<OrderModel> order = orderServices.GetOrderByUserId(id);
            return order;
        }

        [HttpPost, Route("api/order/insert")]
        public HttpResponseMessage AddOrder(OrderInsertRequest request)
        {
            if (request == null)
            {
                ModelState.AddModelError("", "Missing body data");
            }
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse
                    (HttpStatusCode.BadRequest, ModelState);
            }
            int orderId = orderServices.OrderInsert(request);
            return Request.CreateResponse(HttpStatusCode.OK, orderId);
        }

    }
}
        