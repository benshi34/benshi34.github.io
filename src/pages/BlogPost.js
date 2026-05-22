import { Link, useParams } from 'react-router-dom';
import { getPostBySlug } from '../data/posts';

function BlogPost() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <main className="content">
        <Link to="/blog" className="back-link">← Back to all posts</Link>
        <h1 className="post-title">Post not found</h1>
        <p>This post doesn't exist (yet).</p>
      </main>
    );
  }

  const PostBody = post.Component;

  return (
    <main className="content">
      <Link to="/blog" className="back-link">← Back to all posts</Link>
      <article className="blog-post">
        <header className="post-header">
          <h1 className="post-title">{post.title}</h1>
          <p className="post-date">{post.date}</p>
        </header>
        <div className="post-body">
          {PostBody ? <PostBody /> : <p className="post-empty">Coming soon.</p>}
        </div>
      </article>
    </main>
  );
}

export default BlogPost;
