import React from 'react';

export default function FollowButton({ isFollowed, onFollowClick }) {
    const buttonStyle = {
        backgroundColor: isFollowed ? 'blue' : 'grey',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    };

    return (
        <button style={buttonStyle} onClick={onFollowClick}>
            {isFollowed ? 'Seguindo' : 'Seguir'}
        </button>
    );
}
