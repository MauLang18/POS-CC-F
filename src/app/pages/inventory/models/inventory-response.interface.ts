export interface InventoryResponse {
    inventoryId: number;
    equipmentType: string;
    code: string;
    active: string;
    brand: string;
    series: string;
    model: string;
    price: number;
    image: string;
    auditCreateDate: Date;
    state:number;
    stateInventory: any;
    badgeColor: string;
    icDownload: any;
    icEdit: any;
    icDelete: any;
  }
  
  export interface InventoryByIdResponse {
    inventoryId: number;
    equipmentTypeId: number;
    code: string;
    active: string;
    brand: string;
    series: string;
    model: string;
    price: number;
    image: string;
    details: string;
    state: number;
  }