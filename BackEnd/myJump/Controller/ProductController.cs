using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using myJump.Model;

namespace myJump.Controller
{
    [Route("api/[controller]")]
    [Authorize(Policy = "ApiUser")]//Разделение по ролям
    [ApiController]
    public class ProductController : ControllerBase
    {
        private Context db;
        public ProductController(Context context)
        {
            db = context;
        }
        [Produces("application/json")]
        [HttpGet("findAll")]
        public async Task<IActionResult> findAll(int id)
        {
            try
            {
                var products = db.Products.ToList();
                return Ok(products);
            }
            catch
            {
                return BadRequest();
            }
        }
        [Produces("application/json")]
        [HttpGet("find/{id}")]
        public async Task<IActionResult> find(int id)
        {
            try
            {
                var product = db.Products.SingleOrDefault(m => m.Id == id);
                return Ok(product);
            }
            catch
            {
                return BadRequest();
            }
        }
        [Produces("application/json")]
        [Consumes("application/json")]
        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] Product product)
        {
            try
            {
                db.Products.Add(product);
                db.SaveChanges();
               
                return Ok(product);
            }
            catch
            {
                return BadRequest();
            }
        }
        [Produces("application/json")]
        [Consumes("application/json")]
        [HttpPut("update")]
        public async Task<IActionResult> Update([FromBody] Product product)
        {
            try
            {
                db.Entry(product).State =
                        Microsoft.EntityFrameworkCore.EntityState.Modified;               
                db.SaveChanges();
                return Ok(product);
            }
            catch
            {
                return BadRequest();
            }
        }
        [Produces("application/json")]
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                db.Remove(db.Products.Find(id));
                db.SaveChanges();               
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}