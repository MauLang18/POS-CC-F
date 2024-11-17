export interface CategoryRequest {
    name: string;
    description: string;
    state: number;
  }
  
  export interface CategoryUpdateRequest {
    categoryId: number;
    name: string;
    description: string;
    state: number;
  }