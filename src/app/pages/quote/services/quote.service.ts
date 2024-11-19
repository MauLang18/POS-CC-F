import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { endpoint } from "@shared/apis/endpoint";
import { BaseResponse } from "@shared/models/base-api-response.interface";
import { AlertService } from "@shared/services/alert.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment as env } from "src/environments/environment";
import { getIcon } from "@shared/functions/helpers";
import { QuoteRequest } from "../models/quote-request.interface";
import {
  QuoteByIdResponse,
  QuoteResponse,
} from "../models/quote-response.interface";

@Injectable({
  providedIn: "root",
})
export class QuoteService {
  constructor(private _http: HttpClient, private _alert: AlertService) {}

  GetAll(
    size: string,
    sort: string,
    order: string,
    page: number,
    getInputs: string
  ): Observable<BaseResponse> {
    const requestUrl = `${env.api}${
      endpoint.LIST_QUOTES
    }?records=${size}&sort=${sort}&order=${order}&numPage=${
      page + 1
    }${getInputs}`;

    return this._http
      .get<BaseResponse>(requestUrl)
      .pipe(map((resp) => this.transformQuoteData(resp)));
  }

  private transformQuoteData(response: BaseResponse): BaseResponse {
    response.data.forEach((quote: QuoteResponse) => {
      quote.icReport = getIcon("icCloudDownload", "Descargar Cotizacion", true);
      quote.icVisibility = getIcon(
        "icVisibility",
        "Ver Detalle de Cotización",
        true
      );
      quote.icCancel = getIcon("icChange", "Cambiar Status", true);
    });

    return response;
  }

  quoteById(quoteId: number): Observable<QuoteByIdResponse> {
    const requestUrl = `${env.api}${endpoint.QUOTE_BY_ID}${quoteId}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp.data;
      })
    );
  }

  quoteReport(data: QuoteResponse): void {
    const requestUrl = `${env.api}${endpoint.QUOTE_REPORT}${data.quoteId}`;

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
  }

  quoteEmailReport(data: QuoteResponse): void {
    const requestUrl = `${env.api}${endpoint.QUOTE_EMAIL_REPORT}${data.quoteId}`;

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
  }

  quoteRegister(quote: QuoteRequest) {
    const requestUrl = `${env.api}${endpoint.QUOTE_REGISTER}`;
    return this._http.post<BaseResponse>(requestUrl, quote);
  }

  quoteCancel(quoteId: number): Observable<void> {
    const requestUrl = `${env.api}${endpoint.QUOTE_CANCEL}${quoteId}`;
    return this._http.put(requestUrl, "").pipe(
      map((resp: BaseResponse) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
        }
      })
    );
  }
}
