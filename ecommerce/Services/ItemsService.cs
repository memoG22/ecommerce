using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.UI.WebControls;
using ecommerce.Models;
using ecommerce.Requests;
using ecommerce.Responses;

namespace ecommerce.Services
{
    public class ItemsService
    {
        string connectionString = ConfigurationManager.ConnectionStrings["Default"].ConnectionString;

        #region GetAll
        public List<Item> GetAll()
        {

            using (SqlConnection con = new SqlConnection(connectionString))

            {

                con.Open();
                SqlCommand cmd = con.CreateCommand();
                cmd.CommandText = "Item_SelectAll";
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                {
                    using (SqlDataReader reader = cmd.ExecuteReader())


                    {
                        List<Item> itemList = new List<Item>();
                        while (reader.Read())
                        {

                            Item item = new Item
                            {
                                Id = (int)reader["Id"],
                                Name = (string)reader["Name"],
                                Price = (int)reader["Price"],
                                Image = (string)reader["Image"],
                                Gender = (int)reader["Gender"],
                                AgeGroup = (int)reader["AgeGroup"],
                                Size = (string)reader["Size"],
                                ItemType = (int)reader["ItemType"],
                                Description = (string)reader["Description"]
                            };
                            itemList.Add(item);
                        }
                        return itemList;
                    }
                }
            }

        }
#endregion


        #region create  
        public int Create(ItemsInsertRequest request)
        {
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                con.Open();
                SqlCommand cmd = con.CreateCommand();
                cmd.CommandText = "Item_Insert";
                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@Name", request.Name);
                cmd.Parameters.AddWithValue("@Price", request.Price);
                cmd.Parameters.AddWithValue("@Image", request.Image);
                cmd.Parameters.AddWithValue("@Gender", request.Gender);
                cmd.Parameters.AddWithValue("@AgeGroup", request.AgeGroup);
                cmd.Parameters.AddWithValue("@Size", request.Size);
                cmd.Parameters.AddWithValue("@ItemType", request.ItemType);
                cmd.Parameters.AddWithValue("@Description", request.ItemType);
                cmd.Parameters.Add("@Id", SqlDbType.Int).Direction = ParameterDirection.Output;

                cmd.ExecuteNonQuery();

                int newId = (int)cmd.Parameters["@Id"].Value;
                return newId;



            }
        }
#endregion

        #region Update
        public void Update(ItemUpdateRequest request)
        {
            using (SqlConnection con = new SqlConnection(connectionString))
            {

                con.Open();
                SqlCommand cmd = con.CreateCommand();
                cmd.CommandText = "Item_Update";
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@Id", request.Id);
                cmd.Parameters.AddWithValue("@Name", request.Name);
                cmd.Parameters.AddWithValue("@Image", request.Image);
                cmd.Parameters.AddWithValue("@Price", request.Price);
                cmd.Parameters.AddWithValue("@Gender", request.Gender);
                cmd.Parameters.AddWithValue("@AgeGroup", request.AgeGroup);
                cmd.Parameters.AddWithValue("@Size", request.Size);
                cmd.Parameters.AddWithValue("@ItemType", request.ItemType);
                cmd.Parameters.AddWithValue("@Description", request.Description);


                cmd.ExecuteNonQuery();
            }
        }
#endregion

        #region Delete
        public void Delete(int Id)
        {
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                con.Open();

                SqlCommand cmd = con.CreateCommand();
                cmd.CommandText = "Item_Delete";
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@Id", Id);

                cmd.ExecuteNonQuery();
            }
        }
         #endregion

        #region Getmale
        public List<Item> GetMale()
        {
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                con.Open();
                SqlCommand cmd = con.CreateCommand();
                cmd.CommandText = "ItemSelect_Male";
                cmd.CommandType = CommandType.StoredProcedure;

                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    List<Item> items = new List<Item>();
                    while(reader.Read())
                    {
                        Item item = new Item
                        {

                            Id = (int)reader["Id"],
                            Name = (string)reader["Name"],
                            Price = (int)reader["Price"],
                            Image = (string)reader["Image"],
                            Gender = (int)reader["Gender"],
                            AgeGroup = (int)reader["AgeGroup"],
                            Size = (string)reader["Size"],
                            ItemType = (int)reader["ItemType"]

                        };
                        items.Add(item);

                    }
                    return items;

                }
            }
        }
#endregion

        #region GetFemale
        public List<Item> GetFemale()
        {
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                con.Open();
                SqlCommand cmd = con.CreateCommand();
                cmd.CommandText = "ItemSelect_Female";
                cmd.CommandType = CommandType.StoredProcedure;

                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    List<Item> items = new List<Item>();
                    while (reader.Read())
                    {
                        Item item = new Item
                        {

                            Id = (int)reader["Id"],
                            Name = (string)reader["Name"],
                            Price = (int)reader["Price"],
                            Image = (string)reader["Image"],
                            Gender = (int)reader["Gender"],
                            AgeGroup = (int)reader["AgeGroup"],
                            Size = (string)reader["Size"],
                            ItemType = (int)reader["ItemType"]

                        };
                        items.Add(item);

                    }
                    return items;

                }
            }
        }
#endregion


        #region GetChildren
        public List<Item> GetChildren()
        {
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                con.Open();
                SqlCommand cmd = con.CreateCommand();
                cmd.CommandText = "ItemSelect_Children";
                cmd.CommandType = CommandType.StoredProcedure;

                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    List<Item> items = new List<Item>();
                    while (reader.Read())
                    {
                        Item item = new Item
                        {

                            Id = (int)reader["Id"],
                            Name = (string)reader["Name"],
                            Price = (int)reader["Price"],
                            Image = (string)reader["Image"],
                            Gender = (int)reader["Gender"],
                            AgeGroup = (int)reader["AgeGroup"],
                            Size = (string)reader["Size"],
                            ItemType = (int)reader["ItemType"]

                        };
                        items.Add(item);

                    }
                    return items;

                }
            }
        }
        #endregion

      

        public List<Item> Search(string searchString)
        {
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                con.Open();
                SqlCommand cmd = con.CreateCommand();
                cmd.CommandText = "Item_Search";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@searchString", searchString);


                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    
                    List<Item> items = new List<Item>();
                    while (reader.Read())
                    {
                        Item item = new Item
                        {

                            Id = (int)reader["Id"],
                            Name = (string)reader["Name"],
                            Price = (int)reader["Price"],
                            Image = (string)reader["Image"],
                            Gender = (int)reader["Gender"],
                            AgeGroup = (int)reader["AgeGroup"],
                            Size = (string)reader["Size"],
                            ItemType = (int)reader["ItemType"]

                        };
                        items.Add(item);

                    }
                    return items;

                }
            }
        }
    }

}

                      

                            

                        
                        

                            



    
