import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { endpoint } from "@shared/apis/endpoint";
import { getIcon } from "@shared/functions/helpers";
import { BaseResponse } from "@shared/models/base-api-response.interface";
import { AlertService } from "@shared/services/alert.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment as env } from "src/environments/environment";
import { DocumentTypeRequest, DocumentTypeUpdateRequest } from "../models/document-type-request.interface";
import {
  DocumentTypeByIdResponse,
  DocumentTypeResponse,
} from "../models/document-type-response.interface";

@Injectable({
  providedIn: 'root'
})
export class DocumentTypeService {
  constructor(private _http: HttpClient, private _alert: AlertService) {}

  GetAll(
    size: string,
    sort: string,
    order: string,
    page: number,
    getInputs: string
  ): Observable<BaseResponse> {
    const requestUrl = `${env.api}${
      endpoint.LIST_DOCUMENT_TYPES
    }?records=${size}&sort=${sort}&order=${order}&numPage=${
      page + 1
    }${getInputs}`;

    return this._http.get<BaseResponse>(requestUrl).pipe(
      map((resp: BaseResponse) => {
        resp.data.forEach(function (prov: DocumentTypeResponse) {
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
          prov.icEdit = getIcon("icEdit", "Editar Tipos de Documento", true);
          prov.icDelete = getIcon("icDelete", "Eliminar Tipos de Documento", true);
        });
        return resp;
      })
    );
  }

  documentTypeById(documentTypeId: number): Observable<DocumentTypeByIdResponse> {
    const requestUrl = `${env.api}${endpoint.DOCUMENT_TYPE_BY_ID}${documentTypeId}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp.data;
      })
    );
  }

  documentTypeRegister(documentType: DocumentTypeRequest): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.DOCUMENT_TYPE_REGISTER}`;
    return this._http.post(requestUrl, documentType).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  documentTypeEdit(
    documentType: DocumentTypeUpdateRequest 
  ): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.DOCUMENT_TYPE_EDIT}`;
    return this._http.put<BaseResponse>(requestUrl, documentType);
  }

  documentTypeRemove(documentTypeId: number): Observable<void> {
    const requestUrl = `${env.api}${endpoint.DOCUMENT_TYPE_DELETE}${documentTypeId}`;
    return this._http.delete(requestUrl).pipe(
      map((resp: BaseResponse) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
        }
      })
    );
  }
}
