import { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [employee, setEmployee] = useState();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [firstNames, setFirstNames] = useState([]);
    const [lastNames, setLastNames] = useState([]);

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };

    const handleFirstNameEdit = (event, id) => {
        var arr = [...firstNames];
        arr[id] = event.target.value;
        setFirstNames(arr);
    }

    const handleLastNameEdit = (event, id) => {
        var arr = [...lastNames];
        arr[id] = event.target.value;
        setLastNames(arr);
    }

    useEffect(() => {
        populateEmployees();
    }, []);

    const contents = employee === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Save Edits</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {employee.map(employee =>
                    <tr key={employee.id}>
                        <td>{employee.id}</td>
                        <td><input type="text" name="firstName" defaultValue={employee.firstName} onInput={(e) => handleFirstNameEdit(e, employee.id)} /></td>
                        <td><input type="text" name="firstName" defaultValue={employee.lastName} onInput={(e) => handleLastNameEdit(e, employee.id)} /></td>
                        <td>
                            <form onSubmit={(e) => formEdit(e, employee.id)}>
                                <input type="submit" value="Save" />
                            </form>
                        </td>
                        <td>
                            <form onSubmit={(e) => formDelete(e, employee.id)}>
                                <input type="submit" value="Delete" />
                            </form>
                        </td>   
                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <div>
            <h1 id="tableLabel">Asset Mark Employees</h1>
            <h2>Add New Employee</h2>
            <form onSubmit={formSubmit}>
                <table id="createForm">
                    <tr>
                        <td>
                            <span>First Name:</span>
                        </td>
                        <td>
                            <input type="text" name="firstName" value={firstName} onInput={handleFirstNameChange} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span>Last Name:</span>
                        </td>
                        <td>
                            <input type="text" name="lastName" value={lastName} onInput={handleLastNameChange} />
                        </td>
                    </tr>
                </table> 
                <input type="submit" value="Create" />
            </form>
            <br />
            <br />
            {contents}
        </div>
    );
    
    async function populateEmployees() {
        const response = await fetch('employee');
        if (response.ok) {
            const data = await response.json();
            setEmployee(data);
        }
    }

    async function formDelete(e, id) {
        e.preventDefault();
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(id)
        };
        await fetch('employee', requestOptions);
        populateEmployees();

    }

    async function formEdit(e, id) {
        e.preventDefault();
        var arr1 = [...firstNames];
        var arr2 = [...lastNames];
        var obj = {
            id: id,
            firstName: arr1[id] ? arr1[id] : null,
            lastName: arr2[id] ? arr2[id] : null
        }
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        };
        await fetch('employee', requestOptions);
        populateEmployees();
    }



    async function formSubmit(e) {
        e.preventDefault();
        let data = [firstName, lastName];
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( data )
        };
        setFirstName("");
        setLastName("");



        await fetch('employee', requestOptions);
        populateEmployees();

    }
}

export default App;