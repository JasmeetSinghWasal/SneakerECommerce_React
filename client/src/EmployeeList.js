import React from 'react';
import AddEmployee from './AddEmployee';
import EmployeeFilter from './EmployeeFilter';
import EmployeeTable from './EmployeeTable';
import { useLocation, useNavigate, useParams } from 'react-router-dom'


import MyLoader from './customLoader/MyLoader';

export const EmployeeList = (props) => {

    const navigate = useNavigate();
    const params = useLocation().search
    const value = new URLSearchParams(params).get("FirstName");
    //    console.log(value);

    let id = useParams();


    const [allEmployee, setAllEmployee] = React.useState([]);
    const [isDeleted, setIsDeleted] = React.useState(false);
    const [showLoader, setShowLoader] = React.useState(false);


    const fetchEmployeeList = async () => {
        let query = `
        query  {
            EmployeeList(FirstName: "${value}") {
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

        // function fetchEmployeeList() {
        fetch('http://localhost:3001/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
        }).then(async (response) => {
            let tempEmployee = await response.json();
            // console.log(tempEmployee.data.EmployeeList);
            let tempList = tempEmployee.data.EmployeeList;
            setAllEmployee(tempList)
        })
        // }
    }

    const AddOneEmployee = async (newEmployee) => {
        //To Add issue
        const EmployeeType = newEmployee.EmployeeType;
        const FirstName = newEmployee.FirstName;
        const LastName = newEmployee.LastName;
        const Age = newEmployee.Age;
        const Title = newEmployee.Title;
        const Department = newEmployee.Department;
        const DateOfJoining = newEmployee.DateOfJoining;
        const query = `
        mutation {
            AddOneEmployee(EmployeeType: "${EmployeeType}", FirstName: "${FirstName}",LastName: "${LastName}", Age: ${Age}, Title: "${Title}", Department: "${Department}", DateOfJoining : "${DateOfJoining}")  {
              Id
              EmployeeType
              FirstName
              LastName
              Age
              DateOfJoining
              Title
              Department
              CurrentStatus
            }
          }
        `;
        const response = await fetch('http://localhost:3001/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
        });
        console.log(response);
        if (response.status === 200) {
            setIsDeleted(false);
            fetchEmployeeList();
        }
    }

    const DeleteRecord = async (_id) => {
        setShowLoader(true);
        let query = `
    mutation {
      DeleteEmployee(_id: "${_id}") {
        _id
        Id
        EmployeeType
        FirstName
        LastName
        Age
        DateOfJoining
        Department
        CurrentStatus
        Title
      }
    }
    `;

        const resp = await fetch('http://localhost:3001/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
        }).then(async (response) => {
            if (response.status == 200) {
               
                let tempEmployee = await response.json();
                // console.log(tempEmployee.data.EmployeeList);
                // if(tempEmployee !== null && tempEmployee !== undefined){
                let tempList = tempEmployee.data.DeleteEmployee;
                console.log('Deleted record');

                // setAllEmployee(tempList)
            }
            else {
                
                console.log('Failed to delete item : ', response)
            }

        })
            .then(() => {
                setShowLoader(false);
                setIsDeleted(true);
                navigate('/list');
                // fetchEmployeeList();


            }).catch((err) => {
                setIsDeleted(false);
                console.log('Failed to deleteItem.', err);
            })
    }

    React.useEffect(function () {
        if (props.shouldDeleteId) {
            DeleteRecord(id._id);
            setIsDeleted(true);
        }
        else {
            fetchEmployeeList();
            
        }
    }, [id]);


    return (
        <div id="EmployeeList">
            <div className='jumbotron'>
            <img height={'350px'} src={require('./jumboMain.jpeg')} />
                </div>
            <EmployeeFilter />
            <hr />
            {showLoader ? <MyLoader sttmt={'Deleting record..Please wait.'}/> : <section>
            {isDeleted ? <h3 style={{'color':'red'}}>Employee Deleted</h3> : ''}
            {/* {showMsg != "" ? <h3> User is WORKING. Cannot be deleted.</h3> : ''} */}
            <EmployeeTable allEmployee={allEmployee} />
            <hr />
            <AddEmployee AddOneEmployee={AddOneEmployee} />
            </section>
}
        </div>
    )
}
export default EmployeeList;