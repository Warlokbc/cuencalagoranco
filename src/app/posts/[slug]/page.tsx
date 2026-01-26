
import { getPostData, getAllPostSlugs } from '@/lib/posts';
import PostView from '@/components/PostView';

export function generateStaticParams() {
  const paths = getAllPostSlugs();
  return paths.map((p) => p.params);
}

export default async function Post(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const postData = await getPostData(params.slug);
  return <PostView postData={postData} />;
}
