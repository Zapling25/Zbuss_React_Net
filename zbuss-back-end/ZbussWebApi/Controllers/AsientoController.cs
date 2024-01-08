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
        private readonly IGeneralDao _generalDao;

        public AsientoController(IAsientoDao asientoDao, IGeneralDao generalDao)
        {
            _asientoDao = asientoDao;
            _generalDao = generalDao;
        }

        [HttpGet]
        [Route("listar")]
        public List<Asiento> ListarAsientos(int IdBus)
        {
            List<Asiento> lstBuses = new List<Asiento>();
            lstBuses = _asientoDao.ListarAsientos(IdBus);
            return lstBuses;
        }

        [HttpGet]
        [Route("listarOpciones")]
        public List<OpcionesBloque> ListarOpciones()
        {
            var lstGeneral = _generalDao.ObtenerGeneral("TIPOS_BLOQUES_AUTOBUS", "OPCIONES");

            List<OpcionesBloque> lstOpciones = new List<OpcionesBloque>();
            foreach (var item in lstGeneral)
            {
                OpcionesBloque oOpcionBloque = new OpcionesBloque();

                oOpcionBloque.CodigoOpcion = item.ValorColumna2;
                oOpcionBloque.Opcion = item.ValorColumna;

                lstOpciones.Add(oOpcionBloque);
            }

            return lstOpciones;
        }
    }
}
