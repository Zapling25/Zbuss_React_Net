namespace ZbussWebApi.Models.Bus
{
    public class Asiento
    {
        public int Id { get; set; }
        public int IdBus {  get; set; }
        public string NumeroAsiento {  get; set; }
        public string Inclinacion {  get; set; }
    }
}
