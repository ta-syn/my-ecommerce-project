import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/_BlogPage.scss'; // স্টাইল পরে যোগ হবে

// স্যাম্পল ডেটা (পরে API থেকে আসবে)
const blogPosts = [
  {
    id: 1,
    title: '10 Must-Have Gadgets for 2025',
    excerpt: 'Technology is evolving faster than ever. Here are the top 10 gadgets that will make your life easier and more fun this year.',
    author: 'Admin',
    date: 'January 10, 2025',
    imageUrl: 'https://via.placeholder.com/400x250?text=Gadgets'
  },
  {
    id: 2,
    title: 'The Ultimate Guide to Choosing the Perfect T-Shirt',
    excerpt: 'A t-shirt is a wardrobe staple, but finding the right one can be tricky. Our guide covers everything from fit to fabric.',
    author: 'Admin',
    date: 'January 05, 2025',
    imageUrl: 'https://via.placeholder.com/400x250?text=Fashion'
  },
    {
    id: 3,
    title: 'How to Build a Sustainable Wardrobe',
    excerpt: 'Learn how to make eco-friendly fashion choices without compromising on style. It\'s easier than you think!',
    author: 'Admin',
    date: 'December 28, 2024',
    imageUrl: 'https://via.placeholder.com/400x250?text=Sustainability'
  },
];

const BlogPage = () => {
  return (
    <div className="blog-page">
      <h1 className="page-title">From Our Blog</h1>
      <div className="blog-posts-grid">
        {blogPosts.map(post => (
          <div key={post.id} className="blog-post-card">
            <img src={post.imageUrl} alt={post.title} className="post-image" />
            <div className="post-content">
              <p className="post-meta">{post.date} by {post.author}</p>
              <h2 className="post-title">{post.title}</h2>
              <p className="post-excerpt">{post.excerpt}</p>
              <Link to={`/blog/${post.id}`} className="read-more-link">Read More →</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;