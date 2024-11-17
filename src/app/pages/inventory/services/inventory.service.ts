import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { endpoint } from "@shared/apis/endpoint";
import { getIcon } from "@shared/functions/helpers";
import { BaseResponse } from "@shared/models/base-api-response.interface";
import { AlertService } from "@shared/services/alert.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment as env } from "src/environments/environment";
import {
  InventoryRequest,
  InventoryUpdateRequest,
} from "../models/inventory-request.interface";
import {
  InventoryByIdResponse,
  InventoryResponse,
} from "../models/inventory-response.interface";

@Injectable({
  providedIn: "root",
})
export class InventoryService {
  constructor(private _http: HttpClient, private _alert: AlertService) {}

  /*GetAll(
    size: string,
    sort: string,
    order: string,
    page: number,
    getInputs: string
  ): Observable<BaseResponse> {
    const requestUrl = `${env.api}${
      endpoint.LIST_INVENTORIES
    }?records=${size}&sort=${sort}&order=${order}&numPage=${
      page + 1
    }${getInputs}`;

    return this._http.get<BaseResponse>(requestUrl).pipe(
      map((resp: BaseResponse) => {
        resp.data.forEach(function (prov: InventoryResponse) {
          switch (prov.state) {
            case 0:
              prov.badgeColor = "text-gray bg-gray-light";
              break;
            case 1:
              prov.badgeColor = "text-green bg-green-light";
              break;
            default:
              prov.badgeColor = "text-gray bg-gray-light";
              break;
          }
          prov.icDownload = getIcon("icCloudDownload", "Descargar QR", true);
          prov.icEdit = getIcon("icEdit", "Editar Equipo", true);
          prov.icDelete = getIcon("icDelete", "Eliminar Equipo", true);
        });
        return resp;
      })
    );
  }

  inventoryById(inventoryId: number): Observable<InventoryByIdResponse> {
    const requestUrl = `${env.api}${endpoint.INVENTORY_BY_ID}${inventoryId}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp.data;
      })
    );
  }

  inventoryRegister(inventory: InventoryRequest): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.INVENTORY_CREATE}`;
    const formDataInventory = this._builFormDataInventory(inventory);
    return this._http.post(requestUrl, formDataInventory).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  inventoryEdit(inventory: InventoryUpdateRequest): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.INVENTORY_UPDATE}`;
    const formDataInventory = this._builFormDataInventoryUpdate(inventory);
    return this._http.put<BaseResponse>(requestUrl, formDataInventory);
  }

  inventoryRemove(inventoryId: number): Observable<void> {
    const requestUrl = `${env.api}${endpoint.INVENTORY_DELETE}${inventoryId}`;
    return this._http.delete(requestUrl).pipe(
      map((resp: BaseResponse) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
        }
      })
    );
  }*/

  /*inventoryReport(inventory: InventoryResponse): void {
    const requestUrl = `${env.api}${endpoint.REPORT_QR}${inventory.inventoryId}`;

    this._http
      .get(requestUrl, { responseType: "blob", observe: "response" })
      .subscribe((response) => {
        let fileName = `${inventory.code}.png`; 

        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(response.body);
        link.download = fileName;
        link.click();

        link.remove();
        window.URL.revokeObjectURL(link.href);
      });
  }*/

  private _builFormDataInventory(inventory: InventoryRequest): FormData {
    const formData = new FormData();
      formData.append("equipmentTypeId", inventory.equipmentTypeId.toString()),
      formData.append("brand", inventory.brand),
      formData.append("series", inventory.series),
      formData.append("model", inventory.model),
      formData.append("price", inventory.price.toString()),
      formData.append("state", inventory.state.toString()),
      formData.append("image", inventory.image),
      formData.append("details", inventory.details);

    return formData;
  }

  private _builFormDataInventoryUpdate(
    inventory: InventoryUpdateRequest
  ): FormData {
    const formData = new FormData();
      formData.append("inventoryId", inventory.inventoryId.toString()),
      formData.append("equipmentTypeId", inventory.equipmentTypeId.toString()),
      formData.append("brand", inventory.brand),
      formData.append("series", inventory.series),
      formData.append("model", inventory.model),
      formData.append("price", inventory.price.toString()),
      formData.append("state", inventory.state.toString()),
      formData.append("image", inventory.image),
      formData.append("details", inventory.details);

    return formData;
  }
}
