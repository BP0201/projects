import React from 'react';

// used to create miniature alerts when an error occurs in a form
const Alert = ({ type = "danger", messages = [] }) => {
    for (let i = 0; i < messages.length; i++) {
        if (typeof messages[i] !== "string" || messages[i] === "") {
            messages.splice(i, 1)
        }
    }
    if (messages.length) {
        let messagesSet = new Set(messages)
        messages = Array.from(messagesSet)
        return (
            <div className={`alert alert-${type}`} role="alert">
                {messages.map((err, idx) => (
                    <p className='m-0 small' data-testid="alert-p" key={idx}>
                        {err}
                    </p>
                ))}
            </div>
        )
    }
}

export default Alert;