import { getSortedPostsData } from '@/lib/posts';
import ArticleGrid from '@/components/ArticleGrid';
import Header from '@/components/Header';

export function generateStaticParams() {
    return [
        { category: 'vida-rural' },
        { category: 'turismo' },
        { category: 'inversion' },
        { category: 'tips' },
    ];
}

export default async function CategoryPage(props: { params: Promise<{ category: string }> }) {
    const params = await props.params;
    const categorySlug = params.category;

    const categoryMap: Record<string, string> = {
        'vida-rural': 'Vida Rural',
        'turismo': 'Turismo',
        'inversion': 'Inversión',
        'tips': 'Tips de Local',
    };

    const categoryName = categoryMap[categorySlug];
    // Simple filter
    const allPostsData = getSortedPostsData();
    const filteredPosts = allPostsData.filter((post) => post.category === categoryName);

    const postsForGrid = filteredPosts.map(post => ({
        id: post.slug,
        title: post.title,
        category: post.category,
        excerpt: post.excerpt,
        date: post.date,
        image: (post as any).image,
    }));

    return (
        <main>
            <Header theme="dark" />
            <div style={{ paddingTop: '120px', paddingBottom: '4rem' }}>
                <div className="container">
                    <h1 className="section-title">{categoryName}</h1>
                    {postsForGrid.length > 0 ? (
                        <ArticleGrid posts={postsForGrid} />
                    ) : (
                        <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>No hay artículos en esta categoría aún.</p>
                    )}
                </div>
            </div>
        </main>
    );
}
