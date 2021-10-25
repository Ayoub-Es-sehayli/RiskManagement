namespace RiskManagement.Models
{
  public class Activity
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public int ProcessId { get; set; }
    public Process Process { get; set; }
    public int ActorId { get; set; }
    public Position Actor { get; set; }
  }
}