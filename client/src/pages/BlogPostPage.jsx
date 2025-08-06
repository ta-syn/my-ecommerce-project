import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/style.scss'; // স্টাইল পরে যোগ হবে

// স্যাম্পল ডেটা
const getPostById = (id) => ({
    id: id,
    title: '10 Must-Have Gadgets for 2025',
    author: 'Admin',
    date: 'January 10, 2025',
    imageUrl: `https://via.placeholder.com/800x400?text=Blog+Post+${id}`,
    content: `
      <p>This is the full content of the blog post. It's where the detailed information goes. For example, we can talk about the first gadget.</p>
      <h3>1. The Smart Coffee Mug</h3>
      <p>Imagine a coffee mug that keeps your drink at the perfect temperature for hours. That's exactly what this gadget does. It's a game-changer for coffee and tea lovers.</p>
      <h3>2. Portable Solar Charger</h3>
      <p>Never run out of battery again. This lightweight and efficient solar charger can power up your devices on the go, using only the power of the sun.</p>
      <p>This section can be populated with rich text, including headings, lists, and images, directly from a CMS or your database.</p>
    `
});

const BlogPostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    // API থেকে postId ব্যবহার করে পোস্টের তথ্য আনা হবে
    const fetchedPost = getPostById(postId);
    setPost(fetchedPost);
  }, [postId]);

  if (!post) {
    return <div>Loading post...</div>;
  }

  return (
    <div className="blog-post-page">
      <div className="post-header">
        <h1 className="post-title">{post.title}</h1>
        <p className="post-meta">Posted by {post.author} on {post.date}</p>
      </div>
      <img src={post.imageUrl} alt={post.title} className="post-featured-image" />
      <div className="post-body" dangerouslySetInnerHTML={{ __html: post.content }}>
        {/* dangerouslySetInnerHTML ব্যবহার করা হয়েছে কারণ কন্টেন্ট HTML ফরম্যাটে আছে */}
      </div>
      <div className="post-footer">
        <Link to="/blog">← Back to Blog</Link>
      </div>
    </div>
  );
};

export default BlogPostPage;