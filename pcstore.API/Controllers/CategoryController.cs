using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using pcstore.API.Data;
using pcstore.API.Models.Domain;
using pcstore.API.Models.DTO;
using pcstore.API.Repositories;

namespace pcstore.API.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class CategoryController : ControllerBase
	{
		private readonly PCStoreDbContext dbContext;
		private readonly IMapper mapper;
		private readonly ICategoryRepository categoryRepository;

		public CategoryController(PCStoreDbContext dbContext, IMapper mapper, ICategoryRepository categoryRepository)
        {
			this.dbContext = dbContext;
			this.mapper = mapper;
			this.categoryRepository = categoryRepository;
		}

		[HttpGet]
		public async Task<IActionResult> GetAll()
		{
			var categoryDomain = await categoryRepository.GetAllAsync();

			return Ok(mapper.Map<List<CategoryDto>>(categoryDomain));
		}

		[HttpGet]
		[Route("{id:Guid}")]
		public async Task<IActionResult> GetById([FromRoute] Guid id)
		{
			var categoryDomain = await categoryRepository.GetByIdAsync(id);

			if (categoryDomain == null)
			{
				return NotFound();
			}

			return Ok(mapper.Map<CategoryDto>(categoryDomain));
		}

		[HttpPost]
		public async Task<IActionResult> Create([FromBody] AddCategoryRequestDto addCategoryRequestDto)
		{
			// map DTO to Domain
			var categoryDomainModel = mapper.Map<Category>(addCategoryRequestDto);

			// use Domain model to create
			categoryDomainModel = await categoryRepository.CreateAsync(categoryDomainModel);

			//map Domain to DTO
			var categoryDto = mapper.Map<CategoryDto>(categoryDomainModel);

			return CreatedAtAction(nameof(GetById), new { id = categoryDto.Id }, categoryDto);
		}

		[HttpPut]
		[Route("{id:Guid}")]
		public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdateCategoryRequestDTO updateCategoryRequestDTO)
		{
			var categoryDomainModel = mapper.Map<Category>(updateCategoryRequestDTO);

			categoryDomainModel = await categoryRepository.UpdateAsync(id, categoryDomainModel);

			if (categoryDomainModel == null)
			{
				return NotFound();
			}

			return Ok(mapper.Map<CategoryDto>(categoryDomainModel));
		}
	}
}
