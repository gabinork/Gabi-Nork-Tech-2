import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Star, Check, Truck, Shield, ShoppingBag, User, ThumbsUp, Send, LogIn, Home, ChevronRight, Zap, RotateCcw, ShieldCheck, Crown, CheckCircle } from 'lucide-react';
import { PRODUCTS, formatCurrency } from '../constants';
import { useCart } from '../context/CartContext';
import { Product } from '../types';
import { ShareButtons } from '../components/ShareButtons';

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  content: string;
  avatar?: string;
}

// Specific gallery images for products
const PRODUCT_GALLERY: Record<string, string[]> = {
  '3': [ // SonicBlast Pro Earbuds
    'https://images.unsplash.com/photo-1572569028738-411a9cebd27e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1608156639585-b3a032ef9689?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80'
  ]
};

const MOCK_REVIEWS_DATA: Review[] = [
  {
    id: 'r1',
    author: 'Emmanuel Adebayo',
    rating: 5,
    date: '2 days ago',
    content: 'Absolutely love this product! The battery life is amazing and the display is crystal clear. Delivered to Lagos in 24 hours.',
  },
  {
    id: 'r2',
    author: 'Chioma Okeke',
    rating: 4,
    date: '1 week ago',
    content: 'Great value for money. The only downside is the charging speed could be slightly faster, but otherwise perfect.',
  },
  {
    id: 'r3',
    author: 'Tunde Bakare',
    rating: 5,
    date: '2 weeks ago',
    content: 'GabNork never disappoints. Premium quality packaging and the device works exactly as described.',
  }
];

export const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [activeImage, setActiveImage] = useState(0);

  // Review State
  const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS_DATA);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulated auth state
  const [newReview, setNewReview] = useState({ rating: 5, comment: '', name: '' });
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);

  useEffect(() => {
    const found = PRODUCTS.find(p => p.id === id);
    if (found) {
      setProduct(found);
    } else {
      navigate('/shop');
    }
  }, [id, navigate]);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.comment.trim()) return;

    const review: Review = {
      id: Date.now().toString(),
      author: newReview.name || 'GabNork User',
      rating: newReview.rating,
      date: 'Just now',
      content: newReview.comment,
    };

    setReviews([review, ...reviews]);
    setNewReview({ rating: 5, comment: '', name: '' });
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart(product, false); // Add to cart without opening sidebar
      navigate('/checkout');
    }
  };

  if (!product) return null;

  // Use specific gallery if available, otherwise fallback to repeating the main image
  const images = PRODUCT_GALLERY[product.id] || [
    product.image, 
    product.image, 
    product.image 
  ];

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400 mb-8 overflow-x-auto whitespace-nowrap pb-2 scrollbar-hide">
        <Link to="/" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors flex items-center flex-shrink-0">
           <Home size={16} />
        </Link>
        <ChevronRight size={14} className="flex-shrink-0 text-slate-300 dark:text-slate-600" />
        <Link to="/shop" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors flex-shrink-0">
          Shop
        </Link>
        <ChevronRight size={14} className="flex-shrink-0 text-slate-300 dark:text-slate-600" />
        <Link to={`/shop?cat=${product.category}`} className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors flex-shrink-0">
          {product.category}
        </Link>
        <ChevronRight size={14} className="flex-shrink-0 text-slate-300 dark:text-slate-600" />
        <span className="text-slate-900 dark:text-white font-medium truncate max-w-[150px] sm:max-w-md">
          {product.name}
        </span>
      </nav>

      {/* Product Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        
        {/* Image Gallery */}
        <div className="space-y-4 sticky top-24 h-fit">
          <div className="aspect-square rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 relative group shadow-sm">
            <img 
              src={images[activeImage]} 
              alt={product.name} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {product.isNew && (
              <span className="absolute top-4 left-4 bg-brand-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg z-10 uppercase tracking-wide">
                New Arrival
              </span>
            )}
          </div>
          <div className="grid grid-cols-3 gap-4">
            {images.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${activeImage === idx ? 'border-brand-600 ring-2 ring-brand-100 dark:ring-brand-900' : 'border-transparent hover:border-slate-200 dark:hover:border-slate-700 opacity-70 hover:opacity-100'}`}
              >
                <img src={img} alt={`View ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info Column */}
        <div className="flex flex-col">
          <div className="mb-6">
            <div className="flex items-center space-x-2 text-sm mb-3">
              <span className="bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-300 px-3 py-1 rounded-full font-bold text-xs uppercase tracking-wider">{product.category}</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-3 leading-tight">{product.name}</h1>
            <div className="flex items-center space-x-4">
              <div className="flex text-amber-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} fill={star <= product.rating ? "currentColor" : "none"} className={star <= product.rating ? "" : "text-slate-300 dark:text-slate-700"} size={18}/>
                ))}
              </div>
              <span className="text-slate-500 dark:text-slate-400 font-medium text-sm underline decoration-slate-300 underline-offset-4 cursor-pointer hover:text-brand-600 transition-colors">
                Read {product.reviews} Reviews
              </span>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 mb-8 border border-slate-100 dark:border-slate-800">
             <div className="flex flex-wrap items-baseline gap-3">
                <span className="text-4xl font-bold text-slate-900 dark:text-white">{formatCurrency(product.price)}</span>
                {product.price > 500000 && (
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-700/50">
                    <Crown size={14} className="mr-1" /> Premium Product
                  </span>
                )}
                {/* Simulated discount for visual appeal */}
                <span className="text-slate-400 line-through text-lg font-medium ml-auto sm:ml-0">{formatCurrency(product.price * 1.1)}</span>
             </div>
             
             {/* Installment Badge */}
             <div className="mt-4 flex items-center space-x-3 text-sm bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm">
               <div className="bg-brand-100 dark:bg-brand-900/30 p-2 rounded-lg text-brand-600 dark:text-brand-400">
                  <Shield size={18}/>
               </div>
               <div>
                 <p className="font-bold text-slate-900 dark:text-white">Pay in 3 Installments</p>
                 <p className="text-slate-500 dark:text-slate-400 text-xs">Zero interest. First payment of ₦{Math.round(product.price / 3).toLocaleString()} today.</p>
               </div>
             </div>
          </div>

          <div className="mb-8">
            <h3 className="font-bold text-lg mb-4 text-slate-900 dark:text-white flex items-center">
               Key Specifications
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {product.specs.map((spec, i) => (
                <div key={i} className="flex items-center p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-sm font-medium">
                  <Check size={16} className="text-brand-600 mr-3 flex-shrink-0" /> 
                  {spec}
                </div>
              ))}
            </div>
          </div>

          <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
            <p>{product.description}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button 
              onClick={() => addToCart(product)}
              className="flex-1 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-lg font-bold py-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center justify-center"
            >
              <ShoppingBag className="mr-2" /> Add to Cart
            </button>
            <button 
              onClick={handleBuyNow}
              className="flex-1 bg-brand-600 text-white text-lg font-bold py-4 rounded-xl hover:bg-brand-700 transition-all shadow-xl shadow-brand-500/20 flex items-center justify-center"
            >
              <Zap className="mr-2" fill="currentColor" /> Buy Now
            </button>
          </div>

          {/* Trust Signals */}
          <div className="grid grid-cols-2 gap-4 py-6 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                  <Truck size={20} className="mr-3 text-brand-600 flex-shrink-0"/>
                  <span>Free Nationwide Delivery</span>
              </div>
              <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                  <ShieldCheck size={20} className="mr-3 text-brand-600 flex-shrink-0"/>
                  <span>1 Year Official Warranty</span>
              </div>
              <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                  <RotateCcw size={20} className="mr-3 text-brand-600 flex-shrink-0"/>
                  <span>7 Days Return Policy</span>
              </div>
              <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                  <Shield size={20} className="mr-3 text-brand-600 flex-shrink-0"/>
                  <span>100% Secure Payment</span>
              </div>
          </div>
          
          <div className="mt-4">
             <ShareButtons productName={product.name} />
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="border-t border-slate-200 dark:border-slate-800 pt-16">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          
          {/* Reviews List */}
          <div className="flex-1 w-full">
            <div className="flex items-center justify-between mb-8">
               <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Customer Reviews</h2>
               <div className="flex items-center space-x-2">
                  <span className="text-3xl font-bold text-slate-900 dark:text-white">{product.rating}</span>
                  <div className="flex flex-col">
                     <div className="flex text-amber-400 text-xs">
                        {[...Array(5)].map((_, i) => (
                           <Star key={i} size={12} fill={i < Math.round(product.rating) ? "currentColor" : "none"} />
                        ))}
                     </div>
                     <span className="text-xs text-slate-500">Based on {reviews.length} reviews</span>
                  </div>
               </div>
            </div>
            
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="bg-slate-50 dark:bg-slate-800/30 rounded-2xl p-6 border border-slate-100 dark:border-slate-800">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-700 flex items-center justify-center text-brand-600 dark:text-slate-300 font-bold shadow-sm">
                        {review.author.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm">{review.author}</h4>
                        <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center">
                           <CheckCircle size={10} className="text-green-500 mr-1" /> Verified Buyer • {review.date}
                        </span>
                      </div>
                    </div>
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "" : "text-slate-300 dark:text-slate-700"} />
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4">
                    "{review.content}"
                  </p>
                  <button className="flex items-center space-x-1 text-xs text-slate-400 hover:text-brand-600 transition-colors font-medium">
                    <ThumbsUp size={12} /> <span>Helpful</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Review Form */}
          <div className="w-full md:w-1/3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sticky top-24 shadow-lg shadow-slate-100 dark:shadow-none">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Write a Review</h3>
              {/* Auth Toggle Simulator */}
              <button 
                onClick={() => setIsLoggedIn(!isLoggedIn)}
                className="text-xs text-slate-400 hover:text-brand-600 underline"
              >
                {isLoggedIn ? 'Sign Out' : 'Simulate Login'}
              </button>
            </div>

            {isLoggedIn ? (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Rating</label>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onMouseEnter={() => setHoveredStar(star)}
                        onMouseLeave={() => setHoveredStar(null)}
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                        className="focus:outline-none transition-transform hover:scale-110"
                      >
                        <Star 
                          size={24} 
                          className={`${(hoveredStar !== null ? star <= hoveredStar : star <= newReview.rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-300 dark:text-slate-700'}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                   <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Name</label>
                   <input 
                    type="text"
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    placeholder="Your display name"
                    required
                    className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition-colors"
                   />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Review</label>
                  <textarea
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    placeholder="Share your thoughts about this product..."
                    rows={4}
                    required
                    className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition-colors resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-brand-600 text-white py-3 rounded-xl font-bold hover:bg-brand-700 transition-colors flex items-center justify-center"
                >
                  <Send size={16} className="mr-2" /> Submit Review
                </button>
              </form>
            ) : (
              <div className="text-center py-8 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
                <div className="w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-500 dark:text-slate-400">
                  <LogIn size={24} />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-1">Log in to Review</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 px-4">
                  You must be logged in to share your experience with this product.
                </p>
                <button 
                  onClick={() => setIsLoggedIn(true)}
                  className="px-6 py-2 bg-slate-900 dark:bg-slate-700 text-white text-sm font-medium rounded-full hover:bg-brand-600 transition-colors"
                >
                  Log In Now
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
