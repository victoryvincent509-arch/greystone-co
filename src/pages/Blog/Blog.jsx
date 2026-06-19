import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { animateSectionReveal, animateStaggerCards } from '../../utils/animations';
import { blogPosts } from '../../data/blogPosts';
import BlogCard from '../../components/BlogCard/BlogCard';
import './Blog.css';

export default function Blog() {
  const pageRef = useRef(null);

  useGSAP(() => {
    animateSectionReveal(pageRef.current);
    animateStaggerCards(pageRef.current?.querySelector('.blog-grid'));
  }, { scope: pageRef });

  return (
    <div ref={pageRef} className="blog-page">
      <div className="page-header">
        <div className="container">
          <h1 className="page-header__title" data-animate>Market Insights</h1>
          <p className="page-header__subtitle" data-animate>Expert analysis, neighbourhood guides, and property market updates from our team.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="blog-grid grid-3">
            {blogPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
