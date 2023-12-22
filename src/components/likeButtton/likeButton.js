import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

export default function LikeButton() {
    const [liked, setLiked] = useState(false);

    const toggleLike = () => {
        setLiked(!liked);
    };

    const buttonStyle = {
        backgroundColor: liked ? 'blue' : 'grey',
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
        <button style={buttonStyle} onClick={toggleLike}>
            <FontAwesomeIcon icon={faThumbsUp} style={{ marginRight: '10px' }} />
            {liked ? 'Curtido' : 'Curtir'}
        </button>
    );
}
