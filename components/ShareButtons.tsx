import React, { useState } from 'react';
import { Facebook, Twitter, Link as LinkIcon, Check, MessageCircle } from 'lucide-react';

interface ShareButtonsProps {
  productName: string;
  url?: string;
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({ productName, url }) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = url || window.location.href;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(`Check out ${productName} on GabNork Tech!`);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-2 mt-6">
      <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mr-1">Share</span>
      
      <a 
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-8 h-8 flex items-center justify-center bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-full transition-all transform hover:-translate-y-0.5"
        title="Share on Facebook"
      >
        <Facebook size={16} />
      </a>

      <a 
        href={`https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-8 h-8 flex items-center justify-center bg-sky-50 hover:bg-sky-100 dark:bg-sky-900/20 dark:hover:bg-sky-900/40 text-sky-500 dark:text-sky-400 rounded-full transition-all transform hover:-translate-y-0.5"
        title="Share on Twitter"
      >
        <Twitter size={16} />
      </a>

      <a 
        href={`https://wa.me/?text=${encodedText}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-8 h-8 flex items-center justify-center bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/40 text-green-600 dark:text-green-400 rounded-full transition-all transform hover:-translate-y-0.5"
        title="Share on WhatsApp"
      >
        <MessageCircle size={16} />
      </a>

      <button 
        onClick={handleCopy}
        className="w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-full transition-all transform hover:-translate-y-0.5"
        title="Copy Link"
      >
        {copied ? <Check size={16} className="text-green-500" /> : <LinkIcon size={16} />}
      </button>
    </div>
  );
};