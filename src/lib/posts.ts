import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'src/content/posts');

export interface PostData {
    slug: string;
    title: string;
    date: string;
    category: string;
    excerpt: string;
    image?: string;
    youtubeId?: string;
    youtubeIdBottom?: string;
    contentHtml: string;
}

export function getSortedPostsData() {
    // Create dir if not exists (handled by mkdir before, but good safety)
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        const matterResult = matter(fileContents);

        return {
            slug,
            ...(matterResult.data as { date: string; title: string; category: string; excerpt: string; image?: string }),
        };
    });

    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}

export function getAllPostSlugs() {
    if (!fs.existsSync(postsDirectory)) return [];
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map((fileName) => {
        return {
            params: {
                slug: fileName.replace(/\.md$/, ''),
            },
        };
    });
}

export async function getPostData(slug: string): Promise<PostData> {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const matterResult = matter(fileContents);

    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
    let contentHtml = processedContent.toString();

    // Manually force external links to open in new tab
    contentHtml = contentHtml.replace(/<a href="(https?:\/\/[^"]+)"/g, '<a target="_blank" rel="noopener noreferrer" href="$1"');

    return {
        slug,
        contentHtml,
        ...(matterResult.data as any),
    };
}
