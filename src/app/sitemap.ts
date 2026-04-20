import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const posts = getAllPosts(); // synchronous in this codebase

    const postEntries = posts.map((post) => ({
        url: `https://blogs.cyberneurix.com/blog/${post.slug}/`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }));

    // FIX 6 — add category pages to sitemap
    const categories = ['cybersecurity', 'neurotechnology'];
    const categoryEntries: MetadataRoute.Sitemap = categories.map((cat) => ({
        url: `https://blogs.cyberneurix.com/category/${cat}/`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    return [
        {
            url: 'https://blogs.cyberneurix.com/',
            // FIX 6 — use latest post date instead of build timestamp
            lastModified: new Date(posts[0]?.date ?? new Date()),
            changeFrequency: 'daily',
            priority: 1
        },
        ...categoryEntries,
        ...postEntries,
    ];
}
