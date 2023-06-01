using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace InsuranceAPI.Models;

public partial class Phone
{
    public int Id { get; set; }

    public int Insured { get; set; }

    public string Number { get; set; } = null!;

    public string? Description { get; set; }

    [JsonIgnore]
    public virtual Insured InsuredNavigation { get; set; } = null!;
}
