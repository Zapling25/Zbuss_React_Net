using System.Data.SqlClient;
using System.Data;
using System.Text;
using ZbussWebApi.Interfaz;
using ZbussWebApi.Models;
using ZbussWebApi.Models.Bus;
using ZbussWebApi.Models.Usuario;

namespace ZbussWebApi.Dao
{
    public class BusDao : IBusDao
    {
        private readonly IConfiguration _configuration;

        public BusDao(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string ActualizarBus(Bus oBus)
        {
            string connectionString = _configuration.GetConnectionString("cadenaSql");

            string res = "0";
            try
            {
                using (SqlConnection cn = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = cn.CreateCommand();
                    cn.Open();
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = @"ZB_SP_API_UPD_BUS";
                    cmd.Parameters.Add("@PARAM_IN_ID_BUS", SqlDbType.Int).Value = oBus.Id;
                    cmd.Parameters.Add("@PARAM_CH_PLACA", SqlDbType.Char).Value = oBus.Placa;
                    cmd.Parameters.Add("@PARAM_DE_PESO_NETO", SqlDbType.Decimal).Value = oBus.PesoNeto;
                    cmd.Parameters.Add("@PARAM_VC_CATEGORIA", SqlDbType.VarChar).Value = oBus.Categoria;

                    int result = cmd.ExecuteNonQuery();
                    if (result == 1) { res = "1"; }
                    cn.Close();
                }
            }
            catch (Exception ex)
            {
                res = "0";
            }
            return res;
        }

        public string EliminarBus(int id)
        {
            string connectionString = _configuration.GetConnectionString("cadenaSql");

            string res = "0";
            try
            {
                using (SqlConnection cn = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = cn.CreateCommand();
                    cn.Open();
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = @"ZB_SP_API_DEL_BUS";
                    cmd.Parameters.Add("@PARAM_IN_ID_BUS", SqlDbType.Int).Value = id;

                    int result = cmd.ExecuteNonQuery();
                    if (result > 0) { res = "1"; }
                    cn.Close();
                }
            }
            catch (Exception ex)
            {
                throw;
            }
            return res;
        }

        public string GuardarBus(Bus oBus)
        {
            string connectionString = _configuration.GetConnectionString("cadenaSql");

            string res = "0";
            try
            {
                using (SqlConnection cn = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = cn.CreateCommand();
                    cn.Open();
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = @"ZB_SP_API_INS_BUS";
                    cmd.Parameters.Add("@PARAM_CH_PLACA", SqlDbType.Char).Value = oBus.Placa;
                    cmd.Parameters.Add("@PARAM_VC_CATEGORIA", SqlDbType.VarChar).Value = oBus.Categoria;
                    cmd.Parameters.Add("@PARAM_DE_PESO_NETO", SqlDbType.Decimal).Value = oBus.PesoNeto;
                    cmd.Parameters.Add("@PARAM_IN_PISOS", SqlDbType.Int).Value = oBus.Pisos;
                    cmd.Parameters.Add("@PARAM_IN_ASIENTOS_1", SqlDbType.Int).Value = oBus.AsientosPiso1;
                    cmd.Parameters.Add("@PARAM_IN_ASIENTOS_2", SqlDbType.Int).Value = oBus.AsientosPiso2;

                    int result = cmd.ExecuteNonQuery();
                    if (result > 0) { res = "1"; }
                    cn.Close();
                }
            }
            catch (Exception ex)
            {
                res = "0";
            }
            return res;
        }

        public List<Bus> ListarBuses()
        {
            string connectionString = _configuration.GetConnectionString("cadenaSql");

            List<Bus> lstBuses = new List<Bus>();
            try
            {
                using (SqlConnection cn = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = cn.CreateCommand();
                    cn.Open();
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = @"ZB_SP_API_BUSES_SEL";

                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            Bus oBus = new Bus();
                            oBus.Id = (reader["IN_ID_BUS"] == DBNull.Value) ? 0 : Convert.ToInt32(reader["IN_ID_BUS"]);
                            oBus.Placa = (reader["CH_PLACA"] == DBNull.Value) ? String.Empty : Convert.ToString(reader["CH_PLACA"]);
                            oBus.Categoria = (reader["VC_CATEGORIA"] == DBNull.Value) ? String.Empty : Convert.ToString(reader["VC_CATEGORIA"]);
                            oBus.PesoNeto = (reader["DE_PESO_NETO"] == DBNull.Value) ? 0 : Convert.ToDecimal(reader["DE_PESO_NETO"]);
                            oBus.Asientos = (reader["IN_NUMERO_ASIENTOS"] == DBNull.Value) ? 0 : Convert.ToInt32(reader["IN_NUMERO_ASIENTOS"]);
                            oBus.AsientosPiso1 = (reader["IN_ASIENTOS_1"] == DBNull.Value) ? 0 : Convert.ToInt32(reader["IN_ASIENTOS_1"]);
                            oBus.AsientosPiso2 = (reader["IN_ASIENTOS_2"] == DBNull.Value) ? 0 : Convert.ToInt32(reader["IN_ASIENTOS_2"]);
                            oBus.Pisos = (reader["IN_NUMERO_PISOS"] == DBNull.Value) ? 0 : Convert.ToInt32(reader["IN_NUMERO_PISOS"]);

                            lstBuses.Add(oBus);
                        }
                    }
                    cn.Close();
                }
            }
            catch (Exception ex)
            {
                lstBuses = new List<Bus>();
            }
            return lstBuses;
        }
    }
}
