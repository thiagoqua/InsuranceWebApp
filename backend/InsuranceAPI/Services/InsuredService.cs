using InsuranceAPI.Models;
using InsuranceAPI.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace InsuranceAPI.Services {
    public interface IInsuredService {
        public List<Insured> getAll();
        public List<Insured> getFromSearch(string query);
        public Insured getById(int id);
    }

    public class InsuredService : IInsuredService{
        private readonly IInsuredRepository _insuredRepo;

        public InsuredService(IInsuredRepository repo) { 
            _insuredRepo = repo;
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
    }
}
