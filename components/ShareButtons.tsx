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

  const buttonClass = "w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-brand-600 hover:text-white dark:hover:bg-brand-600 dark:hover:text-white transition-all duration-300 shadow-sm hover:shadow-[0_0_15px_rgba(245,158,11,0.3)] hover:-translate-y-1 border border-transparent hover:border-brand-400/50";

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mr-2">Share:</span>
      
      <a 
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClass}
        title="Share on Facebook"
        aria-label="Share on Facebook"
      >
        <Facebook size={18} />
      </a>

      <a 
        href={`https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClass}
        title="Share on Twitter"
        aria-label="Share on Twitter"
      >
        <Twitter size={18} />
      </a>

      <a 
        href={`https://wa.me/?text=${encodedText}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClass}
        title="Share on WhatsApp"
        aria-label="Share on WhatsApp"
      >
        <MessageCircle size={18} />
      </a>

      <button 
        onClick={handleCopy}
        className={buttonClass}
        title="Copy Link"
        aria-label="Copy Link"
      >
        {copied ? <Check size={18} className="text-white" /> : <LinkIcon size={18} />}
      </button>
    </div>
  );
};