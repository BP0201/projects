import React, { useState, useEffect } from 'react';

const AdminPortal = ({ getAllUsers }) => {
  const [users, setUsers] = useState([]);

  useEffect(function loadUsers() {
    loadAllUsers()
  }, [])

  async function loadAllUsers() {
    // defined function from App, fetches users from backend
    setUsers(await getAllUsers());
  }

  return (
    <div className='AdminPortal container'>
      <h1 className='display-4'>Admin Portal</h1>
      <h3>All Users:</h3>
        <ul data-testid="ap-user-list">
          {users.map(u => (
            <li key={u.username}>
              {u.username}
            </li>
          ))}
        </ul>
    </div>
  )
}

export default AdminPortal;