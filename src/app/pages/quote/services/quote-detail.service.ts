import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { endpoint } from "@shared/apis/endpoint";
import { getIcon } from "@shared/functions/helpers";
import { BaseResponse } from "@shared/models/base-api-response.interface";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment as env } from "src/environments/environment";
import { ProductDetailsResponse } from "../models/quote-response.interface";

@Injectable({
  providedIn: "root",
})
export class QuoteDetailService {
  constructor(private _http: HttpClient) {}

  GetAll(
    size: string,
    sort: string,
    order: string,
    page: number,
    getInputs: string
  ): Observable<BaseResponse> {
    const requestUrl = `${env.api}${
      endpoint.LIST_PRODUCT_SERVICES
    }?records=${size}&sort=${sort}&order=${order}&numPage=${
      page + 1
    }${getInputs}`;

    return this._http
      .get<BaseResponse>(requestUrl)
      .pipe(map((resp) => this.transformProductData(resp)));
  }

  private transformProductData(response: BaseResponse): BaseResponse {
    response.data.forEach((product: ProductDetailsResponse) => {
      product.icAdd = getIcon(
        "icAdd",
        "Agregar producto o servicio al detalle",
        true
      );
      product.quantity = 0;
      product.price = product.price;
      product.total = 0;
    });

    return response;
  }
}
