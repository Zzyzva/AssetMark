using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using ReactApp1.Server.Model;
using System;
using System.Text.Json;

namespace ReactApp1.Server.Controllers
{
    [ApiController]
    [Route("employee")]
    public class EmployeeController : ControllerBase
    {

        private EmployeeManager manager;

        public EmployeeController() {
            manager = EmployeeManager.GetInstance();
        }

        [HttpPost]
        public void Post([FromBody] string[] data)
        {
            manager.AddEmployee(data[0], data[1]);
        }

        [HttpGet]
        public string Get()
        {
            return JsonConvert.SerializeObject(manager.GetEmployees());
        }

        [HttpDelete]
        public void Delete([FromBody] int id)
        {
           manager.RemoveEmployee(id);
        }

        [HttpPut]
        public void Edit([FromBody] Employee e)
        {
            manager.EditEmployee(e);
        }

    }
}
