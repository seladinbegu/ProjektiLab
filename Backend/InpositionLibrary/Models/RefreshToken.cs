using System;
using System.ComponentModel.DataAnnotations;

namespace InpositionLibrary.Models
{
    public class RefreshToken
    {
        [Key]
        public string Token { get; set; }

        public DateTime ExpiryDate { get; set; }

        public string UserId { get; set; }

        public User User { get; set; }
    }
}
