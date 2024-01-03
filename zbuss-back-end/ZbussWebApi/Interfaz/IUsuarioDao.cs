using ZbussWebApi.Models.Usuario;

namespace ZbussWebApi.Interfaz
{
    public interface IUsuarioDao
    {
        public List<Usuario> ListarUsuario();
        public string GuardarUsuario(Usuario usuario);
        public string ActualizarUsuario(Usuario usuario);
        public string EliminarUsuario(int Id);
    }
}
