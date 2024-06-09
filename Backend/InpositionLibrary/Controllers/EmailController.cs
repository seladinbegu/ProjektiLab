using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace InpositionLibrary.Controllers
{
   
        [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        [HttpPost]
        public IActionResult SendEmail(EmailRequest request)
        {
            try
            {
                // Create a new MailMessage object
                MailMessage mailMessage = new MailMessage();
                mailMessage.From = new MailAddress("beguseladin@gmail.com"); // Your email address
                mailMessage.To.Add(request.To);
                mailMessage.Subject = request.Subject;
                mailMessage.Body = request.Body;
                mailMessage.IsBodyHtml = true; // If your email body is HTML

                // Send the email using SMTP client
              SmtpClient smtpClient = new SmtpClient("smtp.gmail.com"); // Gmail SMTP server
smtpClient.Port = 587; // Port for Gmail SMTP server
smtpClient.Credentials = new System.Net.NetworkCredential("beguseladin@gmail.com", "adjk ncai vzof ztgo"); // Gmail account credentials
smtpClient.EnableSsl = true; // Enable SSL/TLS for Gmail

                
                // Send the email
                smtpClient.Send(mailMessage);

                return Ok("Email sent successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error sending email: {ex.Message}");
            }
        }
    }

    // DTO for receiving email request data
    public class EmailRequest
    {
        public required string To { get; set; }
        public string? Subject { get; set; }
        public string? Body { get; set; }
    }
}
    