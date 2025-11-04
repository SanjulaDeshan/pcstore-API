using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using pcstore.API.Models.Domain;
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

		[HttpGet("details")]
		public async Task<IActionResult> GetAllWithDetails()
		{
			var items = await itemRepository.GetAllWithDetailsAsync();
			var itemDtos = mapper.Map<List<ItemDetailedDto>>(items);
			return Ok(itemDtos);
		}

		[HttpGet("category/{categoryId:Guid}")]
		public async Task<IActionResult> GetAllByCategoryId([FromRoute] Guid categoryId)
		{
			var items = await itemRepository.GetAllByCategoryIdAsync(categoryId);
			if (items == null || !items.Any())
				return NotFound("No items found for the given category.");

			var itemDtos = mapper.Map<List<ItemDetailedDto>>(items);
			return Ok(itemDtos);
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

		[HttpPost]
		public async Task<IActionResult> Create([FromBody] AddItemRequestDto addItemRequestDto)
		{
			var allItems = await itemRepository.GetAllAsync();
			if (allItems.Any(x => x.Name.Equals(addItemRequestDto.Name, StringComparison.OrdinalIgnoreCase)))
			{
				return BadRequest("Item name already exists.");
			}

			var itemDomainModel = mapper.Map<Item>(addItemRequestDto);

			itemDomainModel = await itemRepository.CreateAsync(itemDomainModel);

			var itemDto = mapper.Map<ItemDto>(itemDomainModel);

			return CreatedAtAction(nameof(GetById), new { id = itemDto.Id }, itemDto);
		}

		[HttpDelete]
		[Route("{id:Guid}")]
		public async Task<IActionResult> Delete([FromRoute] Guid id)
		{
			var itemDomainModel = await itemRepository.DeleteAsync(id);

			if (itemDomainModel == null)
			{
				return NotFound();
			}

			return Ok(mapper.Map<ItemDto>(itemDomainModel));
		}

		[HttpPut]
		[Route("{id:Guid}")]
		public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdateItemRequestDTO updateItemRequestDTO)
		{
			var allItems = await itemRepository.GetAllAsync();
			if (allItems.Any(x => x.Name.Equals(updateItemRequestDTO.Name, StringComparison.OrdinalIgnoreCase) && x.Id != id))
			{
				return BadRequest("Item name already exists.");
			}

			var itemDomainModel = mapper.Map<Item>(updateItemRequestDTO);

			itemDomainModel = await itemRepository.UpdateAsync(id, itemDomainModel);

			if (itemDomainModel == null)
			{
				return NotFound();
			}

			return Ok(mapper.Map<ItemDto>(itemDomainModel));
		}
	}
}
