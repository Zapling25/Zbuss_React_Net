using System.Data.SqlClient;
using System.Data;
using ZbussWebApi.Interfaz;
using ZbussWebApi.Models;
using ZbussWebApi.Models.Login;
using System.Text;

namespace ZbussWebApi.Dao
{
    public class LoginDao : ILoginDao
    {
        private readonly IConfiguration _configuration;

        public LoginDao(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public LoginResponse ValidarCredenciales(string Correo, string Contrasena)
        {
            string connectionString = _configuration.GetConnectionString("cadenaSql");

            LoginResponse res = new LoginResponse();
            try
            {
                using (SqlConnection cn = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = cn.CreateCommand();
                    cn.Open();
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = @"ZB_SP_API_VALIDAR_CREDENCIALES_SEL";
                    cmd.Parameters.Add("@PARAM_VC_CORREO", SqlDbType.VarChar).Value = Correo;
                    cmd.Parameters.Add("@PARAM_VC_CONTRASENA", SqlDbType.VarChar).Value = Contrasena;

                    int result = cmd.ExecuteNonQuery();

                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            res.Indicador = (reader["CH_INDICADOR"] == DBNull.Value) ? String.Empty : Convert.ToString(reader["CH_INDICADOR"]);
                            res.Mensaje = (reader["VC_MENSAJE"] == DBNull.Value) ? String.Empty : Convert.ToString(reader["VC_MENSAJE"]);
                        }
                    }
                    cn.Close();
                }
            }
            catch (Exception ex)
            {
                res.Indicador = "0";
                res.Mensaje = string.Format("Error al validar: {0}", ex.ToString());
            }
            return res;
        }
    }
}
