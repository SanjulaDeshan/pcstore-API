using AutoMapper;
using pcstore.API.Models.Domain;
using pcstore.API.Models.DTO;

namespace pcstore.API.Mappings
{
	public class AutoMapperProfiles : Profile
	{
		public AutoMapperProfiles() 
		{
			CreateMap<Category, CategoryDto>().ReverseMap();
			CreateMap<AddCategoryRequestDto, Category>().ReverseMap();
			CreateMap<UpdateCategoryRequestDTO, Category>().ReverseMap();

			CreateMap<Brand, BrandDto>().ReverseMap();
		}
	}
}
