using AutoMapper;
using Microsoft.AspNetCore.Authorization;
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

		[AllowAnonymous]
		[HttpGet]
		public async Task<IActionResult> GetAll()
		{
			var itemDomain = await itemRepository.GetAllAsync();

			return Ok(mapper.Map<List<ItemDto>>(itemDomain));
		}

		[AllowAnonymous]
		[HttpGet("all/details")]
		public async Task<IActionResult> GetAllWithDetails()
		{
			var items = await itemRepository.GetAllWithDetailsAsync();
			var itemDtos = mapper.Map<List<ItemDetailedDto>>(items);
			return Ok(itemDtos);
		}

        [AllowAnonymous]
        [HttpGet("details/{id:Guid}")]
        public async Task<IActionResult> GetItemWithDetails([FromRoute] Guid id)
        {
            var item = await itemRepository.GetAllWithDetailsAsync();
            var specificItem = item.FirstOrDefault(x => x.Id == id);

            if (specificItem == null) return NotFound();

            return Ok(mapper.Map<ItemDetailedDto>(specificItem));
        }

        [AllowAnonymous]
		[HttpGet("category/{categoryId:Guid}")]
		public async Task<IActionResult> GetAllByCategoryId(
            [FromRoute] Guid categoryId,
			[FromQuery] int pageNumber = 1,
			[FromQuery] int pageSize = 12,
			[FromQuery] string? brand = null,
			[FromQuery] decimal? minPrice = null,
			[FromQuery] decimal? maxPrice = null,
            [FromQuery] string? search = null,
            [FromQuery] string? availability = null)
		{
            var items = await itemRepository.GetAllByCategoryIdAsync(categoryId, pageNumber, pageSize, brand, minPrice, maxPrice, search, availability);
            if (items == null || !items.Any())
				return NotFound("No items found for the given category.");

			var itemDtos = mapper.Map<List<ItemDetailedDto>>(items);
            var totalItems = await itemRepository.GetCountByCategoryIdAsync(categoryId, brand, minPrice, maxPrice, search, availability);

            var prices = items.Select(x => decimal.Parse(x.Price.Replace(",", "").Trim()));
            var categoryMin = prices.Any() ? prices.Min() : 0;
            var categoryMax = prices.Any() ? prices.Max() : 1000000;

            return Ok(new
            {
                Data = itemDtos,
                TotalCount = totalItems,
                CategoryMinPrice = categoryMin,
                CategoryMaxPrice = categoryMax,
                PageNumber = pageNumber,
                PageSize = pageSize
            });
		}

		[AllowAnonymous]
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

		//[Authorize(Roles = "Admin")]
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

		//[Authorize(Roles = "Admin")]
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

		//[Authorize(Roles = "Admin")]
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
