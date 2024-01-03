using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Text;
using ZbussWebApi.Dao;
using ZbussWebApi.Interfaz;
using ZbussWebApi.Models;
using ZbussWebApi.Models.ApiProxy;
using ZbussWebApi.Models.Bus;

namespace ZbussWebApi.Controllers
{
    [ApiController]
    [Route("bus")]
    public class BusController : ControllerBase
    {
        private readonly IBusDao _busDao;

        public BusController(IBusDao busDao)
        {
            _busDao = busDao;
        }

        [HttpGet]
        [Route("listar")]
        public List<Bus> ListarBuses()
        {
            List<Bus> lstBuses = new List<Bus>();
            lstBuses = _busDao.ListarBuses();
            return lstBuses;
        }

        [HttpPost]
        [Route("guardar")]
        public ResponseModel GuardarBus(Bus oBus)
        {
            ResponseModel res = new ResponseModel();
            res.IndicadorRespuesta = "0";
            res.MensajeRespuesta = "No se guardo el bus";

            if (oBus.Id == 0)
            {
                res.IndicadorRespuesta = _busDao.GuardarBus(oBus);

                if (res.IndicadorRespuesta == "0")
                {
                    res.MensajeRespuesta = "Ya hay un bus con esa placa. Intente con otro";
                }
                else
                {
                    res.MensajeRespuesta = "Se guardó exitosamente!";
                }
            }
            else
            {
                res.IndicadorRespuesta = _busDao.ActualizarBus(oBus);

                if (res.IndicadorRespuesta == "0")
                {
                    res.MensajeRespuesta = "No se encontró el bus";
                }
                else
                {
                    res.MensajeRespuesta = "Se guardó exitosamente!";
                }
            }
            return res;
        }

        [HttpPost]
        [Route("eliminar")]
        public ResponseModel EliminarBus(int Id)
        {
            ResponseModel res = new ResponseModel();

            res.IndicadorRespuesta = _busDao.EliminarBus(Id);

            if (res.IndicadorRespuesta == "0")
            {
                res.MensajeRespuesta = "No se encontró el usuario";
            }
            else
            {
                res.MensajeRespuesta = "Se eliminó exitosamente!";
            }

            return res;
        }
    }
}
