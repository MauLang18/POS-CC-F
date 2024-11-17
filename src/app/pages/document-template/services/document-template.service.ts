import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { endpoint } from "@shared/apis/endpoint";
import { getIcon } from "@shared/functions/helpers";
import { BaseResponse } from "@shared/models/base-api-response.interface";
import { AlertService } from "@shared/services/alert.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment as env } from "src/environments/environment";
import { DocumentTemplateRequest, DocumentTemplateUpdateRequest } from "../models/document-template-request.interface";
import {
  DocumentTemplateByIdResponse,
  DocumentTemplateResponse,
} from "../models/document-template-response.interface";

@Injectable({
  providedIn: 'root'
})
export class DocumentTemplateService {
  constructor(private _http: HttpClient, private _alert: AlertService) {}

  GetAll(
    size: string,
    sort: string,
    order: string,
    page: number,
    getInputs: string
  ): Observable<BaseResponse> {
    const requestUrl = `${env.api}${
      endpoint.LIST_DOCUMENT_TEMPLATES
    }?records=${size}&sort=${sort}&order=${order}&numPage=${
      page + 1
    }${getInputs}`;

    return this._http.get<BaseResponse>(requestUrl).pipe(
      map((resp: BaseResponse) => {
        resp.data.forEach(function (prov: DocumentTemplateResponse) {
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
          prov.icEdit = getIcon("icEdit", "Editar Plantilla de Documento", true);
          prov.icDelete = getIcon("icDelete", "Eliminar Plantilla de Documento", true);
        });
        return resp;
      })
    );
  }

  documentTemplateById(documentTemplateId: number): Observable<DocumentTemplateByIdResponse> {
    const requestUrl = `${env.api}${endpoint.DOCUMENT_TEMPLATE_BY_ID}${documentTemplateId}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp.data;
      })
    );
  }

  documentTemplateRegister(documentTemplate: DocumentTemplateRequest): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.DOCUMENT_TEMPLATE_REGISTER}`;
    return this._http.post(requestUrl, documentTemplate).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  documentTemplateEdit(
    documentTemplate: DocumentTemplateUpdateRequest 
  ): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.DOCUMENT_TEMPLATE_EDIT}`;
    return this._http.put<BaseResponse>(requestUrl, documentTemplate);
  }

  documentTemplateRemove(documentTemplateId: number): Observable<void> {
    const requestUrl = `${env.api}${endpoint.DOCUMENT_TEMPLATE_DELETE}${documentTemplateId}`;
    return this._http.delete(requestUrl).pipe(
      map((resp: BaseResponse) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
        }
      })
    );
  }
}
