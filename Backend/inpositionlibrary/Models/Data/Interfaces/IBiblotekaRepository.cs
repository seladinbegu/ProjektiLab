using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace inpositionlibrary.Models.Data.Interfaces
{
    public interface IBiblotekaRepository
    {
        void AddBibloteka(Bibloteka bibloteka);
        void DeleteBibloteka(string pika);
        List<Bibloteka> GetAllBibloteka();
        Bibloteka GetBiblotekaById(string pika);
        void UpdateBibloteka(Bibloteka bibloteka);
    }
}