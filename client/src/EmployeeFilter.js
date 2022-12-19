import React from 'react';
import {Link} from 'react-router-dom';
const EmployeeFilter = (props) => {
    return (
       <div className='filter'>
        <h4></h4>
        <div className="filterStyles">

            <Link   className="filterStyles" to="/">All Employee</Link>
             { ' | ' }
            <Link  className="filterStyles" to={"/filter?type=FT"}>Full Time</Link>
            { ' | ' }
            <Link  className="filterStyles" to={"/filter?type=PT"}>Part Time</Link>

        </div>
        <form name="EmployeeFilter"  action='filter'>
            <table className="table filterEmpTable">
                <tbody>
                    <tr>
                        <td colSpan={2}><h3>More Filters below</h3></td>
                    </tr>
                <tr>
                <td>       Employee Type  :          
                <select className='form-control' name='type'>
                    <option value='null'>All</option>
                    {
                        ["FullTime","PartTime","Seasonal","Contract"].map((str,i)=>{
                            return <option key={i} value={str.charAt(0)+"T"} selected = {(str.charAt(0)+"T") === props.selected}>{str}</option>
                        })
                    }
                </select>
                </td>
                <td>
                <button class="btn-primary" Style="padding:5px 10px 5px 10px"  type='submit'>Filter</button>
                </td>
                </tr>
                </tbody>
            </table>
        </form>
       </div>
    )
}

export default EmployeeFilter;