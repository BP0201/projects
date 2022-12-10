import React from 'react';

// simple component to display on nonexistent routes
const NotFound = () => {
    return (
        <div className='NotFound container my-5'>
            <div className='row justify-content-center'>
                <h3>404 Not Found</h3>
            </div>
            <div className='row justify-content-center'>
                <p>That route does not exist.</p>
            </div>
        </div>
    )
}

export default NotFound;