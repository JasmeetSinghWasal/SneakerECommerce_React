import React from 'react';
import EmployeeRow from './EmployeeRow';



const EmployeeTable = ({allEmployee}) => {
 
    let AllEmployeeRow = null;
if(allEmployee != null && allEmployee.length > 0){    
     AllEmployeeRow = allEmployee.map(Employee => (
        <EmployeeRow noData = {false} key={Employee.Id} _Id={Employee._id} Id={Employee.Id} EmployeeType={Employee.EmployeeType} FirstName={Employee.FirstName} LastName={Employee.LastName} Age={Employee.Age} DateOfJoining={Employee.DateOfJoining} Title={Employee.Title} Department={Employee.Department} CurrentStatus={Employee.CurrentStatus} />
    ))}
    else
    {
        AllEmployeeRow = <EmployeeRow noData={true}/>
    }
    return (
        <div className='table ' >
          <h3>List of Employees</h3>
            <table className='table-striped myEmpTable' >
                <thead>
                    <tr>
                        <th></th>
                        <th>Id</th>
                        <th>Employee Type</th>
                        <th>FirstName</th>
                        <th>LastName</th>
                        <th>Age</th>
                        <th>Title</th>
                        <th>DateOfJoining</th>
                        <th>Department</th>
                        <th>CurrentStatus</th>
                        <th>Edit</th>
                        <th>Delete</th>
                        <th>Time to Retire</th>
                    </tr>
                </thead>
                <tbody>                    
                    {AllEmployeeRow}
                </tbody>
            </table>
        </div>

    )
}
export default EmployeeTable;