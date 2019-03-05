using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using ecommerce.Models;
using ecommerce.Requests;

namespace ecommerce.Services
{
    public class OrderServices
    {
        string connectionString = ConfigurationManager.ConnectionStrings["Default"].ConnectionString;

        public List<OrderModel> GetOrderByUserId(int id)
        {
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                con.Open();
                SqlCommand cmd = con.CreateCommand();
                cmd.CommandText = "Order_SelectByUserId";
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@UserId", id);
                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    List<OrderModel> orderList = new List<OrderModel>();
                    while(reader.Read())
                    {
                        OrderModel order = new OrderModel
                        {
                            OrderId = (int)reader["OrderId"],
                            OrderNumber = reader["OrderNumber"] as int? ?? default(int),
                            ItemId = (int)reader["ItemId"],
                            UserId = (int)reader["Userid"],
                            Image = (string)reader["Image"],
                            Id = (int)reader["Id"],
                            Name = (string)reader["Name"],
                            Price = (int)reader["Price"],
                            Gender = (int)reader["Gender"],
                            AgeGroup = (int)reader["AgeGroup"],
                            Size = (string)reader["Size"],
                            ItemType = (int)reader["ItemType"],
                            Description = (string)reader["Description"]
                        };
                        orderList.Add(order);
                    };
                    return orderList;
                }
            }

        }

        public int OrderInsert(OrderInsertRequest request)
        {
            using (SqlConnection con = new SqlConnection(connectionString))
                {
                con.Open();
                SqlCommand cmd = con.CreateCommand();
                cmd.CommandText = "Order_Insert";
                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@ItemId", request.ItemId);
                cmd.Parameters.AddWithValue("@UserId", request.UserId);
                cmd.Parameters.Add("OrderId", SqlDbType.Int).Direction = ParameterDirection.Output;
                cmd.ExecuteNonQuery();

                int orderId = (int)cmd.Parameters["OrderId"].Value;
                return orderId;
            }
        }

        public void DeleteOrderItem(OrderDeleteItemRequest req)
        {
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                con.Open();
                SqlCommand cmd = con.CreateCommand();
                cmd.CommandText = "Order_DeleteItem";
                cmd.CommandType = CommandType.StoredProcedure;

                //cmd.Parameters.AddWithValue("@ItemId", req.ItemId);
                cmd.Parameters.AddWithValue("@OrderId", req.OrderId);

                cmd.ExecuteNonQuery();
            }
        }
    }
}