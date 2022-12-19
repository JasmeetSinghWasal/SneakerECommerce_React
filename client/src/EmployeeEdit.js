import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import MyLoader from './customLoader/MyLoader';

const EmployeeEdit = (props) => {

    // console.log('edit',props)
    let params = useParams();

    const empTypeArr = ["Seasonal", "Contract"];
    const empTitleArr = ["Manager", "Director", "VP"];

    const [EmployeeType, setState] = useState(false);
    const [Employee, setEmployee] = useState({});
    const [showLoader, setShowLoader] = useState(false);

    const getValsToEdit = async (id) => {
        setShowLoader(true);
        let query = `
        query  {
            GetSingleEmployee(Id: ${id}) {
                _id
                Id
                EmployeeType
                FirstName
                LastName
                Age
                Title 
                DateOfJoining
                Department
                CurrentStatus
            }
      }
    `;

        fetch('http://localhost:3001/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
        }).then(async (response) => {
            if (response.status === 200) {
                setShowLoader(false)
                    ; let Employee = await response.json();
                setEmployee(Employee.data.GetSingleEmployee);
            }
        })
    };




    React.useEffect(function () {
        getValsToEdit(params.id);
    }, []);

    const handleUpdate = async (e) => {
        setShowLoader(true);
        e.preventDefault()
        const form = document.forms.editEmployee;
        let modifyEmployee = {
            _id: Employee._id,
            Title: form.Title.value,
            Department: form.Department.value,
            CurrentStatus: form.CurrentStatus.value,

        }

        if (empTypeArr.includes(Employee.EmployeeType) && empTitleArr.includes(form.Title.value)) {
            alert('Contractual/ Seasonal Employee cannot be a Manager, Director or VP');
            setShowLoader(false);
                setState(true);
        }
        else {
            const query = `
            mutation{
                UpdateEmployee(modifyEmployee:{_id: "${modifyEmployee._id}",  Title: "${modifyEmployee.Title}", Department: "${modifyEmployee.Department}", CurrentStatus: "${modifyEmployee.CurrentStatus}"}){
                    _id 
                    Id
                    EmployeeType
                    FirstName
                    LastName
                    Age
                    Title
                    Department
                    DateOfJoining
                    CurrentStatus
                }
            }
        `;

            await fetch('http://localhost:3001/graphql', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query })
            }).then(async (response) => {
                setShowLoader(false);
                setState(true);

            })
        }
    }

    return (
        <div>
            {EmployeeType ? (
                <Navigate to="/" />
            ) : null}

            <h3>Edit employee Details</h3>

            {showLoader ? <MyLoader sttmt={'Please wait.'} /> : <section>
                <form name="editEmployee" onSubmit={handleUpdate}>
                    <table className="editEmpTable">
                        <tr><td>Employee Id</td>
                            <td><h3>{`${Employee.Id}`}</h3></td>
                        </tr>

                        <tr><td>Employee Full Name</td>
                            <td><h3>{`${Employee.FirstName} ${Employee.LastName}`}</h3></td>
                        </tr>
                        <tr><td>Date of joining</td>
                            <td><h3>{`${new Date(Employee.DateOfJoining).toDateString()}`}</h3></td>
                        </tr>

                        <tr>
                            <td>Employee Type</td>
                            <td><h3>{`${Employee.EmployeeType}`}</h3></td>
                        </tr>

                        <tr><td>Designation</td>
                            <td>
                                <select id="Title" name="Title">
                                    {["Employee", "Manager", "Director", "VP"]
                                        .map((str, i) => {
                                            return (str === Employee.Title ? <option key={i} value={str} selected>{str}</option> :
                                                <option key={i} value={str}>{str}</option>)
                                        })}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Department</td>
                            <td>
                                <select id="Department" name="Department">
                                    {["IT", "Marketing", "HR", "Engineering"]
                                        .map((str, i) => {
                                            return (str === Employee.Department ? <option key={i} value={str} selected>{str}</option> :
                                                <option key={i} value={str}>{str}</option>)
                                        })}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Current Status</td>
                            <td>
                                {/* <select name="CurrentStatus" defaultValue={Employee.CurrentStatus}>
                                <option value="" disabled="disabled" >Please select CurrentStatus</option>
                                <option value="Working">Working</option>
                                <option value="Not Working">Not Working</option>
                            </select> */}
                                <select id="CurrentStatus" name="CurrentStatus">
                                    {["Working", "Not Working"]
                                        .map((str, i) => {
                                            return (str === Employee.CurrentStatus ? <option key={i} value={str} selected>{str}</option> :
                                                <option key={i} value={str}>{str}</option>)
                                        })}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <button type="submit">Submit</button>
                            </td>
                        </tr>
                    </table>
                </form>
            </section>
            }
        </div>
    )
}

export default EmployeeEdit; 