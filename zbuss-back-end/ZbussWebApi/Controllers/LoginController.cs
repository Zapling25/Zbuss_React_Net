using Microsoft.AspNetCore.Mvc;
using System.Text;
using ZbussWebApi.Interfaz;
using ZbussWebApi.Models;
using ZbussWebApi.Models.Login;

namespace ZbussWebApi.Controllers
{
    [ApiController]
    [Route("/login")]
    public class LoginController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly ILoginDao _loginDao;

        public LoginController(IConfiguration configuration, ILoginDao loginDao)
        {
            _configuration = configuration;
            _loginDao = loginDao;
        }

        [HttpPost]
        [Route("setLogin")]
        public LoginResponse ListarUsuarios(ParLogin Credenciales)
        {
            Credenciales.Contrasena = Convert.ToBase64String(Encoding.UTF8.GetBytes(Credenciales.Contrasena));
            LoginResponse res = _loginDao.ValidarCredenciales(Credenciales.Correo, Credenciales.Contrasena);
            return res;
        }
    }
}
