using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using pcstore.API.Models.DTO;
using pcstore.API.Repositories;

namespace pcstore.API.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ItemController : ControllerBase
	{
		private readonly IMapper mapper;
		private readonly IItemRepository itemRepository;

		public ItemController(IMapper mapper, IItemRepository itemRepository)
        {
			this.mapper = mapper;
			this.itemRepository = itemRepository;
		}

		[HttpGet]
		public async Task<IActionResult> GetAll()
		{
			var itemDomain = await itemRepository.GetAllAsync();

			return Ok(mapper.Map<List<ItemDto>>(itemDomain));
		}

		[HttpGet]
		[Route("{id:Guid}")]
		public async Task<IActionResult> GetById([FromRoute] Guid id)
		{
			var itemDomain = await itemRepository.GetByIdAsync(id);

			if (itemDomain == null)
			{
				return NotFound();
			}

			return Ok(mapper.Map<ItemDto>(itemDomain));
		}
	}
}
