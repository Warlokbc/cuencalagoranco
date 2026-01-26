'use client';
import Link from 'next/link';
import Image from 'next/image';


export interface ArticleData {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  image?: string;
  categoryColor?: string;
}

export default function ArticleGrid({ posts }: { posts: ArticleData[] }) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Inversión': return 'blue';
      case 'Vida Rural': return 'green';
      case 'Turismo': return 'orange';
      default: return 'orange';
    }
  };

  return (
    <section className="container">
      <div className="section-header">
        <h2 className="section-title">Últimos Artículos</h2>
        <div className="filters">
          {/* TODO: Add interactivity to filters or use Links */}
          <Link href="/" className="filter-btn active">Todos</Link>
          <Link href="/vida-rural" className="filter-btn">Vida Rural</Link>
          <Link href="/turismo" className="filter-btn">Turismo</Link>
          <Link href="/inversion" className="filter-btn">Inversión</Link>
        </div>
      </div>

      <div className="grid">
        {posts.map((article) => (
          <article key={article.id} className="card">
            <div className="card-image-wrapper">
              <Image
                src={article.image || '/img/DSC05193.webp'}
                alt={article.title}
                fill
                style={{ objectFit: 'cover' }}
                className="card-image"
              />
              <span className={`category-badge ${article.categoryColor || getCategoryColor(article.category)}`}>
                {article.category}
              </span>
            </div>
            <div className="card-content">
              <div className="meta">
                <span className="date">{article.date}</span>
                <span className="dot">•</span>
                <span className="author">Stefano A.</span>
              </div>
              <h3 className="card-title">
                <Link href={`/posts/${article.id}`}>{article.title}</Link>
              </h3>
              <p className="card-excerpt">{article.excerpt}</p>
              <Link href={`/posts/${article.id}`} className="read-more">
                Leer artículo →
              </Link>
            </div>
          </article>
        ))}
      </div>

      <style jsx>{`
        .container {
           /* Inherited from global but useful to ensure */
        }
        .section-header {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          margin-bottom: 3rem;
          gap: 1.5rem;
        }

        @media (min-width: 768px) {
          .section-header {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }
        }

        .filters {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .filter-btn {
          padding: 0.5rem 1rem;
          border-radius: 99px;
          border: 1px solid var(--border);
          color: var(--text-secondary);
          font-weight: 500;
          font-size: 0.9rem;
          transition: all 0.2s;
        }

        .filter-btn.active,
        .filter-btn:hover {
          background: var(--text-primary);
          color: var(--background);
          border-color: var(--text-primary);
        }

        .grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }

        @media (min-width: 768px) {
          .grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .card {
          background: var(--surface);
          border-radius: 1rem;
          overflow: hidden;
          border: 1px solid var(--border);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
        }

        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        .card-image-wrapper {
          position: relative;
          height: 240px;
          width: 100%;
          overflow: hidden;
        }

        .card-image {
          transition: transform 0.5s ease;
        }

        .card:hover .card-image {
          transform: scale(1.05);
        }

        .category-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          padding: 0.25rem 0.75rem;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(4px);
          color: white;
          border-radius: 99px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
        }
        
        .category-badge.blue { border-left: 3px solid #3b82f6; }
        .category-badge.green { border-left: 3px solid #10b981; }
        .category-badge.orange { border-left: 3px solid #f97316; }

        .card-content {
          padding: 1.5rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .meta {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          color: var(--text-secondary);
          margin-bottom: 0.75rem;
        }

        .card-title {
          font-size: 1.25rem;
          font-weight: 700;
          line-height: 1.4;
          margin-bottom: 0.75rem;
          color: var(--text-primary);
        }

        .card-title a:hover {
          color: var(--primary);
        }

        .card-excerpt {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 1.5rem;
          flex: 1;
        }

        .read-more {
          font-weight: 600;
          color: var(--primary);
          font-size: 0.95rem;
          display: inline-flex;
          align-items: center;
        }
        
        .read-more:hover {
          color: var(--primary-dark);
        }
      `}</style>
    </section>
  );
}
