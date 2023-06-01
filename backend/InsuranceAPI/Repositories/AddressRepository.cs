using InsuranceAPI.Models;

namespace InsuranceAPI.Repositories {
    public interface IAddressRepository {
        List<Address> getAll();
        Address getById(int id);
        List<Address> getByIds(List<int> ids);
    }

    public class AddressRepository : IAddressRepository {
        private DbInsuranceContext _context;

        public AddressRepository(DbInsuranceContext context){
            _context = context;
        }

        public List<Address> getAll() {
            return _context.Addresses.ToList();
        }

        public Address getById(int id) { 
            return (from addr in _context.Addresses
                    where addr.Id == id
                    select addr).First();
        }

        public List<Address> getByIds(List<int> ids) {
            List<Address> ret = new List<Address>();
            foreach(int id in ids)
                ret.Add(getById(id));
            return ret;
        }
    }
}
