using Microsoft.AspNetCore.Mvc;
using InsuranceAPI.Services;

namespace InsuranceAPI.Controllers {
    [Route("api/insured")]
    [ApiController]
    public class InsuredController : ControllerBase {
        private readonly IInsuredService _service;

        public InsuredController(IInsuredService service){
            _service = service;
        }

        [HttpGet]
        [Route("all")]
        public IActionResult all() { 
            return Ok(_service.getAll());
        }

        [HttpGet]
        [Route("search")]
        public IActionResult match([FromQuery] string query) {
            return Ok(_service.getFromSearch(query));
        }

        [HttpGet]
        [Route("id/{id:int}")]
        public IActionResult getById(int id) {
            var ret = _service.getById(id);
            return ret != null ?
                    Ok(ret) : 
                    NotFound();
        }

        [HttpGet]
        [Route("test")]
        public IActionResult test() {
            return Ok("funca");
        }
    }
}
