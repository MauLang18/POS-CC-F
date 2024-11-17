import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { endpoint } from "@shared/apis/endpoint";
import { getIcon } from "@shared/functions/helpers";
import { BaseResponse } from "@shared/models/base-api-response.interface";
import { AlertService } from "@shared/services/alert.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment as env } from "src/environments/environment";
import { CustomerRequest, CustomerUpdateRequest } from "../models/customer-request.interface";
import {
  CustomerByIdResponse,
  CustomerResponse,
} from "../models/customer-response.interface";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private _http: HttpClient, private _alert: AlertService) {}

  GetAll(
    size: string,
    sort: string,
    order: string,
    page: number,
    getInputs: string
  ): Observable<BaseResponse> {
    const requestUrl = `${env.api}${
      endpoint.LIST_CUSTOMERS
    }?records=${size}&sort=${sort}&order=${order}&numPage=${
      page + 1
    }${getInputs}`;

    return this._http.get<BaseResponse>(requestUrl).pipe(
      map((resp: BaseResponse) => {
        resp.data.forEach(function (prov: CustomerResponse) {
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

  customerById(customerId: number): Observable<CustomerByIdResponse> {
    const requestUrl = `${env.api}${endpoint.CUSTOMER_BY_ID}${customerId}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp.data;
      })
    );
  }

  customerRegister(customer: CustomerRequest): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.CUSTOMER_REGISTER}`;
    return this._http.post(requestUrl, customer).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  customerEdit(
    customer: CustomerUpdateRequest 
  ): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.CUSTOMER_EDIT}`;
    return this._http.put<BaseResponse>(requestUrl, customer);
  }

  customerRemove(customerId: number): Observable<void> {
    const requestUrl = `${env.api}${endpoint.CUSTOMER_DELETE}${customerId}`;
    return this._http.delete(requestUrl).pipe(
      map((resp: BaseResponse) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
        }
      })
    );
  }
}
