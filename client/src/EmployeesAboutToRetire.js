import React from 'react';
import AddEmployee from './AddEmployee';
import EmployeeFilter from './EmployeeFilter';
import EmployeeTable from './EmployeeTable';
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import MyLoader from './customLoader/MyLoader';





const getRetirementAge = function (startDate) {
    let dateJoin = new Date(startDate);
    let retirementAge = 65;

    let yearsUntilRetirement = dateJoin.setFullYear(dateJoin.getFullYear() + retirementAge);


    // console.log(yearsUntilRetirement);
    return dateJoin;
    //yearsUntilRetirement.toLocaleDateString();


    ;
}

const checkAge = function(Emp)
{
        //Formatting RDate
            let b = getRetirementAge(Emp.DateOfJoining)
            // .toLocaleDateString('en-US');
            // dd/mm/yyy
            // let r_date = retirementDate.getDate();
            // let r_month = retirementDate.getMonth();
            // let r_year = retirementDate.getFullYear();
            // let rDate = r_date+"/"+r_month+"/"+r_year;

            
            
            //Formatting DOJ
            let a = new Date(Emp.DateOfJoining)
            // .toLocaleDateString('en-US');
            // let j_date = doj.getDate();
            // let j_month = doj.getMonth();
            // let j_year = doj.getFullYear();
            // let jDate = j_date+"/"+j_month+"/"+j_year;

            // const diffTime = Math.abs(retirementDate - doj);

            //     // const diffTime = Math.abs(rDate - jDate)
            //     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
                

            const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
            const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

            const _MS_PER_DAY = 1000 * 60 * 60 * 24;

            const diffDays =  Math.floor((utc2 - utc1) / _MS_PER_DAY);


                if(diffDays < 181)
                {
                    console.log('Add to list',Emp);
                }
}
const EmployeesAboutToRetire = (props) => {

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

            tempEmployee.data.EmployeeList.map(Emp => (
                 checkAge(Emp)
            ));
            let tempList = tempEmployee.data.EmployeeList;
           
            setAllEmployee(tempList)
        })
        // }
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
            {showLoader ? <MyLoader sttmt={'Deleting record..Please wait.'}/> : <section>
            {isDeleted ? <h3 style={{'color':'red'}}>Employee Deleted</h3> : ''}
            {/* {showMsg != "" ? <h3> User is WORKING. Cannot be deleted.</h3> : ''} */}
            <EmployeeTable allEmployee={allEmployee} />
            <hr />
            </section>
}
        </div>
    )
}

export default EmployeesAboutToRetire;