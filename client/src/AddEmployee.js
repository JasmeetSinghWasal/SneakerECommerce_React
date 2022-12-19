import React from 'react';


const AddEmployee = ({ AddOneEmployee }) => {

    //Array to store the titles for filteration while selecting roles
    const empTypeArr = ["Seasonal", "Contract"];
    const empTitleArr = ["Manager", "Director", "VP"];

    const [errorMessage, setErrorMessage] = React.useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = document.forms.addEmployee;
        let newEmployee = {

            FirstName: form.FirstName.value,
            LastName: form.LastName.value,
            Age: form.Age.value,
            Title: form.Title.value,
            Department: form.Department.value,
            DateOfJoining: form.DateOfJoining.value === undefined ? new Date() : new Date(form.DateOfJoining.value),
            EmployeeType: form.EmployeeType.value,

        }
        if (form.FirstName.value.length < 3) {
            setErrorMessage("First Name cannot be less than 3 characters");
        }
        else if (form.Age.value < 20 || form.Age.value > 70) {
            setErrorMessage("Age should be in 20-70");
        }
        else if(empTypeArr.includes(form.EmployeeType.value) && empTitleArr.includes(form.Title.value))
        {
            alert('Contractual/ Seasonal Employee cannot be a Manager, Director or VP');
        }
        else {
            AddOneEmployee(newEmployee);
            alert('User added');
            form.reset();
        }

    }

    return (


        <div>
            {/* <h2>This is placeholder for Add Employee</h2>  */}
            <h3>
                Please fill below details to add a user
            </h3>
            <h3 style={{ "color": "Red" }}>{errorMessage}</h3>

            <form className="addEmpForm" name="addEmployee" onSubmit={handleSubmit}>
                <fieldset>
                    <legend>User details:</legend>
                    <table className="addEmpTable">
<tbody>

                        <tr><td>Employee Type</td>
                            <td className="alignLeftInputs"><select id="EmployeeType" name="EmployeeType">
                                {["FullTime", "PartTime", "Seasonal", "Contract"]
                                    .map((str, i) => {
                                        return <option key={i} value={str}>{str}</option>
                                    })}
                            </select></td></tr>
                        <tr><td>First Name
                        </td><td className="alignLeftInputs"> <input type="text" name="FirstName" placeholder="First Name" required></input></td>
                        </tr>
                        <tr><td>Last Name</td><td className="alignLeftInputs"> <input type="text" name="LastName" placeholder="Last Name" required></input></td></tr>
                        <tr><td>Age</td><td className="alignLeftInputs"><input className="ageInput" type="number" name="Age" placeholder="Age(between 20-70 ) required" min="20" max="70" ></input>
                        </td>
                        </tr>
                        <tr><td>Designation</td>
                            <td className="alignLeftInputs"><select name="Title">
                                <option value="" disabled="disabled" >Please select Title</option>
                                <option value="Employee">Employee</option>
                                <option value="Manager">Manager</option>
                                <option value="Director">Director</option>
                                <option value="VP">VP</option>
                            </select></td></tr>
                        <tr><td>Date of joining</td><td>  <input className="alignLeftInputs" id="DateOfJoining" type="Date" name="DateOfJoining" max="2065-12-31" min="1994-12-10" required /></td></tr>
                        <tr><td>
                            Department</td>
                            <td className="alignLeftInputs">
                                <select className="ddnStyle" name="Department">
                                    <option value="" disabled="disabled" >Department</option>
                                    <option value="IT">IT</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="HR">HR</option>
                                    <option value="Engineering">Engineering</option>
                                </select></td></tr>
                        <tr><td colSpan={2}  > <button type="submit">Submit</button></td></tr>
                        </tbody>
                    </table>
                </fieldset>


            </form>

        </div>

    )
}

export default AddEmployee;