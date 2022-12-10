import React, { useContext } from 'react';
import UserContext from '../UserContext';

import { NavLink } from 'react-router-dom';

import './Navbar.css'

const Navbar = ({ logout }) => {
    const { currentUser } = useContext(UserContext);

    return (
        <div className='Navbar container-fluid m-0 px-0'>
            <nav className='row navbar navbar-expand-sm navbar-dark' style={{backgroundColor: `#003366`}}>
                {currentUser ?
                <ul className='navbar-nav align-items-center'>
                    <li className='nav-item'>
                        <NavLink to="/" className="navbar-brand">
                            <h1 className='Getflix-logo-h1 my-0 mx-2'>getFlix</h1>
                        </NavLink>
                    </li>
                    {/* <li className='nav-item'>
                        <NavLink to="/search" className='nav-link'>Search</NavLink>
                    </li> */}

                    <li className='nav-item'>
                        <NavLink to="/search" className='nav-link'>Search</NavLink>
                    </li>

                    <li className='nav-item'>
                        <NavLink to="/favorites" className='nav-link'>Favorites</NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink to="/settings" className='nav-link'>Settings</NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink to="/logout"
                            onClick={logout}
                            data-testid="navbar-logout-link"
                            className='nav-link' end>

                            Logout

                        </NavLink>
                    </li>
                    {currentUser.is_admin ?
                    <li className='nav-item'>
                        <NavLink to="/adminportal" data-testid="navbar-ap-link" className='nav-link'>AP</NavLink>
                    </li>
                    :
                    ""
                    }
                </ul>
                :
                <ul className='navbar-nav align-items-center'>
                    <li className='nav-item'>
                        <NavLink to="/" className="navbar-brand">
                            <h1 className='Getflix-logo-h1 my-0 mx-2'>getFlix</h1>
                        </NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink to="/login" data-testid="navbar-login-link" className='nav-link'>Login</NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink to="/signup" className='nav-link'>Signup</NavLink>
                    </li>
                </ul>
                }
            </nav>
        </div>
    )
}

export default Navbar;