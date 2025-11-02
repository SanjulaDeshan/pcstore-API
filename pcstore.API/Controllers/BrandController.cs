using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
	}
}
