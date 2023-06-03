using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace InsuranceAPI.Models;

public partial class Company
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }

    public string Name { get; set; } = null!;

    public string Logo { get; set; } = null!;

    [JsonIgnore]
    public virtual ICollection<Insured> Insureds { get; set; } = new List<Insured>();
}
