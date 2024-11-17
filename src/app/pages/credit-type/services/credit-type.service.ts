import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { endpoint } from "@shared/apis/endpoint";
import { getIcon } from "@shared/functions/helpers";
import { BaseResponse } from "@shared/models/base-api-response.interface";
import { AlertService } from "@shared/services/alert.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment as env } from "src/environments/environment";
import { CreditTypeRequest, CreditTypeUpdateRequest } from "../models/credit-type-request.interface";
import {
  CreditTypeByIdResponse,
  CreditTypeResponse,
} from "../models/credit-type-response.interface";

@Injectable({
  providedIn: 'root'
})
export class CreditTypeService {
  constructor(private _http: HttpClient, private _alert: AlertService) {}

  GetAll(
    size: string,
    sort: string,
    order: string,
    page: number,
    getInputs: string
  ): Observable<BaseResponse> {
    const requestUrl = `${env.api}${
      endpoint.LIST_CREDIT_TYPES
    }?records=${size}&sort=${sort}&order=${order}&numPage=${
      page + 1
    }${getInputs}`;

    return this._http.get<BaseResponse>(requestUrl).pipe(
      map((resp: BaseResponse) => {
        resp.data.forEach(function (prov: CreditTypeResponse) {
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
          prov.icEdit = getIcon("icEdit", "Editar Tipos de Credito", true);
          prov.icDelete = getIcon("icDelete", "Eliminar Tipos de Credito", true);
        });
        return resp;
      })
    );
  }

  creditTypeById(creditTypeId: number): Observable<CreditTypeByIdResponse> {
    const requestUrl = `${env.api}${endpoint.CREDIT_TYPE_BY_ID}${creditTypeId}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp.data;
      })
    );
  }

  creditTypeRegister(creditType: CreditTypeRequest): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.CREDIT_TYPE_REGISTER}`;
    return this._http.post(requestUrl, creditType).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  creditTypeEdit(
    creditType: CreditTypeUpdateRequest 
  ): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.CREDIT_TYPE_EDIT}`;
    return this._http.put<BaseResponse>(requestUrl, creditType);
  }

  creditTypeRemove(creditTypeId: number): Observable<void> {
    const requestUrl = `${env.api}${endpoint.CREDIT_TYPE_DELETE}${creditTypeId}`;
    return this._http.delete(requestUrl).pipe(
      map((resp: BaseResponse) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
        }
      })
    );
  }
}
