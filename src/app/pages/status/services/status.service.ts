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
  StatusRequest,
  StatusUpdateRequest,
} from "../models/status-request.interface";
import {
  StatusByIdResponse,
  StatusResponse,
} from "../models/status-response.interface";

@Injectable({
  providedIn: "root",
})
export class StatusService {
  constructor(private _http: HttpClient, private _alert: AlertService) {}

  GetAll(
    size: string,
    sort: string,
    order: string,
    page: number,
    getInputs: string
  ): Observable<BaseResponse> {
    const requestUrl = `${env.api}${
      endpoint.LIST_STATUSES
    }?records=${size}&sort=${sort}&order=${order}&numPage=${
      page + 1
    }${getInputs}`;

    return this._http.get<BaseResponse>(requestUrl).pipe(
      map((resp: BaseResponse) => {
        resp.data.forEach(function (prov: StatusResponse) {
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
          prov.icEdit = getIcon("icEdit", "Editar Status", true);
          prov.icDelete = getIcon("icDelete", "Eliminar Status", true);
        });
        return resp;
      })
    );
  }

  statusById(statusId: number): Observable<StatusByIdResponse> {
    const requestUrl = `${env.api}${endpoint.STATUS_BY_ID}${statusId}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp.data;
      })
    );
  }

  statusRegister(status: StatusRequest): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.STATUS_REGISTER}`;
    return this._http.post(requestUrl, status).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  statusEdit(status: StatusUpdateRequest): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.STATUS_EDIT}`;
    return this._http.put<BaseResponse>(requestUrl, status);
  }

  statusRemove(statusId: number): Observable<void> {
    const requestUrl = `${env.api}${endpoint.STATUS_DELETE}${statusId}`;
    return this._http.delete(requestUrl).pipe(
      map((resp: BaseResponse) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
        }
      })
    );
  }
}
