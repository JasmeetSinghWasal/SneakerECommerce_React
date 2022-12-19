import { React, useState } from 'react';
import { Link } from 'react-router-dom';



const EmployeeRow = (props) => {

    const getStringFromDate = function(date)
    {
        const strDate = new Date(date);
        return strDate.toDateString();
    }
    const getRetirementAge = function (startDate) {
        let dateJoin = new Date(startDate);
        let retirementAge = 65;

        let yearsUntilRetirement = dateJoin.setFullYear(dateJoin.getFullYear() + retirementAge);


        console.log(dateJoin.getUTCDate());
        return dateJoin.toDateString();


        ;
    }

    const [status, setStatus] = useState(false);
    const showMsg = () => {
        setStatus("Cannot delele record. User still 'Working");
    }

    if (props.noData) {
        return (<tr>
            <td colSpan="12">No data found</td>
        </tr>);
    }
    else {

        return (

            <>
                <tr>
                    <td><Link to={`/view/${props.Id}`}>View Details</Link></td>
                    <td>{props.Id}</td>
                    <td>{props.EmployeeType}</td>
                    <td>{props.FirstName}</td>
                    <td>{props.LastName}</td>
                    <td>{props.Age}</td>
                    <td>{props.Title}</td>
                    <td>{getStringFromDate(props.DateOfJoining)}</td>
                    <td>{props.Department}</td>
                    <td>{props.CurrentStatus}</td>
                    <td><Link to={`/edit/${props.Id}`}>Edit</Link></td>
                    {props.CurrentStatus === "Working" ? <td><Link to='' onClick={showMsg}>Delete</Link></td> :
                        <td><Link to={`/delete/${props.Id}`}>Delete</Link></td>
                    }
                    <td>{getRetirementAge(props.DateOfJoining)}</td>
                    {status ? <td>Cannot delete user. Still 'working'</td> : ''}


                </tr>
                </>
                )
           
        }
}

export default EmployeeRow;