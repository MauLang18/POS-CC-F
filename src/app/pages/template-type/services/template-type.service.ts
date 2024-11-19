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
  TemplateTypeRequest,
  TemplateTypeUpdateRequest,
} from "../models/template-type-request.interface";
import {
  TemplateTypeByIdResponse,
  TemplateTypeResponse,
} from "../models/template-type-response.interface";

@Injectable({
  providedIn: "root",
})
export class TemplateTypeService {
  constructor(private _http: HttpClient, private _alert: AlertService) {}

  GetAll(
    size: string,
    sort: string,
    order: string,
    page: number,
    getInputs: string
  ): Observable<BaseResponse> {
    const requestUrl = `${env.api}${
      endpoint.LIST_TEMPLATE_TYPES
    }?records=${size}&sort=${sort}&order=${order}&numPage=${
      page + 1
    }${getInputs}`;

    return this._http.get<BaseResponse>(requestUrl).pipe(
      map((resp: BaseResponse) => {
        resp.data.forEach(function (prov: TemplateTypeResponse) {
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
          prov.icEdit = getIcon("icEdit", "Editar Tipos de Templateo", true);
          prov.icDelete = getIcon(
            "icDelete",
            "Eliminar Tipos de Templateo",
            true
          );
        });
        return resp;
      })
    );
  }

  templateTypeById(
    templateTypeId: number
  ): Observable<TemplateTypeByIdResponse> {
    const requestUrl = `${env.api}${endpoint.TEMPLATE_TYPE_BY_ID}${templateTypeId}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp.data;
      })
    );
  }

  templateTypeRegister(
    templateType: TemplateTypeRequest
  ): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.TEMPLATE_TYPE_REGISTER}`;
    return this._http.post(requestUrl, templateType).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  templateTypeEdit(
    templateType: TemplateTypeUpdateRequest
  ): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.TEMPLATE_TYPE_EDIT}`;
    return this._http.put<BaseResponse>(requestUrl, templateType);
  }

  templateTypeRemove(templateTypeId: number): Observable<void> {
    const requestUrl = `${env.api}${endpoint.TEMPLATE_TYPE_DELETE}${templateTypeId}`;
    return this._http.delete(requestUrl).pipe(
      map((resp: BaseResponse) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
        }
      })
    );
  }
}
