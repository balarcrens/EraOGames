import Link from "next/link";
import { blogPosts } from "@/data/blog";
import { BookOpen, Home, ChevronRight, Calendar, Clock, User } from "lucide-react";

export const metadata = {
  title: "EraOGames Blog - Gaming Guides, Tips, and Industry Insights",
  description: "Read the latest articles about browser gaming, game guides, tips, industry insights, and more from the EraOGames editorial team.",
};

export default function BlogIndexPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 font-sans">
      <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-8 font-semibold">
        <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-500 dark:text-slate-400 font-bold">Blog</span>
      </div>

      <div className="animate-fade-in-up text-center mb-12">
        <div className="w-14 h-14 bg-indigo-50 dark:bg-[#121824] border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-center mx-auto mb-4 text-indigo-500 rounded-2xl">
          <BookOpen className="w-7 h-7" />
        </div>
        <h1 className="text-3xl md:text-5xl font-display font-bold text-slate-800 dark:text-white tracking-wide">
          EraOGames Blog
        </h1>
        <p className="text-base text-slate-500 dark:text-slate-400 mt-4 max-w-2xl mx-auto font-medium">
          Gaming guides, tips, industry insights, and everything you need to know about browser gaming.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {blogPosts.map((post, idx) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="animate-fade-in-up group bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-premium overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:shadow-premium-hover hover:border-indigo-500/30 dark:hover:border-violet-500/30"
            style={{ animationDelay: `${0.1 + idx * 0.1}s` }}
          >
            <div className="p-6 md:p-7">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-indigo-600 dark:text-violet-400 mb-3">
                <span className="px-2.5 py-1 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/30 rounded-full">
                  {post.category}
                </span>
              </div>
              <h2 className="text-lg md:text-xl font-display font-bold text-slate-800 dark:text-white mb-3 leading-snug group-hover:text-indigo-600 dark:group-hover:text-violet-400 transition-colors line-clamp-2">
                {post.title}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4 font-medium line-clamp-3">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-4 text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800/80 pt-4 mt-auto">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3 h-3" />
                  {post.readTime}
                </span>
                <span className="flex items-center gap-1.5 truncate">
                  <User className="w-3 h-3 shrink-0" />
                  <span className="truncate">{post.author}</span>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
