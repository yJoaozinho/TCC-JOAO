import React, { useState, useEffect } from 'react';

export default function CustomCheckbox({ postId }) {
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        // Chave única no localStorage para cada post
        const storageKey = `checked-${postId}`;
        const checkedStatus = localStorage.getItem(storageKey);
        setChecked(checkedStatus === 'true');
    }, [postId]);

    const handleChange = (e) => {
        const newCheckedStatus = e.target.checked;
        setChecked(newCheckedStatus);
        // Chave única no localStorage para cada post
        const storageKey = `checked-${postId}`;
        localStorage.setItem(storageKey, newCheckedStatus.toString());
    };

    const containerStyle = {
        cursor: 'pointer',
        userSelect: 'none',
        display: 'inline-block',
    };

    return (
        <label style={containerStyle}>
            <input
                type="checkbox"
                checked={checked}
                onChange={handleChange}
                style={{ display: 'none' }}
            />
            {checked ? (
                <svg style={{ height: '30px', width: '30px', fill: '#E3474F' }} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.4,4C14.6,4,13,4.9,12,6.3C11,4.9,9.4,4,7.6,4C4.5,4,2,6.5,2,9.6C2,14,12,22,12,22s10-8,10-12.4C22,6.5,19.5,4,16.4,4z"></path>
                </svg>
            ) : (
                <svg style={{ height: '30px', width: '30px', fill: '#666' }} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.4,4C14.6,4,13,4.9,12,6.3C11,4.9,9.4,4,7.6,4C4.5,4,2,6.5,2,9.6C2,14,12,22,12,22s10-8,10-12.4C22,6.5,19.5,4,16.4,4z"></path>
                </svg>
            )}
        </label>
    );
}
