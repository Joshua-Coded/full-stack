import React, { useState } from 'react';
import '../CommunityForum.css';

const initialPosts = [
    {
        id: 1,
        title: 'Managing Diabetes',
        content: 'How do you manage your diabetes on a daily basis?',
        comments: [
            { id: 1, text: 'I found that regular exercise helps a lot!' },
            { id: 2, text: 'Diet is key for me. Cutting down on sugar made a big difference.' },
        ],
    },
    {
        id: 2,
        title: 'Healthy Recipes',
        content: 'Share your favorite healthy recipes!',
        comments: [
            { id: 1, text: 'Quinoa salad is both healthy and filling.' },
            { id: 2, text: 'I love making smoothies with spinach, banana, and almond milk.' },
        ],
    },

    {
        id: 3,
        title: 'Dealing with Hypertension',
        content: 'Effective strategies to maintain a healthy blood pressure?',
        comments: [
            { id: 1, text: 'Reducing sodium intake worked wonders for me.' },
            { id: 2, text: 'Regular check-ups with my doctor are essential.' },
        ],
    },

    {
        id: 4,
        title: 'Managing Diabetes',
        content: 'How do you manage your diabetes on a daily basis?',
        comments: [
            { id: 1, text: 'Regular exercise is crucial for me.' },
            { id: 2, text: 'Monitoring blood sugar regularly helps me stay on track.' },
        ],
    },
    //   for more posts 
];

const Community = () => {
    const [posts, setPosts] = useState(initialPosts);
    const [newComment, setNewComment] = useState("");


    const addComment = (postId, commentText) => {
        const updatedPosts = posts.map(post => {
            if (post.id === postId) {
                const updatedComments = [...post.comments, { id: post.comments.length + 1, text: commentText }];
                return { ...post, comments: updatedComments };
            }
            return post;
        });

        setPosts(updatedPosts);
        setNewComment("");
    };

    return (
        <div className="community-forum">
            {/* <h1>Community Forum</h1> */}
            {posts.map(post => (
                <div key={post.id} className="post">
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                    <div className="comments">
                        {post.comments.map(comment => (
                            <p key={comment.id}>{comment.text}</p>
                        ))}
                        <input
                            type="text"
                            value={newComment}
                            placeholder="Add a comment..."
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <button onClick={() => addComment(post.id, newComment)}>Post Comment</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Community;