import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ArticleGrid from '@/components/ArticleGrid';
import { FaInstagram, FaYoutube, FaTiktok, FaWhatsapp } from 'react-icons/fa';

import { getSortedPostsData } from '@/lib/posts';

export default async function Home() {
  const allPostsData = getSortedPostsData();

  const postsForGrid = allPostsData.map(post => ({
    id: post.slug,
    title: post.title,
    category: post.category,
    excerpt: post.excerpt,
    date: post.date,
    image: (post as any).image, // Image comes from frontmatter
  }));

  return (
    <main>
      <Header />
      <Hero />
      <ArticleGrid posts={postsForGrid} />

      {/* Footer Placeholder (Quick inline implementation) */}
      <footer style={{ marginTop: '4rem', padding: '4rem 1.5rem', background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem' }}>cuencalagoranco.cl</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Tu conexión experta y segura con el sur de Chile.</p>
          </div>
          <div>
            <h4 style={{ fontWeight: 600, marginBottom: '1rem' }}>Enlaces</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--text-secondary)' }}>
              <li><a href="#">Vida Rural</a></li>
              <li><a href="#">Turismo</a></li>
              <li><a href="#">Inversión</a></li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontWeight: 600, marginBottom: '1rem' }}>Contacto</h4>
            <a
              href="https://wa.me/56982472765"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: '#25D366',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '99px',
                textDecoration: 'none',
                fontWeight: 600,
                marginTop: '0.5rem',
                marginBottom: '0.5rem',
                fontSize: '0.9rem',
                transition: 'transform 0.2s ease',
              }}
            >
              <FaWhatsapp size={20} />
              Contáctame
            </a>
            <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
              <a href="https://www.instagram.com/invierteencampo/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', fontSize: '1.5rem' }}><FaInstagram /></a>
              <a href="https://www.tiktok.com/@invierteencampo" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', fontSize: '1.5rem' }}><FaTiktok /></a>
              <a href="https://www.youtube.com/@StefanoAgostinelli" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', fontSize: '1.5rem' }}><FaYoutube /></a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
