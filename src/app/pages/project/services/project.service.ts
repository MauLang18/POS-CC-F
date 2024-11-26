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
  ProjectRequest,
  ProjectUpdateRequest,
} from "../models/project-request.interface";
import {
  ProjectByIdResponse,
  ProjectResponse,
} from "../models/project-response.interface";

@Injectable({
  providedIn: "root",
})
export class ProjectService {
  constructor(private _http: HttpClient, private _alert: AlertService) {}

  GetAll(
    size: string,
    sort: string,
    order: string,
    page: number,
    getInputs: string
  ): Observable<BaseResponse> {
    const requestUrl = `${env.api}${
      endpoint.LIST_PROJECTS
    }?records=${size}&sort=${sort}&order=${order}&numPage=${
      page + 1
    }${getInputs}`;

    return this._http.get<BaseResponse>(requestUrl).pipe(
      map((resp: BaseResponse) => {
        resp.data.forEach(function (prov: ProjectResponse) {
          // switch (prov.state) {
          //   case 0:
          //     prov.badgeColor = "text-gray bg-gray-light";
          //     break;
          //   case 1:
          //     prov.badgeColor = "text-green bg-green-light";
          //     break;
          //   default:
          //     prov.badgeColor = "text-gray bg-gray-light";
          //     break;
          // }
          prov.icEdit = getIcon("icEdit", "Editar Proyecto", true);
          prov.icDelete = getIcon("icDelete", "Eliminar Proyecto", true);
        });
        return resp;
      })
    );
  }

  projectById(projectId: number): Observable<ProjectByIdResponse> {
    const requestUrl = `${env.api}${endpoint.PROJECT_BY_ID}${projectId}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp.data;
      })
    );
  }

  projectRegister(project: ProjectRequest): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.PROJECT_REGISTER}`;
    return this._http.post(requestUrl, project).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  projectEdit(project: ProjectUpdateRequest): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.PROJECT_EDIT}`;
    return this._http.put<BaseResponse>(requestUrl, project);
  }

  projectRemove(projectId: number): Observable<void> {
    const requestUrl = `${env.api}${endpoint.PROJECT_DELETE}${projectId}`;
    return this._http.delete(requestUrl).pipe(
      map((resp: BaseResponse) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
        }
      })
    );
  }
}
