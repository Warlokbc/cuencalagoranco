'use client';
import Link from 'next/link';
import { useEffect } from 'react';
import { FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa';
import Image from 'next/image';
import Header from '@/components/Header';
import { PostData } from '@/lib/posts';

export default function PostView({ postData }: { postData: PostData }) {
  useEffect(() => {
    const links = document.querySelectorAll('.post-content a');
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (href && (href.startsWith('http://') || href.startsWith('https://'))) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      }
    });
  }, [postData]);

  return (
    <main>
      <Header />

      <article className="post-container">
        {/* Post Header */}
        <header className="post-header">
          <div className="container">
            <span className="category-tag">{postData.category}</span>
            <h1 className="post-title fade-in">{postData.title}</h1>
            <div className="post-meta">
              <span className="date">{postData.date}</span>
              <span className="author">Por Stefano Agostinelli</span>
            </div>
          </div>
        </header>

        {/* Featured Image or Video */}
        <div className="container media-container fade-in" style={{ animationDelay: '0.2s' }}>
          {postData.youtubeId ? (
            <div className="video-wrapper">
              <iframe
                src={`https://www.youtube.com/embed/${postData.youtubeId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : postData.image ? (
            <div className="image-wrapper">
              <Image
                src={postData.image}
                alt={postData.title}
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
          ) : null}
        </div>

        <div className="container content-layout">
          {/* Main Content */}
          <div
            className="post-content fade-in"
            style={{ animationDelay: '0.4s' }}
            dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
          />

          {/* Sidebar */}
          <aside className="sidebar fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="cta-box">
              <h3>¿Te interesa invertir aquí?</h3>
              <p>Agenda una asesoría gratuita y descubre las mejores oportunidades en la Cuenca del Lago Ranco.</p>
              <Link href="https://invierteencampo.netlify.app" target="_blank" className="btn btn-primary full-width">
                Ver Proyectos Disponibles
              </Link>
            </div>

            <div className="social-box">
              <h4>Sígueme en redes</h4>
              <div className="social-links" style={{ display: 'flex', gap: '1rem' }}>
                <Link href="https://instagram.com/invierteencampo/" target="_blank" className="social-link" style={{ fontSize: '1.5rem' }}><FaInstagram /></Link>
                <Link href="https://tiktok.com/@invierteencampo" target="_blank" className="social-link" style={{ fontSize: '1.5rem' }}><FaTiktok /></Link>
                <Link href="https://youtube.com/@StefanoAgostinelli" target="_blank" className="social-link" style={{ fontSize: '1.5rem' }}><FaYoutube /></Link>
              </div>
            </div>
          </aside>
        </div>
        {/* Bottom Video */}
        {postData.youtubeIdBottom && (
          <div className="container" style={{ marginTop: '3rem', marginBottom: '3rem' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', textAlign: 'center' }}>Mira el video resumen</h3>
            <div className="video-wrapper">
              <iframe
                src={`https://www.youtube.com/embed/${postData.youtubeIdBottom}`}
                title="Video Resumen"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}

      </article>

      <style jsx global>{`
        .post-container {
          padding-top: calc(var(--header-height) + 2rem);
          padding-bottom: 4rem;
        }

        .post-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .category-tag {
          display: inline-block;
          color: var(--primary);
          font-weight: 600;
          text-transform: uppercase;
          font-size: 0.9rem;
          margin-bottom: 1rem;
          letter-spacing: 1px;
        }

        .post-title {
          font-size: 2.5rem;
          line-height: 1.2;
          font-weight: 700;
          margin-bottom: 1rem;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }

        @media (min-width: 768px) {
          .post-title {
            font-size: 3.5rem;
          }
        }

        .post-meta {
          color: var(--text-secondary);
          font-size: 1rem;
        }

        .media-container {
          margin-bottom: 4rem;
        }

        .video-wrapper {
          position: relative;
          padding-bottom: 56.25%; /* 16:9 */
          height: 0;
          overflow: hidden;
          border-radius: 1rem;
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        }

        .video-wrapper iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        
        .image-wrapper {
           position: relative;
           height: 400px;
           width: 100%;
           border-radius: 1rem;
           overflow: hidden;
        }

        .content-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
        }

        @media (min-width: 1024px) {
          .content-layout {
            grid-template-columns: 2fr 1fr;
          }
        }

        .post-content {
          font-size: 1.1rem;
          line-height: 1.8;
          color: var(--text-primary);
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }

        .post-content h2 {
          font-size: 1.8rem;
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: var(--text-primary);
        }

        .post-content h3 {
           font-size: 1.4rem;
           margin-top: 1.5rem;
           margin-bottom: 0.75rem;
           color: var(--text-primary);
        }
        
        .post-content p {
          margin-bottom: 1.5rem;
        }
        
        .post-content ul, .post-content ol {
          padding-left: 2rem;
          margin-bottom: 1.5rem;
        }

        .post-content a {
          color: var(--secondary);
          text-decoration: underline;
          text-decoration-thickness: 2px;
          text-underline-offset: 2px;
          font-weight: 700;
          transition: all 0.2s ease;
        }

        .post-content a:hover {
          color: var(--primary);
          text-decoration-color: var(--primary);
        }
        
        .post-content li {
          margin-bottom: 0.5rem;
        }
        
        .post-content blockquote {
          border-left: 4px solid var(--primary);
          padding-left: 1.5rem;
          font-style: italic;
          color: var(--text-secondary);
          margin: 2rem 0;
          background: var(--surface);
          padding: 1.5rem;
          border-radius: 0 1rem 1rem 0;
        }

        .sidebar {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .cta-box {
          background: var(--surface);
          border: 1px solid var(--border);
          padding: 2rem;
          border-radius: 1rem;
          text-align: center;
          position: sticky;
          top: calc(var(--header-height) + 2rem);
        }

        .cta-box h3 {
          margin-bottom: 1rem;
        }

        .cta-box p {
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
          font-size: 0.95rem;
        }

        .full-width {
          width: 100%;
        }
        
        .social-box h4 {
           margin-bottom: 1rem;
        }
        
        .social-links {
           display: flex;
           flex-direction: column;
           gap: 0.5rem;
        }
        
        .social-link {
           color: var(--primary);
           font-weight: 500;
        }
        
        .social-link:hover {
           text-decoration: underline;
        }

        .post-content iframe {
          width: 100%;
          min-height: 300px;
          display: block;
          margin: 1.5rem 0;
          border-radius: 1rem;
          background-color: var(--surface); /* Placeholder color while loading */
        }
      `}</style>
    </main>
  );
}
