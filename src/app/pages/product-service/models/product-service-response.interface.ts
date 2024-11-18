export interface ProductServiceResponse {
  productServiceId: number;
  code: string;
  name: string;
  image: string;
  description: string;
  price: number;
  category: string;
  unit: string;
  service: string;
  stockQuantity: number;
  auditCreateDate: Date;
  state: number;
  stateProductService: any;
  badgeColor: string;
  icDownload: any;
  icEdit: any;
  icDelete: any;
}

export interface ProductServiceByIdResponse {
  productServiceId: number;
  code: string;
  name: string;
  image: string;
  description: string;
  price: number;
  categoryId: number;
  unitId: number;
  isService: number;
  stockQuantity: number;
  state: number;
}
