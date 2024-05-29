using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Cryptography;


namespace InpositionLibrary.Service
{
    public class KeyGenerator
    {
        public static byte[] Generate256BitsOfRandomEntropy()
    {
        byte[] key = new byte[32]; // 256 bits
        using (var rng = RandomNumberGenerator.Create())
        {
            rng.GetBytes(key);
        }
        return key;
    }
    }
}