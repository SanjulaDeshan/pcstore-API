using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using pcstore.API.Models.Domain;
using pcstore.API.Models.DTO;
using pcstore.API.Repositories;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace pcstore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdvertisementController : ControllerBase
    {
        private readonly IAdvertisementRepository advertisementRepository;
        private readonly IMapper mapper;

        public AdvertisementController(IAdvertisementRepository advertisementRepository, IMapper mapper)
        {
            this.advertisementRepository = advertisementRepository;
            this.mapper = mapper;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] bool? isActive)
        {
            var advertisements = await advertisementRepository.GetAllAsync(isActive);
            return Ok(mapper.Map<List<AdvertisementDto>>(advertisements));
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var advertisement = await advertisementRepository.GetByIdAsync(id);
            if (advertisement == null)
            {
                return NotFound();
            }
            return Ok(mapper.Map<AdvertisementDto>(advertisement));
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] AddAdvertisementRequestDto requestDto)
        {
            var advertisementModel = mapper.Map<Advertisement>(requestDto);
            advertisementModel = await advertisementRepository.CreateAsync(advertisementModel);
            var advertisementDto = mapper.Map<AdvertisementDto>(advertisementModel);
            return CreatedAtAction(nameof(GetById), new { id = advertisementDto.Id }, advertisementDto);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdateAdvertisementRequestDto requestDto)
        {
            var advertisementModel = mapper.Map<Advertisement>(requestDto);
            advertisementModel = await advertisementRepository.UpdateAsync(id, advertisementModel);

            if (advertisementModel == null)
            {
                return NotFound();
            }

            return Ok(mapper.Map<AdvertisementDto>(advertisementModel));
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var advertisementModel = await advertisementRepository.DeleteAsync(id);

            if (advertisementModel == null)
            {
                return NotFound();
            }

            return Ok(mapper.Map<AdvertisementDto>(advertisementModel));
        }
    }
}
