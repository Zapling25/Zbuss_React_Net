using System.Data;
using System.Data.SqlClient;
using ZbussWebApi.Interfaz;
using ZbussWebApi.Models.General;
using ZbussWebApi.Models.Usuario;

namespace ZbussWebApi.Dao
{
    public class GeneralDao : IGeneralDao
    {
        private readonly IConfiguration _configuration;

        public GeneralDao(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public List<GeneralModel> ObtenerGeneral(string nombreTabla, string nombreColumna)
        {
            string connectionString = _configuration.GetConnectionString("cadenaSql");

            List<GeneralModel> lstGeneral = new List<GeneralModel>();
            try
            {
                using (SqlConnection cn = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = cn.CreateCommand();
                    cn.Open();
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = @"ZB_SP_API_GENERAL_SEL";
                    cmd.Parameters.Add("@PARAM_VC_NOMBRE_TABLA", SqlDbType.VarChar).Value = nombreTabla;
                    cmd.Parameters.Add("@PARAM_VC_COLUMNA", SqlDbType.VarChar).Value = nombreColumna;

                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            GeneralModel oGeneral = new GeneralModel();
                            oGeneral.Id = (reader["IN_ID_GENERAL"] == DBNull.Value) ? 0 : Convert.ToInt32(reader["IN_ID_GENERAL"]);
                            oGeneral.NombreTabla = (reader["VC_NOMBRE_TABLA"] == DBNull.Value) ? String.Empty : Convert.ToString(reader["VC_NOMBRE_TABLA"]);
                            oGeneral.NombreColumna = (reader["VC_COLUMNA"] == DBNull.Value) ? String.Empty : Convert.ToString(reader["VC_COLUMNA"]);
                            oGeneral.ValorColumna = (reader["VC_VALOR_COLUMNA"] == DBNull.Value) ? String.Empty : Convert.ToString(reader["VC_VALOR_COLUMNA"]);
                            oGeneral.ValorColumna2 = (reader["VC_VALOR_COLUMNA_2"] == DBNull.Value) ? String.Empty : Convert.ToString(reader["VC_VALOR_COLUMNA_2"]);
                            oGeneral.Estado = (reader["CH_SITUACION_REGISTRO"] == DBNull.Value) ? String.Empty : Convert.ToString(reader["CH_SITUACION_REGISTRO"]);

                            lstGeneral.Add(oGeneral);
                        }
                    }
                    cn.Close();
                }
            }
            catch (Exception ex)
            {
                lstGeneral = new List<GeneralModel>();
            }
            return lstGeneral;
        }
    }
}
