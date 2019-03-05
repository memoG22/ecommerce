using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;
using System.Data.SqlClient;
using ecommerce.Requests;
using Newtonsoft.Json.Linq;
using System.Data;
using ecommerce.Models;

namespace ecommerce.Services
{
    using BCrypt.Net;
    // FOR EXAMPLE, if you needed the user ID:
    // int userId = Int32.Parse(User.Identity.Name);

    public class UserService
    {
        string connectionString = ConfigurationManager.ConnectionStrings["Default"].ConnectionString;

        public int Register(UserCreateRequest request)
        {
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                con.Open();
                SqlCommand cmd = con.CreateCommand();
                cmd.CommandText = "User_Insert";
                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                string passwordHash = BCrypt.HashPassword(request.PasswordHash);

                cmd.Parameters.AddWithValue("@email", request.Email);
                cmd.Parameters.AddWithValue("@passwordHash", passwordHash);
                cmd.Parameters.Add("@id", SqlDbType.Int).Direction = ParameterDirection.Output;

                cmd.ExecuteNonQuery();

                int newId = (int)cmd.Parameters["@id"].Value;
                return newId;
            }
        }

        public LoginResult Login(UserLoginRequest login)
        {
            LoginResult result = new LoginResult();
            string PasswordHash = "";

            using (SqlConnection con = new SqlConnection(connectionString))
            {
                con.Open();
                SqlCommand cmd = con.CreateCommand();
                cmd.CommandText = "User_GetByEmail";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@email", login.Email);

                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    reader.Read();
                    {

                        result.Id = (int)reader["Id"];
                        result.Email = (string)reader["Email"];
                        PasswordHash = (string)reader["PasswordHash"];

                    };

                   if (BCrypt.Verify(login.Password, PasswordHash))
                    {
                        return result;

                    }

                    else
                    {
                        return null;
                    }
                }
            }
        }

        #region getUser
        public UserModel GetCurrentUser(int Id)
        {
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                con.Open();
                SqlCommand cmd = con.CreateCommand();
                cmd.CommandText = "User_GetById";
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@Id", Id);

                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    reader.Read();
                    var user = new UserModel
                    {
                        Id = (int)reader["Id"],
                        Email = (string)reader["Email"]
                    };
                    return user;
                }
            }
        }
        #endregion
    }
}

        

    
    
