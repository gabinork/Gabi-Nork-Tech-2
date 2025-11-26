export enum Category {
  Laptops = 'Laptops',
  Phones = 'Phones',
  Smartwatches = 'Smartwatches',
  Audio = 'Audio',
  Accessories = 'Accessories'
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
  specs: string[];
  rating: number;
  reviews: number;
  isNew?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  name: string;
  email: string;
}
