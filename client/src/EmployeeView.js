import React from 'react';
import MyLoader from './customLoader/MyLoader';

import { useParams, Link } from 'react-router-dom';

const EmployeeView = (props) => {

    
    const getRetirementAge = function (startDate) {
        let dateJoin = new Date(startDate);
        let retirementAge = 65;

        let yearsUntilRetirement = dateJoin.setFullYear(dateJoin.getFullYear() + retirementAge);


        console.log(dateJoin.getUTCDate());
        return dateJoin.toDateString();


        ;
    }

    const [singleEmployee, setSingleEmployee] = React.useState({});
    const [showLoader, setShowLaoder] = React.useState(true);

    let param = useParams();

    let query = `
        query  {
            GetSingleEmployee(Id: ${param._id}) {
                _id,
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

    function GetSingleEmployee() {
        fetch('http://localhost:3001/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
        }).then(async (response) => {
            let tempEmployee = await response.json();
            let tempList = tempEmployee.data.GetSingleEmployee;
            
            setSingleEmployee(tempList)
            setShowLaoder(false);
        }, function(err) {
            console.log('Failed to fetch EmployeeDetails');
            setShowLaoder(false);
        })
    }

    React.useEffect(function () {
        GetSingleEmployee();
    }, [param._id]);



    return (
        <div>
        

            <h3 style={{ "color": "Red" }}>{ }</h3>

            {showLoader ? <MyLoader sttmt={'Fetching Data..Please wait.'}/> : 
            <form className="viewEmpForm" name="viewEmp" >

                <fieldset>
                    <legend><h3>User details:</h3></legend>
                    <table className="viewEmp">
                        <tbody>
                            <tr><td>Employee Type</td>
                                <td className="alignLeftInputs">
                                    <h3>{singleEmployee.EmployeeType}</h3></td></tr>
                            <tr><td>First Name
                            </td><td className="alignLeftInputs">
                                    <h3>{singleEmployee.FirstName}</h3></td>
                            </tr>
                            <tr><td>Last Name</td><td className="alignLeftInputs"> <h3>{singleEmployee.LastName}</h3></td></tr>
                            <tr><td>Age</td><td className="alignLeftInputs">
                                <h3>{singleEmployee.Age}</h3>
                            </td>
                            </tr>   
                            <tr><td>Designation</td>
                                <td className="alignLeftInputs">
                                    <h3>{singleEmployee.Title}</h3>
                                </td></tr>
                            
                            <tr><td>Date of joining</td><td> <h3>{singleEmployee.DateOfJoining !== undefined ? new Date(singleEmployee.DateOfJoining).toDateString() : ''}</h3></td></tr>
                                                        
                            <tr><td>Retirement Date</td><td style={{'color':'red'}}> <h3>{singleEmployee.DateOfJoining !== undefined ? getRetirementAge(singleEmployee.DateOfJoining) : ''}</h3></td></tr>

                         
                            <tr><td>
                                Department</td>
                                <td className="alignLeftInputs">
                                    <h3>{singleEmployee.Department}</h3></td></tr>
                            <tr>
                                <td>
                                    Current Status</td>
                                    <td className="alignLeftInputs">
                                        <h3>{singleEmployee.CurrentStatus}</h3></td></tr>
                                <tr>                                    
                                    
                        <td><Link to={`/edit/${singleEmployee.Id}`}>Edit</Link></td>
                                    </tr>
                             
                        </tbody>
                    </table>
                </fieldset>


            </form>
}

        </div>

    )
}

export default EmployeeView;