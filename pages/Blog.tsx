import React, { useState } from 'react';
import { Calendar, Clock, User, ArrowRight, Tag, ChevronRight } from 'lucide-react';
import { BLOG_POSTS, BlogPost } from '../data/blogData';

export const Blog = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Crypto', 'AI', 'Tech', 'Gadgets'];

  const filteredPosts = activeCategory === 'All' 
    ? BLOG_POSTS 
    : BLOG_POSTS.filter(post => post.category === activeCategory);

  const featuredPost = BLOG_POSTS.find(post => post.isFeatured) || BLOG_POSTS[0];
  const gridPosts = filteredPosts.filter(post => post.id !== featuredPost.id);

  return (
    <div className="bg-[#020617] min-h-screen text-slate-200">
      
      {/* Header Section */}
      <div className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-900/10 to-[#020617]"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500/5 rounded-full blur-[100px]"></div>
        
        <div className="container mx-auto relative z-10 text-center">
          <span className="text-brand-500 font-mono text-xs uppercase tracking-[0.3em] mb-4 block">Insights & Updates</span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">GabNork <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-amber-200">Newsroom</span></h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Stay ahead of the curve with the latest updates on crypto trends, AI innovations, and premium gadget reviews.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-20">
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 border ${
                activeCategory === cat 
                  ? 'bg-brand-600 text-white border-brand-500 shadow-[0_0_15px_rgba(245,158,11,0.3)]' 
                  : 'bg-slate-900/50 text-slate-400 border-slate-800 hover:border-brand-500/50 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Post (Only show if 'All' or matches category) */}
        {(activeCategory === 'All' || featuredPost.category === activeCategory) && (
          <div className="mb-16 group relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative h-[400px] md:h-auto overflow-hidden">
                <div className="absolute inset-0 bg-brand-600/20 group-hover:bg-transparent transition-colors z-10"></div>
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center relative">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `linear-gradient(to right, #334155 1px, transparent 1px), linear-gradient(to bottom, #334155 1px, transparent 1px)`, backgroundSize: '20px 20px' }}></div>
                
                <div className="relative z-10">
                  <div className="flex items-center space-x-3 mb-6">
                    <span className="bg-brand-500 text-slate-900 text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wide">
                      Featured
                    </span>
                    <span className="text-brand-400 text-xs font-bold uppercase tracking-wide flex items-center">
                      <Tag size={12} className="mr-1" /> {featuredPost.category}
                    </span>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight group-hover:text-brand-400 transition-colors">
                    {featuredPost.title}
                  </h2>
                  
                  <p className="text-slate-400 text-lg mb-8 line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between border-t border-slate-800 pt-6">
                    <div className="flex items-center space-x-3">
                       <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-brand-500 font-bold">
                          {featuredPost.author.charAt(0)}
                       </div>
                       <div>
                          <p className="text-sm font-bold text-white">{featuredPost.author}</p>
                          <p className="text-xs text-slate-500">{featuredPost.authorRole}</p>
                       </div>
                    </div>
                    <div className="text-right">
                       <p className="text-sm text-slate-400 flex items-center justify-end"><Calendar size={14} className="mr-2"/> {featuredPost.date}</p>
                       <p className="text-xs text-slate-500 flex items-center justify-end mt-1"><Clock size={12} className="mr-2"/> {featuredPost.readTime}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Grid Posts */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gridPosts.map(post => (
            <article 
              key={post.id} 
              className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden hover:border-brand-500/50 hover:shadow-[0_0_20px_rgba(245,158,11,0.1)] transition-all duration-300 group flex flex-col"
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-slate-900/90 backdrop-blur-sm text-brand-400 text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wide border border-brand-500/20">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center space-x-4 text-xs text-slate-500 mb-3">
                   <span className="flex items-center"><Calendar size={12} className="mr-1"/> {post.date}</span>
                   <span className="flex items-center"><Clock size={12} className="mr-1"/> {post.readTime}</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-400 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-slate-400 text-sm mb-6 line-clamp-3 flex-1">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  <div className="flex items-center space-x-2">
                     <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs text-brand-500 font-bold">
                        {post.author.charAt(0)}
                     </div>
                     <span className="text-xs font-medium text-slate-300">{post.author}</span>
                  </div>
                  <button className="text-brand-500 text-sm font-bold flex items-center hover:translate-x-1 transition-transform">
                    Read <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
};