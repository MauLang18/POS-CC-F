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
  SupplierRequest,
  SupplierUpdateRequest,
} from "../models/supplier-request.interface";
import {
  SupplierByIdResponse,
  SupplierResponse,
} from "../models/supplier-response.interface";

@Injectable({
  providedIn: "root",
})
export class SupplierService {
  constructor(private _http: HttpClient, private _alert: AlertService) {}

  GetAll(
    size: string,
    sort: string,
    order: string,
    page: number,
    getInputs: string
  ): Observable<BaseResponse> {
    const requestUrl = `${env.api}${
      endpoint.LIST_SUPPLIERS
    }?records=${size}&sort=${sort}&order=${order}&numPage=${
      page + 1
    }${getInputs}`;

    return this._http.get<BaseResponse>(requestUrl).pipe(
      map((resp: BaseResponse) => {
        resp.data.forEach(function (prov: SupplierResponse) {
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
          prov.icEdit = getIcon("icEdit", "Editar Cliente", true);
          prov.icDelete = getIcon("icDelete", "Eliminar Cliente", true);
        });
        return resp;
      })
    );
  }

  supplierById(supplierId: number): Observable<SupplierByIdResponse> {
    const requestUrl = `${env.api}${endpoint.SUPPLIER_BY_ID}${supplierId}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp.data;
      })
    );
  }

  supplierRegister(supplier: SupplierRequest): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.SUPPLIER_REGISTER}`;
    return this._http.post(requestUrl, supplier).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  supplierEdit(supplier: SupplierUpdateRequest): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.SUPPLIER_EDIT}`;
    return this._http.put<BaseResponse>(requestUrl, supplier);
  }

  supplierRemove(supplierId: number): Observable<void> {
    const requestUrl = `${env.api}${endpoint.SUPPLIER_DELETE}${supplierId}`;
    return this._http.delete(requestUrl).pipe(
      map((resp: BaseResponse) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
        }
      })
    );
  }
}
