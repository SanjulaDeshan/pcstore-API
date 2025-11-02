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
	public class BrandController : ControllerBase
	{
		private readonly IMapper mapper;
		private readonly IBrandRepository brandRepository;

		public BrandController(IMapper mapper, IBrandRepository brandRepository)
        {
			this.mapper = mapper;
			this.brandRepository = brandRepository;
		}

		[HttpGet]
		public async Task<IActionResult> GetAll()
		{
			var brandDomain = await brandRepository.GetAllAsync();

			return Ok(mapper.Map<List<BrandDto>>(brandDomain));
		}

		[HttpGet]
		[Route("{id:Guid}")]
		public async Task<IActionResult> GetById([FromRoute] Guid id)
		{
			var brandDomain = await brandRepository.GetByIdAsync(id);

			if (brandDomain == null)
			{
				return NotFound();
			}

			return Ok(mapper.Map<BrandDto>(brandDomain));
		}

		[HttpPost]
		public async Task<IActionResult> Create([FromBody] AddBrandRequestDto addBrandRequestDto)
		{
			var brandDomainModel = mapper.Map<Brand>(addBrandRequestDto);

			brandDomainModel = await brandRepository.CreateAsync(brandDomainModel);

			var brandDto = mapper.Map<BrandDto>(brandDomainModel);

			return CreatedAtAction(nameof(GetById), new { id = brandDto.Id }, brandDto);
		}

		[HttpDelete]
		[Route("{id:Guid}")]
		public async Task<IActionResult> Delete([FromRoute] Guid id)
		{
			var brandDomainModel = await brandRepository.DeleteAsync(id);

			if (brandDomainModel == null)
			{
				return NotFound();
			}

			return Ok(mapper.Map<BrandDto>(brandDomainModel));
		}
	}
}
