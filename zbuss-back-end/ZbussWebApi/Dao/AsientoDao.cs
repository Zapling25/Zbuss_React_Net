using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;
using ZbussWebApi.Interfaz;
using ZbussWebApi.Models.Bus;

namespace ZbussWebApi.Dao
{
    public class AsientoDao : IAsientoDao
    {
        private readonly IConfiguration _configuration;

        public AsientoDao(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public List<Asiento> ListarAsientos(int IdBus)
        {
            string connectionString = _configuration.GetConnectionString("cadenaSql");

            List<Asiento> lstAsientos = new List<Asiento>();
            try
            {
                using (SqlConnection cn = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = cn.CreateCommand();
                    cn.Open();
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = @"ZB_SP_API_ASIENTOS_SEL";
                    cmd.Parameters.Add("@PARAM_IN_ID_BUS", SqlDbType.Int).Value = IdBus;

                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            Asiento oAsiento = new Asiento();
                            oAsiento.Id = (reader["IN_ID_ASIENTO"] == DBNull.Value) ? 0 : Convert.ToInt32(reader["IN_ID_ASIENTO"]);
                            oAsiento.IdBus = (reader["IN_ID_BUS"] == DBNull.Value) ? 0 : Convert.ToInt32(reader["IN_ID_BUS"]);
                            oAsiento.NumeroAsiento = (reader["CH_NUMERO_ASIENTO"] == DBNull.Value) ? String.Empty : Convert.ToString(reader["CH_NUMERO_ASIENTO"]);
                            oAsiento.Inclinacion = (reader["VC_INCLINACION"] == DBNull.Value) ? String.Empty : Convert.ToString(reader["VC_INCLINACION"]);
                            lstAsientos.Add(oAsiento);
                        }
                    }
                    cn.Close();
                }
            }
            catch (Exception ex)
            {
                lstAsientos = new List<Asiento>();
            }
            return lstAsientos;
        }
    }
}
