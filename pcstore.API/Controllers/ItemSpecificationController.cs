using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using pcstore.API.Models.DTO;
using pcstore.API.Repositories;

namespace pcstore.API.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ItemSpecificationController : ControllerBase
	{
		private readonly IMapper mapper;
		private readonly IItemSpecificationRepository itemSpecificationRepository;

		public ItemSpecificationController(IMapper mapper, IItemSpecificationRepository itemSpecificationRepository)
        {
			this.mapper = mapper;
			this.itemSpecificationRepository = itemSpecificationRepository;
		}

		[HttpGet]
		public async Task<IActionResult> GetAll()
		{
			var itemSpecificationDomain = await itemSpecificationRepository.GetAllAsync();

			return Ok(mapper.Map<List<ItemSpecificationDto>>(itemSpecificationDomain));
		}
	}
}
