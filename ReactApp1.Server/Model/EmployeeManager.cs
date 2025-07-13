namespace ReactApp1.Server.Model
{
    public class EmployeeManager
    {
        private int nextId;
        public static EmployeeManager instance;
        private List<Employee> employees;

        public static EmployeeManager GetInstance()
        {
            if (instance == null)
            {
                instance = new EmployeeManager();
            }
            return instance;
        }

        public EmployeeManager()
        {
            employees = new List<Employee>();
            nextId = 3;
            employees.Add(new Employee(1, "Shimjith", "Divakar"));
            employees.Add(new Employee(2, "Scott", "Wylie"));
        }

        public List<Employee> GetEmployees()
        {
            return employees;
        }

        public void AddEmployee(string firstName, string lastName)
        {
            Employee e = new Employee(nextId, firstName, lastName);
            employees.Add(e);
            nextId++;
        }

        public void RemoveEmployee(int id)
        {
            Employee e = employees.First(x => x.id == id);
            employees.Remove(e);
        }

        public void EditEmployee(Employee e)
        {
            Employee employeeToEdit = employees.First(x => x.id == e.id);
            if (e.firstName != null)
            {
                employeeToEdit.firstName = e.firstName;
            }

            if (e.lastName != null)
            {
                employeeToEdit.lastName = e.lastName;
            }
        }
    }
}
