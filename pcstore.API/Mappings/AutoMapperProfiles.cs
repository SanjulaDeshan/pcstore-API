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
			CreateMap<AddBrandRequestDto, Brand>().ReverseMap();
			CreateMap<UpdateBrandRequestDTO, Brand>().ReverseMap();

			CreateMap<Item, ItemDto>().ReverseMap();
			CreateMap<AddItemRequestDto, Item>().ReverseMap();
			CreateMap<UpdateItemRequestDTO, Item>().ReverseMap();

			CreateMap<ItemSpecification, ItemSpecificationDto>().ReverseMap();
			CreateMap<AddItemSpecificationRequestDto, ItemSpecification>().ReverseMap();
			CreateMap<UpdateItemSpecificationRequestDTO, ItemSpecification>().ReverseMap();

			CreateMap<Advertisement, AdvertisementDto>().ReverseMap();
			CreateMap<AddAdvertisementRequestDto, Advertisement>().ReverseMap();
			CreateMap<UpdateAdvertisementRequestDto, Advertisement>().ReverseMap();

			//CreateMap<Item, ItemDetailedDto>()
			//	.ForMember(dest => dest.Category, opt => opt.MapFrom(src => src.Category))
			//	.ForMember(dest => dest.Brand, opt => opt.MapFrom(src => src.Brand))
			//	.ForMember(dest => dest.ItemSpecifications, opt => opt.Ignore());
			CreateMap<Item, ItemDetailedDto>()
				.ForMember(dest => dest.Category, opt => opt.MapFrom(src => src.Category))
				.ForMember(dest => dest.Brand, opt => opt.MapFrom(src => src.Brand))
				.ForMember(dest => dest.ItemSpecifications, opt => opt.MapFrom(src => src.ItemSpecification));

		}
	}
}
