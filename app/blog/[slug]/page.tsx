import { notFound } from "next/navigation";
import Link from "next/link";
import { blogPosts } from "@/data/blog";
import { Home, ChevronRight, Calendar, Clock, User, BookOpen, ArrowLeft } from "lucide-react";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return { title: "Blog Post Not Found - EraOGames" };
  return {
    title: `${post.title} - EraOGames Blog`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} - EraOGames Blog`,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "author": {
      "@type": "Person",
      "name": post.author,
    },
    "datePublished": post.date,
    "publisher": {
      "@type": "Organization",
      "name": "EraOGames",
      "url": "https://eraogames.vercel.app",
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://eraogames.vercel.app/blog/${post.slug}`,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://eraogames.vercel.app/" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://eraogames.vercel.app/blog/" },
      { "@type": "ListItem", "position": 3, "name": post.title, "item": `https://eraogames.vercel.app/blog/${post.slug}/` },
    ],
  };

  const relatedPosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <article className="animate-fade-in max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 font-sans">
        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-8 font-semibold">
          <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/blog" className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
            <BookOpen className="w-3 h-3" />
            <span>Blog</span>
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-500 dark:text-slate-400 font-bold truncate max-w-[200px]">{post.title}</span>
        </div>

        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-violet-400 hover:underline mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Blog
          </Link>

          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-indigo-600 dark:text-violet-400 mb-4">
            <span className="px-2.5 py-1 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/30 rounded-full">
              {post.category}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-slate-800 dark:text-white leading-tight mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400 pb-6 border-b border-slate-200 dark:border-slate-800">
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-premium p-6 md:p-8 lg:p-10">
          <div className="prose prose-sm md:prose-base max-w-none text-slate-600 dark:text-slate-400">
            {post.content.split('\n').map((paragraph, idx) => {
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={idx} className="text-xl md:text-2xl font-display font-bold text-slate-800 dark:text-white mt-10 mb-4">
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              }
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={idx} className="text-lg md:text-xl font-display font-bold text-slate-800 dark:text-white mt-8 mb-3">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('1. ') || paragraph.startsWith('2. ') || paragraph.startsWith('3. ') || paragraph.startsWith('4. ') || paragraph.startsWith('5. ')) {
                const [num, ...rest] = paragraph.split('. ');
                return (
                  <p key={idx} className="text-sm md:text-base leading-relaxed mb-3 ml-4 font-medium">
                    <strong className="font-bold text-slate-700 dark:text-slate-300">{num}.</strong> {rest.join('. ')}
                  </p>
                );
              }
              if (paragraph.trim() === '') return null;
              return (
                <p key={idx} className="text-sm md:text-base leading-relaxed mb-4 font-medium">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>

        {relatedPosts.length > 0 && (
          <section className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-xl md:text-2xl font-display font-bold text-slate-800 dark:text-white mb-6 tracking-wide">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rp) => (
                <Link
                  key={rp.slug}
                  href={`/blog/${rp.slug}`}
                  className="group bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 rounded-xl p-5 transition-all hover:-translate-y-1 hover:border-indigo-500/30"
                >
                  <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 dark:text-violet-400">
                    {rp.category}
                  </span>
                  <h3 className="text-sm font-display font-bold text-slate-800 dark:text-white mt-2 group-hover:text-indigo-600 dark:group-hover:text-violet-400 transition-colors line-clamp-2">
                    {rp.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 font-medium">
                    {rp.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
