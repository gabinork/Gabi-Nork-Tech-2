import { Product, Category } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'GabNork ProBook X1',
    description: 'Ultra-slim laptop with M3 chip equivalent performance, 16GB RAM, and 512GB SSD. Perfect for professionals.',
    price: 1200000,
    category: Category.Laptops,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80',
    specs: ['14" 4K Retina Display', '16GB RAM', '512GB SSD', '20h Battery Life'],
    rating: 4.8,
    reviews: 124,
    isNew: true
  },
  {
    id: '2',
    name: 'TechnoSphere Z5 Phone',
    description: 'Flagship smartphone featuring a 108MP camera and AI-enhanced photography.',
    price: 850000,
    category: Category.Phones,
    image: 'https://images.unsplash.com/photo-1592286927505-1def25115558?auto=format&fit=crop&w=800&q=80',
    specs: ['6.7" OLED 120Hz', '256GB Storage', '108MP Camera', '5000mAh'],
    rating: 4.7,
    reviews: 89,
    isNew: true
  },
  {
    id: '3',
    name: 'SonicBlast Pro Earbuds',
    description: 'Active noise cancelling earbuds with immersive spatial audio.',
    price: 150000,
    category: Category.Audio,
    image: 'https://images.unsplash.com/photo-1572569028738-411a9cebd27e?auto=format&fit=crop&w=800&q=80',
    specs: ['ANC', '30h Playtime', 'Water Resistant', 'Transparency Mode'],
    rating: 4.5,
    reviews: 230
  },
  {
    id: '4',
    name: 'Chronos Smartwatch 4',
    description: 'Advanced health tracking, ECG, and seamless connectivity.',
    price: 250000,
    category: Category.Smartwatches,
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80',
    specs: ['Always-on Display', 'ECG Monitor', 'GPS', 'Waterproof 50m'],
    rating: 4.6,
    reviews: 56
  },
  {
    id: '5',
    name: 'Gaming Beast G7',
    description: 'High-performance gaming laptop with RTX 4080 graphics.',
    price: 2800000,
    category: Category.Laptops,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80',
    specs: ['17" 240Hz Display', 'RTX 4080', '32GB RAM', '1TB SSD'],
    rating: 4.9,
    reviews: 42
  },
  {
    id: '6',
    name: 'Nomad PowerBank 20k',
    description: 'Fast charging 20,000mAh power bank for all your devices.',
    price: 45000,
    category: Category.Accessories,
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=800&q=80',
    specs: ['20,000mAh', '65W PD Output', 'USB-C & A', 'Digital Display'],
    rating: 4.4,
    reviews: 310
  },
  {
    id: '7',
    name: 'StudioOne Over-Ear',
    description: 'Professional grade studio headphones for audiophiles.',
    price: 350000,
    category: Category.Audio,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    specs: ['Hi-Res Audio', 'Memory Foam', 'Wired/Wireless', '50mm Drivers'],
    rating: 4.8,
    reviews: 78
  },
  {
    id: '8',
    name: 'PixelView Monitor 27"',
    description: '4K IPS monitor with 99% sRGB color accuracy.',
    price: 450000,
    category: Category.Accessories,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
    specs: ['4K UHD', 'IPS Panel', 'USB-C Hub', 'HDR10'],
    rating: 4.5,
    reviews: 22
  }
];

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(amount);
};