export interface Product {
  _id: string
  images: string[]
  price: number
  rating: number
  price_before_discount: number
  quantity: number
  sold: number
  view: number
  name: string
  description: string
  category: {
    _id: string
    name: string
    __v: number
  }
  image: string
  createdAt: string
  updatedAt: string
}
export interface ProductConfig {
  page?: number | string
  limit?: number | string
  order?: 'desc' | 'asc'
  sort_by?: 'createdAt' | 'view' | 'sold' | 'price'
  category?: string
  exclude?: number | string
  rating_filter?: number | string
  price_max?: number | string
  price_min?: number | string
  name?: string
}

export interface ProductList {
  products: Product[]
  pagination?: {
    page?: number
    limit?: number
    page_size?: number
  }
}
// page?: number | string
//   limit?: number | string
//   sort_by?: 'createdAt' | 'view' | 'sold' | 'price'
//   order?: 'asc' | 'desc'
//   exclude?: string
//   rating_filter?: number | string
//   price_max?: number | string
//   price_min?: number | string
//   name?: string
//   category?: string

// page: number. Số trang. Mặc định là 1
// limit: number. Số product trên 1 trang. Mặc định là 30
// order: 'desc' || 'asc'. Sắp xếp theo thứ tự. Mặc định là 'desc'
// sort_by: 'createdAt' || 'view' || 'sold' || 'price'. Sắp xếp theo trường. Mặc định là 'createdAt'.
// category: categoryId. Lọc sản phẩm theo category
// exclude: productId. Loại trừ sản phẩm nào đó
// rating_filter: number. Lọc sản phẩm có số sao lớn hơn hoặc bằng rating_filter
// price_max: number. Giá cao nhất
// price_min: number. Giá thấp nhất
// name: string. Tên sản phẩm (lưu ý Tên sản phẩm tiếng Việt phải gõ đầy đủ dấu)
