using Microsoft.AspNetCore.Mvc;
using ZbussWebApi.Interfaz;
using ZbussWebApi.Models.Bus;

namespace ZbussWebApi.Controllers
{
    [ApiController]
    [Route("asiento")]
    public class AsientoController : Controller
    {
        private readonly IAsientoDao _asientoDao;

        public AsientoController(IAsientoDao asientoDao)
        {
            _asientoDao = asientoDao;
        }

        [HttpGet]
        [Route("listar")]
        public List<Asiento> ListarAsientos(int IdBus)
        {
            List<Asiento> lstBuses = new List<Asiento>();
            lstBuses = _asientoDao.ListarAsientos(IdBus);
            return lstBuses;
        }
    }
}
