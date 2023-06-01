using InsuranceAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace InsuranceAPI.Repositories {
    public interface IInsuredRepository {
        public List<Insured> getAll();
        public List<Insured> search(string query);
        public Insured findById(int id);
    }

    public class InsuredRepository : IInsuredRepository{
        private DbInsuranceContext _context;

        public InsuredRepository(DbInsuranceContext _dbcontext) {
            _context = _dbcontext;
        }

        public List<Insured> getAll() {
            return _context.Insureds
                .Include(ins => ins.AddressNavigation)
                .Include(ins => ins.ProducerNavigation)
                .Include(ins => ins.Phones)
                .ToList();
        }

        public List<Insured> search(string query) {
            return (from ins in _context.Insureds
                    where  ((ins.Firstname + " " + ins.Lastname).Contains(query) ||
                            (ins.Lastname + " " + ins.Firstname).Contains(query) ||
                            ins.Firstname.Contains(query) || 
                            ins.Lastname.Contains(query))
                    select ins
                    )
                    .Include(ins => ins.AddressNavigation)
                    .Include(ins => ins.ProducerNavigation)
                    .Include(ins => ins.Phones)
                    .ToList();
        }

        public Insured findById(int id) {
            return _context.Insureds
                    .Include(i => i.AddressNavigation)
                    .Include(ins => ins.AddressNavigation)
                    .Include(ins => ins.ProducerNavigation)
                    .FirstOrDefault(i => i.Id == id);
        }
    }
}
