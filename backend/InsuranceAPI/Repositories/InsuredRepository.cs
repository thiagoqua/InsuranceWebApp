﻿using InsuranceAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Data.Common;

namespace InsuranceAPI.Repositories {
    public interface IInsuredRepository {
        public List<Insured> getAll();
        public List<Insured> search(string query);
        public Insured? findById(long id);
        public void create(Insured insured);
        public void update(Insured insured);
        public void delete(long id);
        public bool commit();
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
                .Include(ins => ins.CompanyNavigation)
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
                    .Include(ins => ins.CompanyNavigation)
                    .ToList();
        }

        public Insured? findById(long id) {
            return _context.Insureds
                    .Include(i => i.AddressNavigation)
                    .Include(ins => ins.AddressNavigation)
                    .Include(ins => ins.ProducerNavigation)
                    .Include(ins => ins.CompanyNavigation)
                    .Include(ins => ins.Phones)
                    .FirstOrDefault(i => i.Id == id);
        }

        public void create(Insured newOne) {
            _context.Insureds.Add(newOne);
        }

        public bool commit() {
            try {
                _context.SaveChanges();
                return true;
            }
            catch(DbException ex){
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        public void update(Insured insured) {
            _context.Insureds.Update(insured);
        }

        public void delete(long id) {
            Insured? inCuestion = findById(id);
            if(inCuestion != null){
                inCuestion.Phones.Clear();
                _context.Insureds.Remove(inCuestion);
            }
        }
    }
}
