import React from 'react';
import EmployeeFilter from './EmployeeFilter';
import EmployeeTable from './EmployeeTable';


import MyLoader from './customLoader/MyLoader';

import { useParams, Navigate, useLocation } from 'react-router-dom';

  
const EmployeeFiltered = (props) => {

    let type = props.type.get('type');
    
    const [allEmployee, setAllEmployee] = React.useState([]);
    const [showLoader, setShowLaoder] = React.useState(true);

    let query = `
        query  {
            EmployeeFiltered(EmployeeType: "${type}") {
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

    function fetchEmployeeFiltered() {
        fetch('http://localhost:3001/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ query })
        }).then(async (response)=> {
            let tempEmployee = await response.json();
            console.log(tempEmployee.data.EmployeeFiltered);
            let tempList = tempEmployee.data.EmployeeFiltered;
            setAllEmployee(tempList)
            setShowLaoder(false);
        }, function(err) {
            console.log('Failed to filter employees of type',type);
            setShowLaoder(false);
        })
    }

    React.useEffect(function(){
        fetchEmployeeFiltered();
    },[type]);

   
    return (
        <div id="EmployeeList">  
        <section>
            <EmployeeFilter selected = {type} />
            <hr/>
            {showLoader ? <MyLoader sttmt={'Filtering Data..Please wait.'}/> : 
            <EmployeeTable allEmployee={allEmployee}/>
    }
            <hr/>     
            </section>
    
        </div>
     
    )
}
export default EmployeeFiltered;