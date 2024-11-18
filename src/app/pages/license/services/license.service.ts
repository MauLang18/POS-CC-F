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
  LicenseRequest,
  LicenseUpdateRequest,
} from "../models/license-request.interface";
import {
  LicenseByIdResponse,
  LicenseResponse,
} from "../models/license-response.interface";

@Injectable({
  providedIn: "root",
})
export class LicenseService {
  constructor(private _http: HttpClient, private _alert: AlertService) {}

  GetAll(
    size: string,
    sort: string,
    order: string,
    page: number,
    getInputs: string
  ): Observable<BaseResponse> {
    const requestUrl = `${env.api}${
      endpoint.LIST_LICENSES
    }?records=${size}&sort=${sort}&order=${order}&numPage=${
      page + 1
    }${getInputs}`;

    return this._http.get<BaseResponse>(requestUrl).pipe(
      map((resp: BaseResponse) => {
        resp.data.forEach(function (prov: LicenseResponse) {
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
          prov.icDelete = getIcon("icDelete", "Eliminar Licencia", true);
        });
        return resp;
      })
    );
  }

  licenseById(licenseId: number): Observable<LicenseByIdResponse> {
    const requestUrl = `${env.api}${endpoint.LICENSE_BY_ID}${licenseId}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp.data;
      })
    );
  }

  licenseRegister(license: LicenseRequest): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.LICENSE_REGISTER}`;
    return this._http.post(requestUrl, license).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  licenseEdit(license: LicenseUpdateRequest): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.LICENSE_EDIT}`;
    return this._http.put<BaseResponse>(requestUrl, license);
  }

  licenseRemove(licenseId: number): Observable<void> {
    const requestUrl = `${env.api}${endpoint.LICENSE_DELETE}${licenseId}`;
    return this._http.delete(requestUrl).pipe(
      map((resp: BaseResponse) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
        }
      })
    );
  }
}
