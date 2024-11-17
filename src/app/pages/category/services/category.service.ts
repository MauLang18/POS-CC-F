import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { endpoint } from "@shared/apis/endpoint";
import { getIcon } from "@shared/functions/helpers";
import { BaseResponse } from "@shared/models/base-api-response.interface";
import { AlertService } from "@shared/services/alert.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment as env } from "src/environments/environment";
import { CategoryRequest, CategoryUpdateRequest } from "../models/category-request.interface";
import {
  CategoryByIdResponse,
  CategoryResponse,
} from "../models/category-response.interface";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private _http: HttpClient, private _alert: AlertService) {}

  GetAll(
    size: string,
    sort: string,
    order: string,
    page: number,
    getInputs: string
  ): Observable<BaseResponse> {
    const requestUrl = `${env.api}${
      endpoint.LIST_CATEGORIES
    }?records=${size}&sort=${sort}&order=${order}&numPage=${
      page + 1
    }${getInputs}`;

    return this._http.get<BaseResponse>(requestUrl).pipe(
      map((resp: BaseResponse) => {
        resp.data.forEach(function (prov: CategoryResponse) {
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
          prov.icEdit = getIcon("icEdit", "Editar Categoria", true);
          prov.icDelete = getIcon("icDelete", "Eliminar Categoria", true);
        });
        return resp;
      })
    );
  }

  categoryById(categoryId: number): Observable<CategoryByIdResponse> {
    const requestUrl = `${env.api}${endpoint.CATEGORY_BY_ID}${categoryId}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp.data;
      })
    );
  }

  categoryRegister(category: CategoryRequest): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.CATEGORY_REGISTER}`;
    return this._http.post(requestUrl, category).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  categoryEdit(
    category: CategoryUpdateRequest 
  ): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.CATEGORY_EDIT}`;
    return this._http.put<BaseResponse>(requestUrl, category);
  }

  categoryRemove(categoryId: number): Observable<void> {
    const requestUrl = `${env.api}${endpoint.CATEGORY_DELETE}${categoryId}`;
    return this._http.delete(requestUrl).pipe(
      map((resp: BaseResponse) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
        }
      })
    );
  }
}
