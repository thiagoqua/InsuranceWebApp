using InsuranceAPI.Models;

namespace InsuranceAPI.Repositories {
    public interface IProducerRepository {
        public List<Producer> getAll();
        public Producer getById(int id);
        public List<Producer> getByIds(List<int> ids);
    }

    public class ProducerRepository : IProducerRepository{
        private DbInsuranceContext _context;

        public ProducerRepository(DbInsuranceContext context) { 
            _context = context;
        }

        public List<Producer> getAll() {
            return _context.Producers.ToList();
        }

        public Producer getById(int id) {
            return (from prod in _context.Producers
                    where prod.Id == id
                    select prod).First();
        }

        public List<Producer> getByIds(List<int> ids) {
            List<Producer> ret = new List<Producer>();
            foreach(int id in ids) 
                ret.Add(getById(id));
            return ret;
        }
    }
}
