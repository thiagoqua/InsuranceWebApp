namespace InsuranceAPI.Models {
    public class DTOMapper {
        public InsuredDTO insuredDTOMapper(Insured ins) {
            return new InsuredDTO(
                ins.Id,ins.Firstname,ins.Lastname,ins.License,ins.Folder,ins.Life,
                ins.Born,ins.Address,ins.Dni,ins.Cuit,ins.Producer,ins.Description,
                new AddressDTO(),new ProducerDTO(),new PhoneDTO()
            );
        }

        public AddressDTO addressDTOMapper(Address address) {
            return new AddressDTO();
        }

        public ProducerDTO producerDTOMapper(Producer producer) {
            return new ProducerDTO();
        }

        public PhoneDTO phoneDTOMapper(Phone phone) {
            return new PhoneDTO();
        }
    }

    public class InsuredDTO {
        public InsuredDTO(int id, string firstname, string lastname, string license, 
                            int folder, string life, DateTime born, int address, 
                            string dni, string? cuit, int producer, string? description, 
                            AddressDTO oAddress, ProducerDTO oProducer, PhoneDTO oPhone) {
            Id = id;
            Firstname = firstname;
            Lastname = lastname;
            License = license;
            Folder = folder;
            Life = life;
            Born = born;
            Address = address;
            Dni = dni;
            Cuit = cuit;
            Producer = producer;
            Description = description;
            this.oAddress = oAddress;
            this.oProducer = oProducer;
            this.oPhone = oPhone;
        }

        public int Id { get; set; }
        public string Firstname { get; set; } = null!;
        public string Lastname { get; set; } = null!;
        public string License { get; set; } = null!;
        public int Folder { get; set; }
        public string Life { get; set; } = null!;
        public DateTime Born { get; set; }
        public int Address { get; set; }
        public string Dni { get; set; } = null!;
        public string? Cuit { get; set; }
        public int Producer { get; set; }
        public string? Description { get; set; }
        public AddressDTO oAddress { get; set; }
        public ProducerDTO oProducer{ get; set; }
        public PhoneDTO oPhone { get; set; }
    }

    public class AddressDTO {

        public int Id { get; set; }
        public string Street { get; set; } = null!;
        public string Number { get; set; } = null!;
        public int? Floor { get; set; }
        public int? Departament { get; set; }
        public string City { get; set; } = null!;
        public string Province { get; set; } = null!;
        public string Country { get; set; } = null!;
    }

    public class ProducerDTO {

    }

    public class PhoneDTO {

    }
}
