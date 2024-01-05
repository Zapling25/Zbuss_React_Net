namespace ZbussWebApi.Models.Bus
{
    public class Bus
    {
        public int Id { get; set; }
        public string Placa { get; set; }
        public decimal PesoNeto { get; set; }
        public string Categoria { get; set; }
        public int Asientos { get; set; }
    }
}
