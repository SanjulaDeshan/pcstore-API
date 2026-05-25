using System.ComponentModel.DataAnnotations;

namespace pcstore.API.Models.DTO
{
    public class UpdateAdvertisementRequestDto
    {
        [Required]
        public string Title { get; set; }
        public string Subtitle { get; set; }
        [Required]
        public string ImageUrl { get; set; }
        public string LinkUrl { get; set; }
        public bool IsActive { get; set; }
        public int SortOrder { get; set; }
    }
}
