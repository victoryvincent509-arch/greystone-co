import { Link } from 'react-router-dom';
import './BlogCard.css';

export default function BlogCard({ post }) {
  return (
    <article className="blog-card" data-card>
      <Link to={`/blog/${post.slug}`} className="blog-card__image-link">
        <img src={post.coverImage} alt={post.title} className="blog-card__image" loading="lazy" />
        <span className="blog-card__category">{post.category}</span>
      </Link>
      <div className="blog-card__body">
        <div className="blog-card__meta">
          <span>{post.date}</span>
        </div>
        <h3 className="blog-card__title">
          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="blog-card__excerpt">{post.excerpt}</p>
        <Link to={`/blog/${post.slug}`} className="blog-card__link text-link">
          Read More &rarr;
        </Link>
      </div>
    </article>
  );
}
