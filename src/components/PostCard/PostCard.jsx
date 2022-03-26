import React from "react";

import './PostCard.styles.css'; 

//COMPONENTE CARD 
export const PostCard = ({ id, title, body, cover }) =>(
        <div className="post">
            <img src={cover} alt={title}/>
            <div className="post-content">
                <h2>{title} {id}</h2>
                <p>{body}</p>
            </div>
        </div>
);


export default PostCard;