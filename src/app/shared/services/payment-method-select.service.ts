import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseResponse } from '@shared/models/base-api-response.interface';
import { SelectAutoComplete } from '@shared/models/select-autocomplete.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment as env } from "src/environments/environment";
import { endpoint } from "@shared/apis/endpoint";

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodSelectService {
  constructor(private _http: HttpClient) {}

  listSelectPaymentMethod(): Observable<SelectAutoComplete[]> {
    const requestUrl = `${env.api}${endpoint.LIST_SELECT_PAYMENT_METHODS}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp.data;
      })
    );
  }
}
