import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

export default function LikeButton({ postId }) {
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        // Chave única no localStorage para cada post
        const likedStatus = localStorage.getItem(`liked-${postId}`);
        setLiked(likedStatus === 'true');
    }, [postId]);

    const toggleLike = () => {
        const newLikedStatus = !liked;
        setLiked(newLikedStatus);
        // Atualiza o estado no localStorage com chave única para cada post
        localStorage.setItem(`liked-${postId}`, newLikedStatus.toString());
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
