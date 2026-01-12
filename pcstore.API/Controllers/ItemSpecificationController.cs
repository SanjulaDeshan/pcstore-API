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
	public class ItemSpecificationController : ControllerBase
	{
		private readonly IMapper mapper;
		private readonly IItemSpecificationRepository itemSpecificationRepository;

		public ItemSpecificationController(IMapper mapper, IItemSpecificationRepository itemSpecificationRepository)
        {
			this.mapper = mapper;
			this.itemSpecificationRepository = itemSpecificationRepository;
		}

		[AllowAnonymous]
		[HttpGet]
		public async Task<IActionResult> GetAll()
		{
			var itemSpecificationDomain = await itemSpecificationRepository.GetAllAsync();

			return Ok(mapper.Map<List<ItemSpecificationDto>>(itemSpecificationDomain));
		}

		[AllowAnonymous]
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

		//[Authorize(Roles = "Admin")]
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

		//[Authorize(Roles = "Admin")]
		[HttpDelete]
		[Route("{id:Guid}")]
		public async Task<IActionResult> Delete([FromRoute] Guid id)
		{
			var itemSpecificationDomainModel = await itemSpecificationRepository.DeleteAsync(id);

			if (itemSpecificationDomainModel == null)
			{
				return NotFound();
			}

			return Ok(mapper.Map<ItemSpecificationDto>(itemSpecificationDomainModel));
		}

		//[Authorize(Roles = "Admin")]
		[HttpPut]
		[Route("{id:Guid}")]
		public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdateItemSpecificationRequestDTO updateItemSpecificationRequestDTO)
		{
			var allItemSpecification = await itemSpecificationRepository.GetAllAsync();
			if (allItemSpecification.Any(x => x.Name.Equals(updateItemSpecificationRequestDTO.Name, StringComparison.OrdinalIgnoreCase) && x.Id != id))
			{
				return BadRequest("Item Specification name already exists.");
			}

			var itemSpecificationDomainModel = mapper.Map<ItemSpecification>(updateItemSpecificationRequestDTO);

			itemSpecificationDomainModel = await itemSpecificationRepository.UpdateAsync(id, itemSpecificationDomainModel);

			if (itemSpecificationDomainModel == null)
			{
				return NotFound();
			}

			return Ok(mapper.Map<ItemSpecificationDto>(itemSpecificationDomainModel));
		}
	}
}
