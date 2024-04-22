using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace inpositionlibrary.Models.Data.Interfaces
{
    public interface IPunetoriRepository
    {
         void AddPunetori(Punetori punetori);
        void DeletePunetori(int id);
        List<Punetori> GetAllPunetori();
        Punetori GetAllPunetoriById(int id);
        void UpdatePunetori(Punetori punetori);
    }
}