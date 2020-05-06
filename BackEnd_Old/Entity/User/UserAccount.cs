using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entity.User
{
    public class UserAccount
    {
        [Key]
        public Guid Oid { get; set; }
        public string FullName { get; set; }
    }
}
