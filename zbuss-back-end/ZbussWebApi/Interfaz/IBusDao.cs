using ZbussWebApi.Models.Bus;

namespace ZbussWebApi.Interfaz
{
    public interface IBusDao
    {
        string ActualizarBus(Bus oBus);
        string EliminarBus(int id);
        string GuardarBus(Bus oBus);
        public List<Bus> ListarBuses();
    }
}
