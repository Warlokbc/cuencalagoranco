import { getSortedPostsData } from '@/lib/posts';
import SearchResults from '@/components/SearchResults';

export const metadata = {
    title: 'Búsqueda | Cuenca Lago Ranco',
    description: 'Busca artículos sobre inversión, turismo y vida rural en la Cuenca del Lago Ranco.',
};

export default function SearchPage() {
    const allPostsData = getSortedPostsData();

    const posts = allPostsData.map(post => ({
        id: post.slug,
        title: post.title,
        category: post.category,
        excerpt: post.excerpt,
        date: post.date,
        image: post.image,
    }));

    return <SearchResults posts={posts} />;
}
