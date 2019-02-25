using System;
using System.Collections.Generic;
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
    public class ItemController : ApiController
    {
        ItemsService itemsService = new ItemsService();
        UserService userService = new UserService();

        [HttpGet, Route("api/items")]
        public List<Item> GetAll()
        {
            List<Item> itemList = itemsService.GetAll();
            return itemList;
        }

        [HttpPost, Route("api/item/post")]
        public HttpResponseMessage Create(ItemsInsertRequest itemsInsertRequest)
        {
            if (itemsInsertRequest == null)
            {
                ModelState.AddModelError("", "Missing body data");
            }
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse
                    (HttpStatusCode.BadRequest, ModelState);
            }

            // FOR EXAMPLE, if you needed the user ID:
           // int userId = Int32.Parse(User.Identity.Name);

            int newId = itemsService.Create(itemsInsertRequest);
            return Request.CreateResponse(HttpStatusCode.OK, newId);
        }
        [HttpPut, Route("api/item/{id:int}")]
        public HttpResponseMessage Update(int Id, ItemUpdateRequest itemUpdateRequest)
        {
            if (itemUpdateRequest == null)
            {
                ModelState.AddModelError("", "No Body Data. sad.");
            }
            else if (Id != itemUpdateRequest.Id)
            {
                return Request.CreateErrorResponse
                    (HttpStatusCode.BadRequest, ModelState);
            }

            itemsService.Update(itemUpdateRequest);

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [HttpDelete, Route("api/item/{Id:int}")]
        public HttpResponseMessage Delete(int Id)
        {
            itemsService.Delete(Id);
            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [HttpGet, Route("api/item/male")]
        public List<Item> GetMale()
        {
            List<Item> itemlist = itemsService.GetMale();

            return itemlist;
        }

        [HttpGet, Route("api/item/female")]
        public List<Item> GetFemale()
        {
            List<Item> itemlist = itemsService.GetFemale();

            return itemlist;
        }

        [HttpGet, Route("api/item/children")]
        public List<Item> GetChildren()
        {
            List<Item> itemlist = itemsService.GetChildren();

            return itemlist;
        }

        [Route("api/item/search" ), HttpGet]
        public HttpResponseMessage Search(string searchString="")
        {
            List<Item> itemlist = itemsService.Search(searchString);

            return Request.CreateResponse(HttpStatusCode.OK, itemlist);
          
        }
    }
}