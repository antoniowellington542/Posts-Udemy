import { PostCard } from "../PostCard/PostCard";

import './Posts.styles.css'; 

//COMPONENTE POSTS
export const Posts = ({ posts }) =>{
    return posts.length > 0 ? (
        <div className="posts">
          { posts.map(post => (
              <PostCard
                key={post.id}
                id={post.id}
                title={post.title}
                body={post.body}
                cover={post.cover}
              />
          ))}
        </div>
    ): <p>Não existem posts</p>
}