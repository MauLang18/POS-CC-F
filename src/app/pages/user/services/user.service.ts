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
  UserRequest,
  UserUpdateRequest,
} from "../models/user-request.interface";
import {
  UserByIdResponse,
  UserResponse,
} from "../models/user-response.interface";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private _http: HttpClient, private _alert: AlertService) {}

  GetAll(
    size: string,
    sort: string,
    order: string,
    page: number,
    getInputs: string
  ): Observable<BaseResponse> {
    const requestUrl = `${env.api}${
      endpoint.LIST_USERS
    }?records=${size}&sort=${sort}&order=${order}&numPage=${
      page + 1
    }${getInputs}`;

    return this._http.get<BaseResponse>(requestUrl).pipe(
      map((resp: BaseResponse) => {
        resp.data.forEach(function (prov: UserResponse) {
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
          prov.icEdit = getIcon("icEdit", "Editar Usuarios", true);
          prov.icDelete = getIcon("icDelete", "Eliminar Usuarios", true);
        });
        return resp;
      })
    );
  }

  userById(userId: number): Observable<UserByIdResponse> {
    const requestUrl = `${env.api}${endpoint.USER_BY_ID}${userId}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp.data;
      })
    );
  }

  userRegister(user: UserRequest): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.USER_REGISTER}`;
    return this._http.post(requestUrl, user).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  userEdit(user: UserUpdateRequest): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.USER_EDIT}`;
    return this._http.put<BaseResponse>(requestUrl, user);
  }

  userRemove(userId: number): Observable<void> {
    const requestUrl = `${env.api}${endpoint.USER_DELETE}${userId}`;
    return this._http.delete(requestUrl).pipe(
      map((resp: BaseResponse) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
        }
      })
    );
  }
}
