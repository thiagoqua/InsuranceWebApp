using System;
using System.Collections.Generic;

namespace InsuranceAPI.Models;

public partial class Producer
{
    public int Id { get; set; }

    public string Firstname { get; set; } = null!;

    public string Lastname { get; set; } = null!;

    public DateTime Joined { get; set; }

    public virtual ICollection<Insured> Insureds { get; set; } = new List<Insured>();
}
