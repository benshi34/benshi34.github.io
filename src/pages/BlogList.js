import { Link } from 'react-router-dom';
import Tabs from '../components/Tabs';
import posts from '../data/posts';

function BlogList() {
  return (
    <main className="content">
      <Tabs />
      <section className="blog-posts">
        <h1 className="page-title">Blog Posts</h1>
        <p className="page-subtitle">
          Occasional writing on research, music, and life.
        </p>
        <div className="post-list">
          {posts.map((post) => (
            <Link key={post.slug} to={`/blog/${post.slug}`} className="post-card">
              <div className="post-card-header">
                <h3 className="post-card-title">{post.title}</h3>
                <span className="post-card-date">{post.date}</span>
              </div>
              {post.description && (
                <p className="post-card-description">{post.description}</p>
              )}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

export default BlogList;
