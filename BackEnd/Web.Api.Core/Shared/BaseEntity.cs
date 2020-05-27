using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Web.Api.Core.Domain.Entities;

namespace Web.Api.Core.Shared
{
    public abstract class BaseEntity
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int Id { get; set; }
        public DateTime Created { get; set; }
        public DateTime Modified { get; set; }
       // [ForeignKey(nameof(CreatedUser))]
         public int? CreatedUserId { get; set; }
       // public User CreatedUser { get; set; }

      //  [ForeignKey(nameof(ModifiedUser))]
        public int? ModifiedUserId { get; set; }
      //  public User ModifiedUser { get; set; }
    }
}
