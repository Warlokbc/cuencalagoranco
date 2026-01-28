'use client';
import { useSearchParams } from 'next/navigation';
import ArticleGrid, { ArticleData } from './ArticleGrid';
import { Suspense } from 'react';
import Header from './Header';

function SearchResultsContent({ posts }: { posts: ArticleData[] }) {
    const searchParams = useSearchParams();
    const query = searchParams.get('q')?.toLowerCase() || '';

    const filteredPosts = posts.filter((post) => {
        return (
            post.title.toLowerCase().includes(query) ||
            post.excerpt.toLowerCase().includes(query) ||
            post.category.toLowerCase().includes(query)
        );
    });

    return (
        <main>
            <Header />
            <div className="container" style={{ paddingTop: 'calc(var(--header-height) + 2rem)', paddingBottom: '1rem' }}>
                <h1 className="search-title">Resultados de búsqueda: "{query}"</h1>
                {filteredPosts.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                        <h3 style={{ marginBottom: '1rem' }}>No se encontraron artículos</h3>
                        <p className="text-secondary">Intenta con otra palabra clave o revisa nuestras categorías.</p>
                    </div>
                ) : (
                    <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>Encontrados {filteredPosts.length} artículos que coinciden con tu búsqueda.</p>
                )}
            </div>

            {filteredPosts.length > 0 && <ArticleGrid posts={filteredPosts} title="" showFilters={false} />}

            <style jsx>{`
          .search-title {
              font-size: 2rem;
              font-weight: 700;
              margin-bottom: 0.5rem;
          }
      `}</style>
        </main>
    );
}

export default function SearchResults(props: { posts: ArticleData[] }) {
    return (
        <Suspense fallback={<div style={{ paddingTop: '100px', textAlign: 'center' }}>Cargando...</div>}>
            <SearchResultsContent {...props} />
        </Suspense>
    )
}
