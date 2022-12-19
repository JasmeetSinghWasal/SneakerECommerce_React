import React from "react";
import {  Routes, Route, useLocation} from 'react-router-dom';
import EmployeeEdit from './EmployeeEdit';
import EmployeeFilter from './EmployeeFilter';
import EmployeeList from './EmployeeList';
import EmployeeFiltered from './EmployeeFiltered';
import EmployeeView from "./EmployeeView";
import EmployeesAboutToRetire from "./EmployeesAboutToRetire";


const NotFound = () => <h2>Custom 404 : Page not available, check routes</h2>

export default function PageRoutes() {


// the query string for you.
function useQuery() {
    const { search } = useLocation();
  
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  
    let qry = useQuery();
    
    return (
                <Routes>
                    <Route exact path='/' element={<EmployeeList />} />
                    <Route exact path='/list' element={<EmployeeList />} />
                    <Route path='/edit/:id' element={<EmployeeEdit />} />
                    <Route path='/delete/:_id' element={<EmployeeList shouldDeleteId = {true}/>} />
                    <Route path='/filter' element={<EmployeeFiltered type={qry}/>} />
                    <Route path='/view/:_id' element={<EmployeeView val={qry}/>} />       
                    <Route path='/aboutToRetire/' element={<EmployeesAboutToRetire/>} />     
                                 
                    <Route path='/*' element={<NotFound />} />
                </Routes>
    )
}