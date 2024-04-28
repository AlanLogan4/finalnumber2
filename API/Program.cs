using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors();

var app = builder.Build();
app.UseCors(x => x.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod());

string fileName = "inStock.json";
List<Purchase> pruchase = new List<Purchase>();


if (File.Exists(fileName))
{
    var json = File.ReadAllText(fileName);
    pruchase.AddRange(JsonSerializer.Deserialize<List<Purchase>>(json));
}

app.MapGet("/", () => "Hello World!");
app.MapGet("/purchases", () => pruchase);

app.MapPost("/purchases", (Purchase purchase) =>
{
    Console.WriteLine("we are here");
    pruchase.Add(purchase);
    // Console.WriteLine(pruchase);
    var json = JsonSerializer.Serialize(pruchase);
    File.WriteAllText(fileName, json);
});


app.Run();

public record Purchase(DateTime time, string name, long cardNumber, decimal totalSpend);