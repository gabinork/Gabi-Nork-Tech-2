export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  category: 'Crypto' | 'AI' | 'Tech' | 'Gadgets';
  image: string;
  isFeatured?: boolean;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of Decentralized Finance in 2025',
    excerpt: 'As blockchain technology matures, we explore how DeFi is reshaping the global economy and what it means for your digital assets.',
    author: 'Gabriel Nork',
    authorRole: 'CEO & Founder',
    date: 'Oct 12, 2024',
    readTime: '5 min read',
    category: 'Crypto',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=1200',
    isFeatured: true
  },
  {
    id: '2',
    title: 'AI Assistants: More Than Just Chatbots',
    excerpt: 'How the new generation of AI, like our own "Gabby", is transforming the e-commerce shopping experience.',
    author: 'Sarah Jenkins',
    authorRole: 'Head of AI',
    date: 'Oct 10, 2024',
    readTime: '3 min read',
    category: 'AI',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '3',
    title: 'Review: GabNork ProBook X1 vs. MacBook Air',
    excerpt: 'A comprehensive deep dive into performance, battery life, and value for money. Is the X1 the new king of ultrabooks?',
    author: 'Emmanuel Kalu',
    authorRole: 'Tech Reviewer',
    date: 'Oct 08, 2024',
    readTime: '8 min read',
    category: 'Gadgets',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca4?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '4',
    title: '5 Essential Accessories for Your Setup',
    excerpt: 'Elevate your productivity and gaming experience with these must-have desk upgrades.',
    author: 'Chioma Adebayo',
    authorRole: 'Product Manager',
    date: 'Sep 28, 2024',
    readTime: '4 min read',
    category: 'Tech',
    image: 'https://images.unsplash.com/photo-1491933382434-500287f9b54b?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '5',
    title: 'Understanding Crypto Wallets',
    excerpt: 'Hot wallets, cold wallets, and hardware keys. We break down how to keep your digital currency safe.',
    author: 'Gabriel Nork',
    authorRole: 'CEO & Founder',
    date: 'Sep 25, 2024',
    readTime: '6 min read',
    category: 'Crypto',
    image: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '6',
    title: 'The Rise of Wearable Health Tech',
    excerpt: 'From heart rate monitoring to sleep tracking, how smartwatches are helping Nigerians live healthier lives.',
    author: 'Dr. Tunde Bakare',
    authorRole: 'Health Consultant',
    date: 'Sep 20, 2024',
    readTime: '4 min read',
    category: 'Gadgets',
    image: 'https://images.unsplash.com/photo-1510017803434-a899398421b3?auto=format&fit=crop&q=80&w=800'
  }
];