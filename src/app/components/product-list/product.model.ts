export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}
export interface ProductListResponse {
  products: Product[];
  total: number;
  page: number;
  pageSize: number;
}
