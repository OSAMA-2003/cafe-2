export interface CafeInfo {
  id: string
  name: string
  description: string | null
  address: string | null
  phone: string | null
  logo_url: string | null
  cover_url: string | null
  created_at: string
}

export interface Category {
  id: string
  name: string
  created_at: string
}

export interface Product {
  id: string
  name: string
  description: string | null
  price: number
  image_url: string | null
  category_id: string
  available: boolean
  featured: boolean
  created_at: string
}

export interface DashboardStats {
  totalProducts: number
  totalCategories: number
  activeProducts: number
}
