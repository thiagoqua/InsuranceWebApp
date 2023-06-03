using InsuranceAPI.Models;
using InsuranceAPI.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace InsuranceAPI.Services {
    public interface IInsuredService {
        public List<Insured> getAll();
        public List<Insured> getFromSearch(string query);
        public Insured getById(int id);
        public bool create(Insured insured);
    }

    public class InsuredService : IInsuredService{
        private readonly IInsuredRepository _insuredRepo;
        private readonly IAddressRepository _addressRepo;
        private readonly IPhoneRepository _phoneRepo;

        public InsuredService(IInsuredRepository repo,IAddressRepository addrRepo,
                                IPhoneRepository phRepo) { 
            _insuredRepo = repo;
            _addressRepo = addrRepo;
            _phoneRepo = phRepo;
        }

        public List<Insured> getAll() {
            return _insuredRepo.getAll();
        }

        public List<Insured> getFromSearch(string queryParam) {
            string query = queryParam.Replace('+', ' ');
             return _insuredRepo.search(query);
        }

        public Insured getById(int id) {
            return _insuredRepo.findById(id);
        }

        public bool create(Insured insured) {
            Address address = insured.AddressNavigation;
            List<Phone> phones = insured.Phones.ToList();

            _addressRepo.create(address);
            _insuredRepo.create(insured);
            _phoneRepo.createMultiple(phones);

            return _insuredRepo.commit();
        }
    }
}
