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
                        if (reader.NextResult())
                        {
                            while (reader.Read())
                            {
                                res.Usuario = new Usuario();
                                res.Usuario.Nombres = (reader["VC_NOMBRES"] == DBNull.Value) ? String.Empty : Convert.ToString(reader["VC_NOMBRES"]);
                                res.Usuario.Apellidos = (reader["VC_APELLIDOS"] == DBNull.Value) ? String.Empty : Convert.ToString(reader["VC_APELLIDOS"]);
                                res.Usuario.Correo = (reader["VC_CORREO"] == DBNull.Value) ? String.Empty : Convert.ToString(reader["VC_CORREO"]);
                                res.Usuario.Contrasena = (reader["VC_CONTRASENA"] == DBNull.Value) ? String.Empty : Convert.ToString(reader["VC_CONTRASENA"]);
                            }
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
