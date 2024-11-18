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
  LicenseTypeRequest,
  LicenseTypeUpdateRequest,
} from "../models/license-type-request.interface";
import {
  LicenseTypeByIdResponse,
  LicenseTypeResponse,
} from "../models/license-type-response.interface";

@Injectable({
  providedIn: "root",
})
export class LicenseTypeService {
  constructor(private _http: HttpClient, private _alert: AlertService) {}

  GetAll(
    size: string,
    sort: string,
    order: string,
    page: number,
    getInputs: string
  ): Observable<BaseResponse> {
    const requestUrl = `${env.api}${
      endpoint.LIST_LICENSE_TYPES
    }?records=${size}&sort=${sort}&order=${order}&numPage=${
      page + 1
    }${getInputs}`;

    return this._http.get<BaseResponse>(requestUrl).pipe(
      map((resp: BaseResponse) => {
        resp.data.forEach(function (prov: LicenseTypeResponse) {
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
          prov.icEdit = getIcon("icEdit", "Editar Tipos de Licenseo", true);
          prov.icDelete = getIcon(
            "icDelete",
            "Eliminar Tipos de Licencias",
            true
          );
        });
        return resp;
      })
    );
  }

  licenseTypeById(licenseTypeId: number): Observable<LicenseTypeByIdResponse> {
    const requestUrl = `${env.api}${endpoint.LICENSE_TYPE_BY_ID}${licenseTypeId}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp.data;
      })
    );
  }

  licenseTypeRegister(
    licenseType: LicenseTypeRequest
  ): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.LICENSE_TYPE_REGISTER}`;
    return this._http.post(requestUrl, licenseType).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  licenseTypeEdit(
    licenseType: LicenseTypeUpdateRequest
  ): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.LICENSE_TYPE_EDIT}`;
    return this._http.put<BaseResponse>(requestUrl, licenseType);
  }

  licenseTypeRemove(licenseTypeId: number): Observable<void> {
    const requestUrl = `${env.api}${endpoint.LICENSE_TYPE_DELETE}${licenseTypeId}`;
    return this._http.delete(requestUrl).pipe(
      map((resp: BaseResponse) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
        }
      })
    );
  }
}
