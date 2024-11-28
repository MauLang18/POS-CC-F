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
  InvoiceRequest,
  InvoiceUpdateRequest,
} from "../models/invoice-request.interface";
import {
  InvoiceByIdResponse,
  InvoiceResponse,
} from "../models/invoice-response.interface";

@Injectable({
  providedIn: "root",
})
export class InvoiceService {
  constructor(private _http: HttpClient, private _alert: AlertService) {}

  GetAll(
    size: string,
    sort: string,
    order: string,
    page: number,
    getInputs: string
  ): Observable<BaseResponse> {
    const requestUrl = `${env.api}${
      endpoint.LIST_INVOICES
    }?records=${size}&sort=${sort}&order=${order}&numPage=${
      page + 1
    }${getInputs}`;

    return this._http.get<BaseResponse>(requestUrl).pipe(
      map((resp: BaseResponse) => {
        resp.data.forEach(function (prov: InvoiceResponse) {
          prov.icEdit = getIcon("icEdit", "Editar Factura", true);
          prov.icDownload = getIcon(
            "icDownload",
            "Descargar y Enviar Factura",
            true
          );
        });
        return resp;
      })
    );
  }

  invoiceById(invoiceId: number): Observable<InvoiceByIdResponse> {
    const requestUrl = `${env.api}${endpoint.INVOICE_BY_ID}${invoiceId}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp.data;
      })
    );
  }

  invoiceRegister(invoice: InvoiceRequest): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.INVOICE_REGISTER}`;
    return this._http.post(requestUrl, invoice).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  invoiceEdit(invoice: InvoiceUpdateRequest): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.INVOICE_EDIT}`;
    return this._http.put<BaseResponse>(requestUrl, invoice);
  }

  invoiceRemove(invoiceId: number): Observable<void> {
    const requestUrl = `${env.api}${endpoint.INVOICE_DELETE}${invoiceId}`;
    return this._http.delete(requestUrl).pipe(
      map((resp: BaseResponse) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
        }
      })
    );
  }

  getInvoiceReport(
    data: any,
    reportType: string,
    templateId: number
  ): Observable<Blob> {
    const requestUrl = `${env.api}${endpoint.VIEW_REPORT}${data.invoiceId}?templateId=${templateId}&reportType=${reportType}`;
    return this._http.get<Blob>(requestUrl, { responseType: "blob" as "json" });
  }

  invoiceReport(
    data: InvoiceResponse,
    reportType: string,
    templateId: number
  ): void {
    const requestUrl = `${env.api}${endpoint.DOWNLOAD_REPORT}${data.invoiceId}?reportType=${reportType}&templateId=${templateId}`;

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

  invoiceEmailReport(
    data: InvoiceResponse,
    reportType: string,
    templateId: number
  ): void {
    const requestUrl = `${env.api}${endpoint.SEND_REPORT}${data.invoiceId}?reportType=${reportType}&templateId=${templateId}`;

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
}
