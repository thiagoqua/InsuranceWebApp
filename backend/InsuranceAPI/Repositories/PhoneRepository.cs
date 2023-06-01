using InsuranceAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace InsuranceAPI.Repositories {
    public interface IPhoneRepository {
        public List<Phone> getAll();
        public Phone getById(int id);
        public List<Phone> getByIds(List<int> id);
        public List<Phone> getByInsured(int insuredId);
        public List<Phone> getByInsureds(List<int> insuredIds);
    }
    
    public class PhoneRepository : IPhoneRepository{
        private DbInsuranceContext _context;

        public PhoneRepository(DbInsuranceContext context) {
            _context = context;
        }

        public List<Phone> getAll() {
            return _context.Phones.Include(ph => ph.InsuredNavigation).ToList();
        }

        public Phone getById(int id) {
            return _context.Phones.Include(ph => ph.InsuredNavigation)
                .FirstOrDefault(ph => ph.Id == id);
        }

        public List<Phone> getByIds(List<int> ids) {
            List<Phone> ret = new List<Phone>();
            foreach(int id in ids)
                ret.Add(getById(id));
            return ret;
        }

        public List<Phone> getByInsured(int insuredId) {
            return (from ph in _context.Phones.Include(ph => ph.InsuredNavigation)
                    where ph.InsuredNavigation.Id == insuredId
                    select ph).ToList();
        }

        public List<Phone> getByInsureds(List<int> insuredIds) {
            List<Phone> ret = new List<Phone>();
            foreach(int id in insuredIds)
                ret.Concat(getByInsured(id));
            return ret;
        }
    }
}
