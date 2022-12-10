import React, { useContext } from 'react';
import UserContext from '../UserContext';

import { Link } from 'react-router-dom';

const Settings = ({ deleteUser, logout }) => {
    const { currentUser } = useContext(UserContext);

    async function handleDeleteUser() {
        console.log("Deleting account")
        // remove user from db
        await deleteUser(currentUser.username);
        // log out user
        logout();
    }

    return (
        <div className='Settings container'>
            <h1 className='display-4 m-2'>Settings</h1>
            <p className='m-2'>Logged in as: {currentUser.username}</p>
            <ul className='list-unstyled'>
                <li className='border p-3'>
                    <Link to={`/edit/${currentUser.username}`} className='text-primary text-decoration-none'>
                        Change password
                    </Link>
                </li>
                <li onClick={handleDeleteUser} className='border p-3'>
                    <Link to="/" className='text-danger text-decoration-none'>
                        Delete account
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Settings;