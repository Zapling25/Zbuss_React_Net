using ZbussWebApi.Dao;
using ZbussWebApi.Interfaz;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddScoped<IUsuarioDao, UsuarioDao>();
builder.Services.AddScoped<ILoginDao, LoginDao>();
builder.Services.AddScoped<IBusDao, BusDao>();
builder.Services.AddScoped<IAsientoDao, AsientoDao>();
builder.Services.AddScoped<IGeneralDao, GeneralDao>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        builder => builder
            .WithOrigins("http://localhost:3000") // Reemplaza con la URL de tu aplicación React
            .AllowAnyMethod()
            .AllowAnyHeader());
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseCors("AllowReactApp");

app.Run();
