export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  category: string;
  subcategory?: string;
  description: string;
  volume: string;
  abv?: string;
  region?: string;
  rating?: number;
  inStock: boolean;
  featured?: boolean;
  badge?: string;
}

export interface Category {
  name: string;
  slug: string;
  image: string;
  description: string;
  subcategories?: { name: string; slug: string }[];
}
