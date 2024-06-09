using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InpositionLibrary.Models;

namespace InpositionLibrary.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(Lexuesi lexuesi);
    }
}