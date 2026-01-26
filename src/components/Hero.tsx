'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const HERO_IMAGES = [
  '/img/DSC05193.webp',
  '/img/DSC02274.webp',
  '/img/DSC08669-HDR.webp',
  '/img/DSC09543-Pano.webp'
];

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero">
      {HERO_IMAGES.map((src, index) => (
        <div
          key={src}
          className={`hero-bg ${index === currentImageIndex ? 'active' : ''}`}
        >
          <Image
            src={src}
            alt="Paisaje Cuenca Lago Ranco"
            fill
            style={{ objectFit: 'cover' }}
            priority={index === 0}
            quality={90}
          />
          <div className="overlay" />
        </div>
      ))}

      <div className="container hero-content">


        <h1 className="title fade-in" style={{ animationDelay: '0.4s' }}>
          Descubre el futuro <br />
          <span className="highlight">en el sur</span>
        </h1>
        <p className="subtitle fade-in" style={{ animationDelay: '0.6s' }}>
          Tu guía esencial para vivir e invertir en la Cuenca del Lago Ranco.
          Naturaleza, plusvalía y calidad de vida.
        </p>


      </div>

      <div className="scroll-indicator fade-in" style={{ animationDelay: '1s' }}>
        <div className="mouse">
          <div className="wheel" />
        </div>
      </div>

      <style jsx>{`
        .hero {
          position: relative;
          height: 100vh;
          min-height: 700px;
          display: flex;
          align-items: center;
          color: white;
          overflow: hidden;
          margin-top: -80px; /* Counteract header height */
          padding-top: 80px;
        }

        .hero-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          opacity: 0;
          transition: opacity 1.5s ease-in-out;
          z-index: 1;
        }

        .hero-bg.active {
          opacity: 1;
        }

        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            to top,
            rgba(0,0,0,0.8) 0%,
            rgba(0,0,0,0.3) 50%,
            rgba(0,0,0,0.4) 100%
          );
        }

        .hero-content {
          position: relative;
          z-index: 10;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }



        .title {
          font-size: 3.5rem;
          line-height: 1.1;
          font-weight: 700;
          margin-bottom: 1.5rem;
        }

        @media (min-width: 768px) {
          .title {
            font-size: 5rem;
          }
        }

        .highlight {
          color: var(--primary);
          background: -webkit-linear-gradient(45deg, #10b981, #3b82f6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .subtitle {
          font-size: 1.1rem;
          line-height: 1.6;
          opacity: 0.9;
          margin-left: auto;
          margin-right: auto;
          max-width: 600px;
        }

        @media (min-width: 768px) {
          .subtitle {
            font-size: 1.25rem;
          }
        }



        .scroll-indicator {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
        }

        .mouse {
          width: 26px;
          height: 40px;
          border: 2px solid white;
          border-radius: 20px;
          position: relative;
        }

        .wheel {
          width: 4px;
          height: 8px;
          background: white;
          position: absolute;
          top: 6px;
          left: 50%;
          transform: translateX(-50%);
          border-radius: 2px;
          animation: scroll 1.5s infinite;
        }

        @keyframes scroll {
          0% { transform: translate(-50%, 0); opacity: 1; }
          100% { transform: translate(-50%, 15px); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
