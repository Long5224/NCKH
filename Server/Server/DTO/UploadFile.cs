using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.DTO
{
    public class UploadFile
    {
        public string username { get; set; }

        public IFormFile avatar { get; set; }
    }
}
