﻿using System;
using System.Collections.Generic;

namespace InsuranceAPI.Models;

public partial class Insured
{
    public int Id { get; set; }

    public string Firstname { get; set; } = null!;

    public string Lastname { get; set; } = null!;

    public string License { get; set; } = null!;

    public int Folder { get; set; }

    public string Life { get; set; } = null!;

    public DateTime Born { get; set; }

    public int Address { get; set; }

    public string Dni { get; set; } = null!;

    public int Phone { get; set; }

    public string? Cuit { get; set; }

    public int Producer { get; set; }

    public string? Description { get; set; }

    public virtual Address AddressNavigation { get; set; } = null!;

    public virtual Phone PhoneNavigation { get; set; } = null!;

    public virtual Producer ProducerNavigation { get; set; } = null!;
}