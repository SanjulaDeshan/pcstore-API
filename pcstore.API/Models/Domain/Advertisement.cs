using System;
using System.ComponentModel.DataAnnotations;

namespace pcstore.API.Models.Domain
{
    public class Advertisement
    {
        public Guid Id { get; set; }
        
        [Required]
        public string Title { get; set; }
        
        public string Subtitle { get; set; }
        
        [Required]
        public string ImageUrl { get; set; }
        
        public string LinkUrl { get; set; }
        
        public bool IsActive { get; set; } = true;
        
        public int SortOrder { get; set; } = 0;
    }
}
