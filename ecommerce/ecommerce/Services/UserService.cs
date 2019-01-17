using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;
using System.Data.SqlClient;
using ecommerce.Requests;
using Newtonsoft.Json.Linq;
using System.Data;
using BCrypt.Net;
using ecommerce.Models;

namespace ecommerce.Services
{

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

                string passwordHash = BCrypt.Net.BCrypt.HashPassword(request.PasswordHash);

                cmd.Parameters.AddWithValue("@email", request.Email);
                cmd.Parameters.AddWithValue("@passwordHash", passwordHash);
                cmd.Parameters.Add("@id", SqlDbType.Int).Direction = ParameterDirection.Output;

                cmd.ExecuteNonQuery();

                int newId = (int)cmd.Parameters["@id"].Value;
                return newId;

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

        public LoginResult Login(UserLoginRequest login)
        {


            using (SqlConnection con = new SqlConnection(connectionString))
            {
                con.Open();
                SqlCommand cmd = con.CreateCommand();
                cmd.CommandText = "User_GetByEmail";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Email", login.Email);

                using (SqlDataReader reader = cmd.ExecuteReader())
                {

                    reader.Read();
                    LoginResult result = new LoginResult();
                    string PasswordHash = "";


                    {
                        result.Id = (int)reader["Id"];
                        result.Email = (string)reader["Email"];
                        PasswordHash = (string)reader["PasswordHash"];
                    };

                    if (BCrypt.Net.BCrypt.Verify(login.PasswordHash, PasswordHash))
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

        }

    }

        

    
    
