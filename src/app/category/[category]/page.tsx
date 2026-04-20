import { getPostsByCategory } from '@/lib/blog';
import BlogGrid from '@/components/BlogGrid';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export async function generateStaticParams() {
    return [
        { category: 'cybersecurity' },
        { category: 'neurotechnology' },
    ];
}

// FIX 5 — unique generateMetadata for category pages
export async function generateMetadata(
    { params }: { params: Promise<{ category: string }> }
): Promise<Metadata> {
    const { category } = await params;
    const isCyber = category === 'cybersecurity';
    return {
        title: isCyber
            ? 'Cybersecurity Articles | CyberNeurix Blog'
            : 'Neurotechnology Articles | CyberNeurix Blog',
        description: isCyber
            ? 'In-depth cybersecurity research: threat hunting, Zero Trust, detection engineering, SOC automation, quantum security, and more from the CyberNeurix research team.'
            : 'Neurotechnology research and analysis: BCIs, neural security, AI-brain interfaces, neuroplasticity, neuroethics, and the future of brain-computer interaction.',
        alternates: {
            canonical: `https://blogs.cyberneurix.com/category/${category}/`,
        },
        openGraph: {
            title: isCyber
                ? 'Cybersecurity Articles | CyberNeurix Blog'
                : 'Neurotechnology Articles | CyberNeurix Blog',
            url: `https://blogs.cyberneurix.com/category/${category}/`,
            images: [{ url: 'https://blogs.cyberneurix.com/og-default.jpg', width: 1200, height: 630 }],
        },
    };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
    const { category: rawCategory } = await params;
    const category = rawCategory as 'cybersecurity' | 'neurotechnology';

    if (category !== 'cybersecurity' && category !== 'neurotechnology') {
        notFound();
    }

    const posts = getPostsByCategory(category);

    return (
        <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 capitalize">
                    {category === 'cybersecurity' ? 'Cybersecurity' : 'NeuroTechnology'} Articles
                </h1>
                <p className="text-zinc-400 text-lg">
                    {category === 'cybersecurity'
                        ? 'Defending the digital frontier with cutting-edge security insights'
                        : 'Where mind meets machine - exploring the neural frontier'}
                </p>
            </div>

            {posts.length > 0 ? (
                <BlogGrid posts={posts} />
            ) : (
                <div className="text-center py-20">
                    <p className="text-zinc-400 text-lg">No posts found in this category yet.</p>
                </div>
            )}
        </div>
    );
}
