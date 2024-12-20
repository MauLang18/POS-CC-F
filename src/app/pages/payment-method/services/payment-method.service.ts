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
  PaymentMethodRequest,
  PaymentMethodUpdateRequest,
} from "../models/payment-method-request.interface";
import {
  PaymentMethodByIdResponse,
  PaymentMethodResponse,
} from "../models/payment-method-response.interface";

@Injectable({
  providedIn: "root",
})
export class PaymentMethodService {
  constructor(private _http: HttpClient, private _alert: AlertService) {}

  GetAll(
    size: string,
    sort: string,
    order: string,
    page: number,
    getInputs: string
  ): Observable<BaseResponse> {
    const requestUrl = `${env.api}${
      endpoint.LIST_PAYMENT_METHODS
    }?records=${size}&sort=${sort}&order=${order}&numPage=${
      page + 1
    }${getInputs}`;

    return this._http.get<BaseResponse>(requestUrl).pipe(
      map((resp: BaseResponse) => {
        resp.data.forEach(function (prov: PaymentMethodResponse) {
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
          prov.icEdit = getIcon("icEdit", "Editar Metodo de Pago", true);
          prov.icDelete = getIcon("icDelete", "Eliminar Metodo de Pago", true);
        });
        return resp;
      })
    );
  }

  paymentMethodById(
    paymentMethodId: number
  ): Observable<PaymentMethodByIdResponse> {
    const requestUrl = `${env.api}${endpoint.PAYMENT_METHOD_BY_ID}${paymentMethodId}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp.data;
      })
    );
  }

  paymentMethodRegister(
    paymentMethod: PaymentMethodRequest
  ): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.PAYMENT_METHOD_REGISTER}`;
    return this._http.post(requestUrl, paymentMethod).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  paymentMethodEdit(
    paymentMethod: PaymentMethodUpdateRequest
  ): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.PAYMENT_METHOD_EDIT}`;
    return this._http.put<BaseResponse>(requestUrl, paymentMethod);
  }

  paymentMethodRemove(paymentMethodId: number): Observable<void> {
    const requestUrl = `${env.api}${endpoint.PAYMENT_METHOD_DELETE}${paymentMethodId}`;
    return this._http.delete(requestUrl).pipe(
      map((resp: BaseResponse) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
        }
      })
    );
  }
}
