using InsuranceAPI.Models;

namespace InsuranceAPI.Repositories {
    public interface IInsuredRepository {
        public List<Insured> getAll();
        public List<Insured> search(string query);
    }

    public class InsuredRepository : IInsuredRepository{
        private DbInsuranceContext _context;

        public InsuredRepository(DbInsuranceContext _dbcontext) {
            _context = _dbcontext;
        }

        public List<Insured> getAll() {
            return _context.Insureds.ToList();
        }

        public List<Insured> search(string query) {
            return (from ins in _context.Insureds
                    where  ((ins.Firstname + " " + ins.Lastname).Contains(query) ||
                            (ins.Lastname + " " + ins.Firstname).Contains(query) ||
                            ins.Firstname.Contains(query) || 
                            ins.Lastname.Contains(query))
                    select ins
                    ).ToList();
        }
    }
}
