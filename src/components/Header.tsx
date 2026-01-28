'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  theme?: 'light' | 'dark';
}

export default function Header({ theme = 'light' }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsMenuOpen(false); // Close mobile menu if open
    }
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''} ${theme === 'dark' ? 'header-dark' : ''}`}>
      <div className="container header-container">
        <Link href="/" className="logo">
          <span className="logo-icon">⌘</span>
          cuencalagoranco.cl
        </Link>

        {/* Desktop Nav */}
        <nav className="nav-desktop">
          <Link href="/" className="nav-link">Inicio</Link>
          <Link href="/vida-rural" className="nav-link">Vida Rural</Link>
          <Link href="/turismo" className="nav-link">Turismo</Link>
          <Link href="/inversion" className="nav-link">Inversión</Link>
          <Link href="/tips" className="nav-link">Tips de Local</Link>
        </nav>

        <div className="header-actions">
          <form className="search-wrapper" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Buscar..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-button" aria-label="Buscar">
              <svg className="search-icon" style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </button>
          </form>
          <Link href="https://invierteencampo.netlify.app" target="_blank" className="btn btn-primary">
            Ver Parcelas
          </Link>
          <button className="mobile-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <nav className="nav-mobile fade-in">
          <Link href="/" onClick={() => setIsMenuOpen(false)}>Inicio</Link>
          <Link href="/vida-rural" onClick={() => setIsMenuOpen(false)}>Vida Rural</Link>
          <Link href="/turismo" onClick={() => setIsMenuOpen(false)}>Turismo</Link>
          <Link href="/inversion" onClick={() => setIsMenuOpen(false)}>Inversión</Link>
          <Link href="/tips" onClick={() => setIsMenuOpen(false)}>Tips de Local</Link>
        </nav>
      )}

      <style jsx>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: var(--header-height);
          z-index: 1000;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          color: white; /* Default to white on Hero */
        }

        .header.header-dark {
            color: var(--text-primary);
        }

        .header.scrolled {
          background: var(--glass-bg);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--glass-border);
          color: var(--text-primary);
          box-shadow: var(--glass-shadow);
        }

        .header-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }

        .logo {
          font-size: 1.5rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .logo-icon {
          font-size: 1.8rem;
        }

        .nav-desktop {
          display: none;
          gap: 2rem;
        }

        @media (min-width: 768px) {
          .nav-desktop {
            display: flex;
          }
        }

        .nav-link {
          font-weight: 500;
          font-size: 0.95rem;
          opacity: 0.8;
          transition: opacity 0.2s;
        }

        .nav-link:hover {
          opacity: 1;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .search-wrapper {
          position: relative;
          display: none;
        }

        @media (min-width: 1024px) {
          .search-wrapper {
            display: block;
          }
        }

        .search-input {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 99px;
          padding: 0.5rem 1rem 0.5rem 2.5rem;
          color: inherit;
          outline: none;
          width: 200px;
          transition: width 0.3s;
        }
        
        /* Dark theme input adjustment */
        .header.header-dark .search-input {
            background: rgba(0, 0, 0, 0.05); /* Darker bg for contrast */
            border-color: rgba(0, 0, 0, 0.1);
            color: var(--text-primary);
        }

        .header.scrolled .search-input {
          background: var(--surface);
          border-color: var(--border);
          color: var(--text-primary);
        }

        .search-input:focus {
          width: 250px;
          background: rgba(255,255,255,0.2);
        }

        .header.header-dark .search-input:focus {
            background: rgba(0, 0, 0, 0.1);
        }

        .header.scrolled .search-input:focus {
          background: var(--surface-hover);
        }

        .search-button {
          position: absolute;
          left: 0.5rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          padding: 0.3rem; 
          cursor: pointer;
          color: inherit;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .search-icon {
          width: 1rem;
          height: 1rem;
          opacity: 0.7;
        }

        .mobile-toggle {
          display: block;
          font-size: 1.5rem;
          color: inherit;
        }

        @media (min-width: 768px) {
          .mobile-toggle {
            display: none;
          }
        }

        .nav-mobile {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: var(--background);
          border-bottom: 1px solid var(--border);
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          color: var(--text-primary);
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
        }
      `}</style>
    </header>
  );
}

