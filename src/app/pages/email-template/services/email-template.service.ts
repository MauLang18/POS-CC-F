import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { endpoint } from "@shared/apis/endpoint";
import { getIcon } from "@shared/functions/helpers";
import { BaseResponse } from "@shared/models/base-api-response.interface";
import { AlertService } from "@shared/services/alert.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment as env } from "src/environments/environment";
import { EmailTemplateRequest, EmailTemplateUpdateRequest } from "../models/email-template-request.interface";
import {
  EmailTemplateByIdResponse,
  EmailTemplateResponse,
} from "../models/email-template-response.interface";

@Injectable({
  providedIn: 'root'
})
export class EmailTemplateService {
  constructor(private _http: HttpClient, private _alert: AlertService) {}

  GetAll(
    size: string,
    sort: string,
    order: string,
    page: number,
    getInputs: string
  ): Observable<BaseResponse> {
    const requestUrl = `${env.api}${
      endpoint.LIST_EMAIL_TEMPLATES
    }?records=${size}&sort=${sort}&order=${order}&numPage=${
      page + 1
    }${getInputs}`;

    return this._http.get<BaseResponse>(requestUrl).pipe(
      map((resp: BaseResponse) => {
        resp.data.forEach(function (prov: EmailTemplateResponse) {
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
          prov.icEdit = getIcon("icEdit", "Editar Plantilla de Email", true);
          prov.icDelete = getIcon("icDelete", "Eliminar Plantilla de Email", true);
        });
        return resp;
      })
    );
  }

  emailTemplateById(emailTemplateId: number): Observable<EmailTemplateByIdResponse> {
    const requestUrl = `${env.api}${endpoint.EMAIL_TEMPLATE_BY_ID}${emailTemplateId}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp.data;
      })
    );
  }

  emailTemplateRegister(emailTemplate: EmailTemplateRequest): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.EMAIL_TEMPLATE_REGISTER}`;
    return this._http.post(requestUrl, emailTemplate).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  emailTemplateEdit(
    emailTemplate: EmailTemplateUpdateRequest 
  ): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.EMAIL_TEMPLATE_EDIT}`;
    return this._http.put<BaseResponse>(requestUrl, emailTemplate);
  }

  emailTemplateRemove(emailTemplateId: number): Observable<void> {
    const requestUrl = `${env.api}${endpoint.EMAIL_TEMPLATE_DELETE}${emailTemplateId}`;
    return this._http.delete(requestUrl).pipe(
      map((resp: BaseResponse) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
        }
      })
    );
  }
}
