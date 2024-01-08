using ZbussWebApi.Models.General;

namespace ZbussWebApi.Interfaz
{
    public interface IGeneralDao
    {
        public List<GeneralModel> ObtenerGeneral(string nombreTabla, string nombreColumna);
    }
}
