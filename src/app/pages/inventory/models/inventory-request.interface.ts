export interface InventoryRequest {
    equipmentTypeId: number;
    brand: string;
    series: string;
    model: string;
    price: number;
    image: File;
    details: string;
    state: number;
  }
  
  export interface InventoryUpdateRequest {
    inventoryId: number;
    equipmentTypeId: number;
    brand: string;
    series: string;
    model: string;
    price: number;
    image: File;
    details: string;
    state: number;
  }
  