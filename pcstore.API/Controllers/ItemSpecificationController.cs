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

		[HttpGet]
		[Route("{id:Guid}")]
		public async Task<IActionResult> GetById([FromRoute] Guid id)
		{
			var itemSpecificationDomain = await itemSpecificationRepository.GetByIdAsync(id);

			if (itemSpecificationDomain == null)
			{
				return NotFound();
			}

			return Ok(mapper.Map<ItemSpecificationDto>(itemSpecificationDomain));
		}

		[HttpPost]
		public async Task<IActionResult> Create([FromBody] AddItemSpecificationRequestDto addItemSpecificationRequestDto)
		{
			var allItemsSpecification = await itemSpecificationRepository.GetAllAsync();
			if (allItemsSpecification.Any(x => x.Name.Equals(addItemSpecificationRequestDto.Name, StringComparison.OrdinalIgnoreCase)))
			{
				return BadRequest("Item specification name already exists.");
			}

			var itemSpecificationDomainModel = mapper.Map<ItemSpecification>(addItemSpecificationRequestDto);

			itemSpecificationDomainModel = await itemSpecificationRepository.CreateAsync(itemSpecificationDomainModel);

			var itemSpecificationDto = mapper.Map<ItemSpecificationDto>(itemSpecificationDomainModel);

			return CreatedAtAction(nameof(GetById), new { id = itemSpecificationDto.Id }, itemSpecificationDto);
		}
	}
}
