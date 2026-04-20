import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

export interface BlogPost {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    category: 'cybersecurity' | 'neurotechnology';
    content: string;
    readingTime: string;
    author?: string;
    tags?: string[];
    canonicalUrl?: string;
    metaDescription?: string;
    faqSchema?: object;
    // FIX 1 — draft gate
    draft?: boolean;
    // FIX 2 — faq key fix
    faq?: Array<{ question: string; answer: string }>;
    // FIX 3 — og:image
    image?: string;
    // FIX 7 — dateModified
    updatedAt?: string;
    // FIX 14 — internal links
    internalLink1?: { anchor: string; href: string };
    internalLink2?: { anchor: string; href: string };
    whyItMatters?: string;
    keyTakeaways?: string[];
}

// Helper to get the absolute path to the posts directory with workspace root detection
function getPostsDirectory() {
    const cwd = process.cwd();
    const possiblePaths = [
        path.resolve(cwd, 'content/posts'),
        path.resolve(cwd, 'CN Themes/Cybersecurity Theme 1/Blogs/content/posts'),
        // Add more common positions if needed
    ];

    for (const p of possiblePaths) {
        if (fs.existsSync(p)) {
            console.log('[Blog Lib] Found valid directory at:', p);
            return p;
        }
    }

    console.error('[Blog Lib] FAILED to find posts directory in any expected location:', possiblePaths);
    return possiblePaths[0]; // Fallback to first
}

export function getAllPosts(): BlogPost[] {
    const postsDir = getPostsDirectory();

    try {
        if (!fs.existsSync(postsDir)) {
            return [];
        }

        const fileNames = fs.readdirSync(postsDir);
        const allPosts = fileNames
            .filter((fileName) => fileName.endsWith('.md'))
            .map((fileName) => {
                try {
                    const slug = fileName.replace(/\.md$/, '');
                    const fullPath = path.join(postsDir, fileName);
                    const fileContents = fs.readFileSync(fullPath, 'utf8');
                    const { data, content } = matter(fileContents);

                    const stats = readingTime(content);

                        const wordCount = content.trim().split(/\s+/).length;
                        const readTimeMinutes = Math.ceil(wordCount / 200);
                        const customReadingTime = `${readTimeMinutes} min read`;

                        return {
                            slug,
                            title: data.title || slug,
                            date: data.date || new Date().toISOString().split('T')[0],
                            excerpt: data.metaDescription || data.excerpt || content.substring(0, 150) + '...',
                            category: data.category || 'cybersecurity',
                            content,
                            readingTime: data.readingTime || customReadingTime,
                        author: data.author || 'CNX',
                        tags: data.tags,
                        canonicalUrl: data.canonicalUrl,
                        metaDescription: data.metaDescription || data.excerpt,
                        faqSchema: data.faqSchema,
                        // FIX 1 — draft gate
                        draft: data.draft ?? false,
                        // FIX 2 — faq key fix: map faqSchema.mainEntity → faq[]
                        faq: data.faqSchema?.mainEntity?.map((q: any) => ({
                            question: q.name,
                            answer: q.acceptedAnswer?.text,
                        })) ?? data.faq ?? [],
                        // FIX 3 — og:image
                        image: data.image,
                        // FIX 7 — dateModified
                        updatedAt: data.updatedAt,
                        // FIX 14 — internal links
                        internalLink1: data.internalLink1,
                        internalLink2: data.internalLink2,
                        whyItMatters: data.whyItMatters,
                        keyTakeaways: data.keyTakeaways,
                    } as BlogPost;
                } catch (err) {
                    console.error(`[Blog Lib] Error parsing file ${fileName}:`, err);
                    return null;
                }
            })
            .filter((post): post is BlogPost => post !== null)
            // FIX 1 — filter out drafts
            .filter((post) => !post.draft);

        // Sort posts by date (newest first)
        return allPosts.sort((a, b) => (a.date > b.date ? -1 : 1));
    } catch (error) {
        console.error('[Blog Lib] Fatal error in getAllPosts:', error);
        return [];
    }
}

export function getPostBySlug(slug: string): BlogPost | null {
    const postsDir = getPostsDirectory();
    try {
        const fullPath = path.join(postsDir, `${slug}.md`);

        if (!fs.existsSync(fullPath)) {
            return null;
        }

        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        const stats = readingTime(content);

        const wordCount = content.trim().split(/\s+/).length;
        const readTimeMinutes = Math.ceil(wordCount / 200);
        const customReadingTime = `${readTimeMinutes} min read`;

        return {
            slug,
            title: data.title || slug,
            date: data.date || new Date().toISOString().split('T')[0],
            excerpt: data.metaDescription || data.excerpt || content.substring(0, 150) + '...',
            category: data.category || 'cybersecurity',
            content,
            readingTime: data.readingTime || customReadingTime,
            author: data.author || 'CNX',
            tags: data.tags,
            canonicalUrl: data.canonicalUrl,
            metaDescription: data.metaDescription || data.excerpt,
            faqSchema: data.faqSchema,
            // FIX 1
            draft: data.draft ?? false,
            // FIX 2 — faq key fix
            faq: data.faqSchema?.mainEntity?.map((q: any) => ({
                question: q.name,
                answer: q.acceptedAnswer?.text,
            })) ?? data.faq ?? [],
            // FIX 3 — og:image
            image: data.image,
            // FIX 7 — dateModified
            updatedAt: data.updatedAt,
            // FIX 14 — internal links
            internalLink1: data.internalLink1,
            internalLink2: data.internalLink2,
            whyItMatters: data.whyItMatters,
            keyTakeaways: data.keyTakeaways,
        };
    } catch (error) {
        console.error(`[Blog Lib] Error reading post ${slug}:`, error);
        return null;
    }
}

export function getPostsByCategory(category: 'cybersecurity' | 'neurotechnology'): BlogPost[] {
    const allPosts = getAllPosts();
    return allPosts.filter((post) => post.category === category);
}

export function getRelatedPosts(currentSlug: string, category: string, limit: number = 3): BlogPost[] {
    const allPosts = getAllPosts();
    return allPosts
        .filter((post) => post.slug !== currentSlug && post.category === category)
        .slice(0, limit);
}
