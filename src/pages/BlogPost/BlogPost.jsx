import { useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import { animateSectionReveal, ScrollTrigger } from '../../utils/animations';
import { getBlogPostBySlug, getRelatedPosts } from '../../data/blogPosts';
import { getAgentBySlug } from '../../data/agents';
import BlogCard from '../../components/BlogCard/BlogCard';
import './BlogPost.css';

export default function BlogPost() {
  const { slug } = useParams();
  const post = getBlogPostBySlug(slug);
  const pageRef = useRef(null);

  useGSAP(() => {
    animateSectionReveal(pageRef.current);

    // Refresh ScrollTrigger after animations are set up to ensure
    // trigger points are calculated based on the complete DOM
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, { scope: pageRef });

  if (!post) {
    return (
      <div className="container section">
        <h1>Article Not Found</h1>
        <Link to="/blog" className="text-link">&larr; Back to Blog</Link>
      </div>
    );
  }

  const author = getAgentBySlug(post.authorSlug);
  const related = getRelatedPosts(post.slug, 3);

  return (
    <div ref={pageRef} className="blog-post">
      <section className="blog-post__hero">
        <img src={post.coverImage} alt={post.title} className="blog-post__hero-image" />
        <div className="blog-post__hero-overlay" />
        <div className="container blog-post__hero-content">
          <span className="blog-post__category" data-animate>{post.category}</span>
          <h1 data-animate>{post.title}</h1>
          <div className="blog-post__meta" data-animate>
            <span>{post.author}</span>
            <span>&middot;</span>
            <span>{post.date}</span>
            <span>&middot;</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </section>

      <article className="blog-post__content container">
        {post.content.map((paragraph, i) => (
          <p key={i} data-animate>{paragraph}</p>
        ))}
      </article>

      {author && (
        <section className="blog-post__author section--surface">
          <div className="container blog-post__author-inner" data-animate>
            <img src={author.photo} alt={author.name} loading="lazy" />
            <div>
              <p className="blog-post__author-label">Written by</p>
              <h3>{author.name}</h3>
              <p>{author.title}</p>
              <Link to={`/agents/${author.slug}`} className="text-link">View Profile &rarr;</Link>
            </div>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="section">
          <div className="container">
            <h2 className="section-title" data-animate>Related Articles</h2>
            <div className="grid-3">
              {related.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
