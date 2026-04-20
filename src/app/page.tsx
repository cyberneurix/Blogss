import { getAllPosts } from '@/lib/blog';
import BlogClient from '@/components/BlogClient';

export default function Home() {
    const allPosts = getAllPosts();

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://cyberneurix.com/#organization",
              "name": "CyberNeurix",
              "url": "https://cyberneurix.com",
              "logo": {
                "@type": "ImageObject",
                "@id": "https://cyberneurix.com/#logo",
                "url": "https://cyberneurix.com/assets/cn.webp",
                "width": 600,
                "height": 60
              },
              "sameAs": ["https://blogs.cyberneurix.com"],
              "description": "CyberNeurix covers the intersection of cybersecurity and neurotechnology."
            }) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://blogs.cyberneurix.com/#website",
              "url": "https://blogs.cyberneurix.com/",
              "name": "CyberNeurix Blog",
              "publisher": { "@id": "https://cyberneurix.com/#organization" },
              "potentialAction": {
                "@type": "SearchAction",
                "target": { "@type": "EntryPoint", "urlTemplate": "https://blogs.cyberneurix.com/?q={search_term_string}" },
                "query-input": "required name=search_term_string"
              }
            }) }} />
            <BlogClient allPosts={allPosts} />
        </>
    );
}
