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
  VoucherTypeRequest,
  VoucherTypeUpdateRequest,
} from "../models/voucher-type-request.interface";
import {
  VoucherTypeByIdResponse,
  VoucherTypeResponse,
} from "../models/voucher-type-response.interface";

@Injectable({
  providedIn: "root",
})
export class VoucherTypeService {
  constructor(private _http: HttpClient, private _alert: AlertService) {}

  GetAll(
    size: string,
    sort: string,
    order: string,
    page: number,
    getInputs: string
  ): Observable<BaseResponse> {
    const requestUrl = `${env.api}${
      endpoint.LIST_VOUCHER_TYPES
    }?records=${size}&sort=${sort}&order=${order}&numPage=${
      page + 1
    }${getInputs}`;

    return this._http.get<BaseResponse>(requestUrl).pipe(
      map((resp: BaseResponse) => {
        resp.data.forEach(function (prov: VoucherTypeResponse) {
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
          prov.icEdit = getIcon("icEdit", "Editar Tipos de Vouchero", true);
          prov.icDelete = getIcon(
            "icDelete",
            "Eliminar Tipos de Vouchero",
            true
          );
        });
        return resp;
      })
    );
  }

  voucherTypeById(voucherTypeId: number): Observable<VoucherTypeByIdResponse> {
    const requestUrl = `${env.api}${endpoint.VOUCHER_TYPE_BY_ID}${voucherTypeId}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp.data;
      })
    );
  }

  voucherTypeRegister(
    voucherType: VoucherTypeRequest
  ): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.VOUCHER_TYPE_REGISTER}`;
    return this._http.post(requestUrl, voucherType).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  voucherTypeEdit(
    voucherType: VoucherTypeUpdateRequest
  ): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.VOUCHER_TYPE_EDIT}`;
    return this._http.put<BaseResponse>(requestUrl, voucherType);
  }

  voucherTypeRemove(voucherTypeId: number): Observable<void> {
    const requestUrl = `${env.api}${endpoint.VOUCHER_TYPE_DELETE}${voucherTypeId}`;
    return this._http.delete(requestUrl).pipe(
      map((resp: BaseResponse) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
        }
      })
    );
  }
}
