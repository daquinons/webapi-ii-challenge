import React from 'react';

const PostsList = ({ posts }) => {
  return (
    <div className="PostList">
      {posts
        ? posts.map(post => {
            return (
              <>
                <h3>{post.title}</h3>
                <p>{post.contents}</p>
                <hr />
              </>
            );
          })
        : undefined}
    </div>
  );
};

export default PostsList;
