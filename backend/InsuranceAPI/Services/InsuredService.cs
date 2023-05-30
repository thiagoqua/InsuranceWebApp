using InsuranceAPI.Models;
using InsuranceAPI.Repositories;

namespace InsuranceAPI.Services {
    public interface IInsuredService {
        public List<Insured> getAll();
        public List<Insured> getFromSearch(string query);
    }

    public class InsuredService : IInsuredService{
        private readonly IInsuredRepository _repo;

        public InsuredService(IInsuredRepository repo) {
            _repo = repo;
        }

        public List<Insured> getAll() {
            return _repo.getAll();
        }

        public List<Insured> getFromSearch(string queryParam) {
            string query = queryParam.Replace('+', ' ');
            return _repo.search(query);
        }
    }
}
