export interface UnitRequest {
  name: string;
  abbreviation: string;
  state: number;
}

export interface UnitUpdateRequest {
  unitId: number;
  name: string;
  abbreviation: string;
  state: number;
}
