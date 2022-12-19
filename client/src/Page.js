import {BrowserRouter as Router, Link } from 'react-router-dom'
import PageRoutes from './PageRoutes'
import Footer from './Footer'
export default function Page(){
    return (
        <main>
        <Router>
            <div className='navbar'>
                <nav>
                    <Link to="/">Add</Link>
                    {' | '}
                    <Link to="/filter">View Users</Link>
                    {' | '}
                    <Link to="/aboutToRetire">Upcoming Retirement</Link>
                </nav>

                <PageRoutes />
            </div>
        </Router>
           <Footer></Footer>
           </main>
    )
}