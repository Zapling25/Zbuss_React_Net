using Microsoft.AspNetCore.Mvc;
using System.Text;
using ZbussWebApi.Dao;
using ZbussWebApi.Interfaz;
using ZbussWebApi.Models;

namespace ZbussWebApi.Controllers
{
    [ApiController]
    [Route("usuario")]
    public class UsuarioController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IUsuarioDao _usuarioDao;

        public UsuarioController(IConfiguration configuration, IUsuarioDao usuarioDao)
        {
            _configuration = configuration;
            _usuarioDao = usuarioDao;
        }

        [HttpGet]
        [Route("listar")]
        public List<Usuario> ListarUsuarios()
        {
            List<Usuario> lstUsuarios = new List<Usuario>();
            lstUsuarios = _usuarioDao.ListarUsuario();
            return lstUsuarios;
        }

        [HttpPost]
        [Route("guardar")]
        public ResponseUsuario GuardarUsuario(Usuario oUsuario)
        {
            ResponseUsuario res = new ResponseUsuario();
            res.IndicadorRespuesta = "0";
            res.MensajeRespuesta = "No se guardo el usuario";

            oUsuario.Contrasena = Convert.ToBase64String(Encoding.UTF8.GetBytes(oUsuario.Contrasena));

            if (oUsuario.Id == 0)
            {
                res.IndicadorRespuesta = _usuarioDao.GuardarUsuario(oUsuario);

                if (res.IndicadorRespuesta == "0")
                {
                    res.MensajeRespuesta = "Ya hay una cuenta con ese correo. Intente con otro";
                }
                else
                {
                    res.MensajeRespuesta = "Se guardó exitosamente!";
                }
            }
            else
            {
                res.IndicadorRespuesta = _usuarioDao.ActualizarUsuario(oUsuario);

                if (res.IndicadorRespuesta == "0")
                {
                    res.MensajeRespuesta = "No se encontró el usuario";
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
        public ResponseUsuario EliminarUsuario(int Id)
        {
            ResponseUsuario res = new ResponseUsuario();

            res.IndicadorRespuesta = _usuarioDao.EliminarUsuario(Id);

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
