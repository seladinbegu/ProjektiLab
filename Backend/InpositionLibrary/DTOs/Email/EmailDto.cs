using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InpositionLibrary.DTOs.Email
{
    public class EmailDto
    {
        public string To { get; set; } // Recipient's email address
    public string Subject { get; set; } // Email subject
    public string Body { get; set; } // Email body content
    }
}