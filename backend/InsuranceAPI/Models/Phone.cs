using System;
using System.Collections.Generic;

namespace InsuranceAPI.Models;

public partial class Phone
{
    public int Id { get; set; }

    public int Insured { get; set; }

    public string Number { get; set; } = null!;

    public string? Description { get; set; }

    public virtual Insured InsuredNavigation { get; set; } = null!;
}
