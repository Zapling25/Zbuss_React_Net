using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;
using ZbussWebApi.Interfaz;
using ZbussWebApi.Models;

namespace ZbussWebApi.Dao
{
    public class UsuarioDao : IUsuarioDao
    {
        private readonly IConfiguration _configuration;

        public UsuarioDao(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string ActualizarUsuario(Usuario usuario)
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
                    cmd.CommandText = @"ZB_SP_API_UPD_USUARIO";
                    cmd.Parameters.Add("@PARAM_IN_ID_USUARIO", SqlDbType.VarChar).Value = usuario.Id;
                    cmd.Parameters.Add("@PARAM_VC_NOMBRES", SqlDbType.VarChar).Value = usuario.Nombres;
                    cmd.Parameters.Add("@PARAM_VC_APELLIDOS", SqlDbType.VarChar).Value = usuario.Apellidos;
                    cmd.Parameters.Add("@PARAM_VC_CORREO", SqlDbType.VarChar).Value = usuario.Correo;

                    int result = cmd.ExecuteNonQuery();
                    if (result == 1) { res = "1"; }
                    cn.Close();
                }
            }
            catch (Exception ex)
            {
                throw;
            }
            return res;
        }

        public string EliminarUsuario(int Id)
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
                    cmd.CommandText = @"ZB_SP_API_DEL_USUARIO";
                    cmd.Parameters.Add("@PARAM_IN_ID_USUARIO", SqlDbType.VarChar).Value = Id;

                    int result = cmd.ExecuteNonQuery();
                    if (result == 1) { res = "1"; }
                    cn.Close();
                }
            }
            catch (Exception ex)
            {
                throw;
            }
            return res;
        }

        public string GuardarUsuario(Usuario usuario)
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
                    cmd.CommandText = @"ZB_SP_API_INS_USUARIO";
                    cmd.Parameters.Add("@PARAM_VC_NOMBRES", SqlDbType.VarChar).Value = usuario.Nombres;
                    cmd.Parameters.Add("@PARAM_VC_APELLIDOS", SqlDbType.VarChar).Value = usuario.Apellidos;
                    cmd.Parameters.Add("@PARAM_VC_CORREO", SqlDbType.VarChar).Value = usuario.Correo;

                    int result = cmd.ExecuteNonQuery();
                    if (result == 1) { res = "1"; }
                    cn.Close();
                }
            }
            catch (Exception ex)
            {
                throw;
            }
            return res;
        }

        public List<Usuario> ListarUsuario()
        {
            string connectionString = _configuration.GetConnectionString("cadenaSql");

            List<Usuario> lstUsuarios = new List<Usuario>();
            try
            {
                using (SqlConnection cn = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = cn.CreateCommand();
                    cn.Open();
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = @"ZB_SP_API_USUARIOS_SEL";
                    //cmd.Parameters.Add("@PARAM_IN_ID_USUARIO", SqlDbType.Int).Value = 21;

                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            Usuario oUsuario = new Usuario();
                            oUsuario.Id = (reader["IN_ID_USUARIO"] == DBNull.Value) ? 0 : Convert.ToInt32(reader["IN_ID_USUARIO"]);
                            oUsuario.Nombres = (reader["VC_NOMBRES"] == DBNull.Value) ? String.Empty : Convert.ToString(reader["VC_NOMBRES"]);
                            oUsuario.Apellidos = (reader["VC_APELLIDOS"] == DBNull.Value) ? String.Empty : Convert.ToString(reader["VC_APELLIDOS"]);
                            oUsuario.Correo = (reader["VC_CORREO"] == DBNull.Value) ? String.Empty : Convert.ToString(reader["VC_CORREO"]);

                            lstUsuarios.Add(oUsuario);
                        }
                    }
                    cn.Close();
                }
            }
            catch (Exception ex)
            {
                lstUsuarios = new List<Usuario>();
            }
            return lstUsuarios;
        }
    }
}
