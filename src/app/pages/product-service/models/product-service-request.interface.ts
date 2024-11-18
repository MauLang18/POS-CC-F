export interface ProductServiceRequest {
  name: string;
  image: File;
  description: string;
  price: number;
  categoryId: number;
  unitId: number;
  isService: number;
  stockQuantity: number;
  state: number;
}

export interface ProductServiceUpdateRequest {
  productServiceId: number;
  name: string;
  image: File;
  description: string;
  price: number;
  categoryId: number;
  unitId: number;
  isService: number;
  stockQuantity: number;
  state: number;
}
