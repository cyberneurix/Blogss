import { getPostBySlug, getAllPosts, getRelatedPosts } from '@/lib/blog';
import { notFound } from 'next/navigation';
import BlogPost from '@/components/BlogPost';
import type { Metadata } from 'next';

export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        return { title: 'Post Not Found — CyberNeurix' };
    }

    return {
        title: `${post.title} — CyberNeurix`,
        description: post.excerpt || post.metaDescription,
        alternates: {
            canonical: `https://blogs.cyberneurix.com/blog/${slug}/`,
        },
        openGraph: {
            title: `${post.title} — CyberNeurix`,
            description: post.excerpt || post.metaDescription,
            url: `https://blogs.cyberneurix.com/blog/${slug}/`,
            siteName: 'CyberNeurix',
            type: 'article',
            publishedTime: post.date,
            authors: [post.author === 'TAOCS' ? 'Kaushik Sundararajan' : (post.author || 'CyberNeurix')],
            // FIX 3 — og:image
            images: post.image
                ? [{ url: `https://blogs.cyberneurix.com${post.image}`, width: 1200, height: 630 }]
                : [{ url: 'https://blogs.cyberneurix.com/og-default.jpg', width: 1200, height: 630 }],
        },
        // FIX 3 — twitter card image
        twitter: {
            card: 'summary_large_image',
            title: `${post.title} — CyberNeurix`,
            description: post.excerpt || post.metaDescription,
            images: post.image
                ? [`https://blogs.cyberneurix.com${post.image}`]
                : ['https://blogs.cyberneurix.com/og-default.jpg'],
        },
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const relatedPosts = getRelatedPosts(post.slug, post.category, 3);
    const authorName = post.author === 'TAOCS' ? 'Kaushik Sundararajan' : (post.author || 'CyberNeurix');

    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "headline": post.title,
        "description": post.excerpt || post.metaDescription,
        "url": `https://blogs.cyberneurix.com/blog/${post.slug}/`,
        "datePublished": new Date(post.date).toISOString(),
        // FIX 7 — dateModified
        "dateModified": post.updatedAt
            ? new Date(post.updatedAt).toISOString()
            : new Date(post.date).toISOString(),
        "author": {
            "@type": "Organization",
            "@id": "https://cyberneurix.com/#organization",
            "name": "CyberNeurix",
            "url": "https://cyberneurix.com"
        },
        "publisher": {
            "@type": "Organization",
            "name": "CyberNeurix",
            "url": "https://cyberneurix.com",
            "logo": {
                "@type": "ImageObject",
                "url": "https://cyberneurix.com/assets/cn.webp",
                "width": 600,
                "height": 60
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://blogs.cyberneurix.com/blog/${post.slug}/`
        },
        "isPartOf": {
            "@type": "Blog",
            "@id": "https://blogs.cyberneurix.com/#blog",
            "name": "CyberNeurix Blog"
        },
        // FIX 9 — image in TechArticle schema
        ...(post.image && {
            "image": {
                "@type": "ImageObject",
                "url": `https://blogs.cyberneurix.com${post.image}`,
                "width": 1200,
                "height": 630
            }
        }),
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "CyberNeurix", "item": "https://cyberneurix.com/" },
            { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://blogs.cyberneurix.com/" },
            { "@type": "ListItem", "position": 3, "name": post.title, "item": `https://blogs.cyberneurix.com/blog/${post.slug}/` }
        ]
    };

    // FIX 2 — use mapped post.faq (not the raw faqSchema object)
    const faqData = post.faq && post.faq.length > 0 ? post.faq : null;

    const faqSchema = faqData ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqData.map((item) => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
            }
        }))
    } : null;

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            {faqSchema && (
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            )}
            <BlogPost post={post} relatedPosts={relatedPosts} />
        </>
    );
}
