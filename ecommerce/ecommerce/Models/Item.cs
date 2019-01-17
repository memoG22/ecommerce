using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ecommerce.Models
{
    public class Item
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public int Price { get; set; }

        [Required]
        public string Image { get; set; }

        [Required]
        public int Gender { get; set; }

        [Required]
        public int AgeGroup { get; set; }

        [Required]
        public string Size { get; set; }

        [Required]
        public int ItemType { get; set; }

        [Required]
        public string Description { get; set; }

    }
}