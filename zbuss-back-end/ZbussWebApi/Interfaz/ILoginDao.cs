using ZbussWebApi.Models.Login;

namespace ZbussWebApi.Interfaz
{
    public interface ILoginDao
    {
        public LoginResponse ValidarCredenciales(string Correo, string Contrasena);
    }
}
