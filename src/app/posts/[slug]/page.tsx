
import { getPostData, getAllPostSlugs } from '@/lib/posts';
import PostView from '@/components/PostView';
import { Metadata } from 'next';

export function generateStaticParams() {
  const paths = getAllPostSlugs();
  return paths.map((p) => p.params);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const postData = await getPostData(slug);

  return {
    title: postData.title,
    description: postData.excerpt,
    openGraph: {
      title: postData.title,
      description: postData.excerpt,
      type: 'article',
      publishedTime: postData.date,
      authors: ['Stefano Agostinelli'],
      url: `https://cuencalagoranco.cl/posts/${slug}`,
      images: postData.image ? [`https://cuencalagoranco.cl${postData.image}`] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: postData.title,
      description: postData.excerpt,
      images: postData.image ? [`https://cuencalagoranco.cl${postData.image}`] : [],
    },
  };
}

export default async function Post(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const postData = await getPostData(params.slug);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: postData.title,
    description: postData.excerpt,
    image: postData.image ? [`https://cuencalagoranco.cl${postData.image}`] : [],
    datePublished: postData.date,
    author: {
      '@type': 'Person',
      name: 'Stefano Agostinelli',
      url: 'https://cuencalagoranco.cl'
    },
    url: `https://cuencalagoranco.cl/posts/${params.slug}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://cuencalagoranco.cl/posts/${params.slug}`
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PostView postData={postData} />
    </>
  );
}
