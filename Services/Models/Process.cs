namespace RiskManagement.Models
{
  public class Process
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public MacroProcess MacroProcess { get; set; }
    public int MacroProcessId { get; set; }
  }
}