using System;
using System.Data;
using System.Data.SqlClient;


namespace DataProcessor.DataServices
{
    public class BaseService
    {
        private readonly string connectionString = Environment.GetEnvironmentVariable("sqldb_connection");
        protected SqlConnection GetSqlConnection()
        {
            try
            {
                SqlConnection con = new SqlConnection(connectionString);
                if (con.State == ConnectionState.Closed)
                    con.Open();

                return con;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
