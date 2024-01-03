using ZbussWebApi.Models.Usuario;

namespace ZbussWebApi.Models.Login
{
    public class LoginResponse
    {
        public string Indicador { get; set; }
        public string Mensaje { get; set; }
        public Usuario.Usuario Usuario { get; set; }
    }
}
