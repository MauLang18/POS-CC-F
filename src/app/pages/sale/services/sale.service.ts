import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { endpoint } from "@shared/apis/endpoint";
import { BaseResponse } from "@shared/models/base-api-response.interface";
import { AlertService } from "@shared/services/alert.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment as env } from "src/environments/environment";
import { getIcon } from "@shared/functions/helpers";
import { SaleRequest } from "../models/sale-request.interface";
import {
  SaleByIdResponse,
  SaleResponse,
} from "../models/sale-response.interface";

@Injectable({
  providedIn: "root",
})
export class SaleService {
  constructor(private _http: HttpClient, private _alert: AlertService) {}

  GetAll(
    size: string,
    sort: string,
    order: string,
    page: number,
    getInputs: string
  ): Observable<BaseResponse> {
    const requestUrl = `${env.api}${
      endpoint.LIST_SALES
    }?records=${size}&sort=${sort}&order=${order}&numPage=${
      page + 1
    }${getInputs}`;

    return this._http
      .get<BaseResponse>(requestUrl)
      .pipe(map((resp) => this.transformSaleData(resp)));
  }

  private transformSaleData(response: BaseResponse): BaseResponse {
    response.data.forEach((sale: SaleResponse) => {
      sale.icReport = getIcon("icCloudDownload", "Descargar Factura", true);
      sale.icVisibility = getIcon("icVisibility", "Ver Detalle de Venta", true);
      sale.icCancel = getIcon("icCancel", "Anular Venta", true);
    });

    return response;
  }

  saleById(saleId: number): Observable<SaleByIdResponse> {
    const requestUrl = `${env.api}${endpoint.SALE_BY_ID}${saleId}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp.data;
      })
    );
  }

  /*saleReport(data: SaleResponse): void {
    const requestUrl = `${env.api}${endpoint.SALE_REPORT}${data.saleId}`;

    this._http
      .get(requestUrl, { responseType: "blob", observe: "response" })
      .subscribe((response) => {
        let fileName = `${data.voucherNumber}.pdf`; 

        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(response.body);
        link.download = fileName;
        link.click();

        // Cleanup
        link.remove();
        window.URL.revokeObjectURL(link.href);
      });
  }*/

  saleRegister(sale: SaleRequest) {
    const requestUrl = `${env.api}${endpoint.SALE_REGISTER}`;
    return this._http.post<BaseResponse>(requestUrl, sale);
  }

  saleCancel(saleId: number): Observable<void> {
    const requestUrl = `${env.api}${endpoint.SALE_CANCEL}${saleId}`;
    return this._http.put(requestUrl, "").pipe(
      map((resp: BaseResponse) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
        }
      })
    );
  }
}
