namespace ReactApp1.Server.Model
{
    public class Employee
    {
        public int ?id { get; set; }
        public string ?firstName { get; set; }
        public string ?lastName { get; set; }

        public Employee() { }

        public Employee(int id, string firstName, string lastName)
        {
            this.id = id;
            this.firstName = firstName;
            this.lastName = lastName;
        }
    }
}
