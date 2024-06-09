using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InpositionLibrary.Models
{
    public class Email
    {
        public string To { get; set; } // Recipient's email address
    public string Subject { get; set; } // Email subject
    public string Body { get; set; } // Email body content
    }
}