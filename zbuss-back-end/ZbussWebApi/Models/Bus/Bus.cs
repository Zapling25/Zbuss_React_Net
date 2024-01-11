namespace ZbussWebApi.Models.Bus
{
    public class Bus
    {
        public int Id { get; set; }
        public string Placa { get; set; }
        public decimal PesoNeto { get; set; }
        public string Categoria { get; set; }
        public int Pisos { get; set; }
        public int Asientos {  get; set; }
        public int AsientosPiso1 { get; set; }
        public int AsientosPiso2 { get; set; }
    }
}
