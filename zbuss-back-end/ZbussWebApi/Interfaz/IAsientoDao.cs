using ZbussWebApi.Models.Bus;

namespace ZbussWebApi.Interfaz
{
    public interface IAsientoDao
    {
        List<Asiento> ListarAsientos(int idBus);
    }
}
