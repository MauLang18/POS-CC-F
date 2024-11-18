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
  ProductServiceRequest,
  ProductServiceUpdateRequest,
} from "../models/product-service-request.interface";
import {
  ProductServiceByIdResponse,
  ProductServiceResponse,
} from "../models/product-service-response.interface";

@Injectable({
  providedIn: "root",
})
export class ProductServiceService {
  constructor(private _http: HttpClient, private _alert: AlertService) {}

  GetAll(
    size: string,
    sort: string,
    order: string,
    page: number,
    getInputs: string
  ): Observable<BaseResponse> {
    const requestUrl = `${env.api}${
      endpoint.LIST_PRODUCT_SERVICES
    }?records=${size}&sort=${sort}&order=${order}&numPage=${
      page + 1
    }${getInputs}`;

    return this._http.get<BaseResponse>(requestUrl).pipe(
      map((resp: BaseResponse) => {
        resp.data.forEach(function (prov: ProductServiceResponse) {
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
          prov.icEdit = getIcon("icEdit", "Editar Producto o Servicio", true);
          prov.icDelete = getIcon(
            "icDelete",
            "Eliminar Producto o Servicio",
            true
          );
        });
        return resp;
      })
    );
  }

  productServiceById(
    productServiceId: number
  ): Observable<ProductServiceByIdResponse> {
    const requestUrl = `${env.api}${endpoint.PRODUCT_SERVICE_BY_ID}${productServiceId}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp.data;
      })
    );
  }

  productServiceRegister(
    productService: ProductServiceRequest
  ): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.PRODUCT_SERVICE_REGISTER}`;
    const formDataProductService =
      this._builFormDataProductService(productService);
    return this._http.post(requestUrl, formDataProductService).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  productServiceEdit(
    productService: ProductServiceUpdateRequest
  ): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.PRODUCT_SERVICE_EDIT}`;
    const formDataProductService =
      this._builFormDataProductServiceUpdate(productService);
    return this._http.put<BaseResponse>(requestUrl, formDataProductService);
  }

  productServiceRemove(productServiceId: number): Observable<void> {
    const requestUrl = `${env.api}${endpoint.PRODUCT_SERVICE_DELETE}${productServiceId}`;
    return this._http.delete(requestUrl).pipe(
      map((resp: BaseResponse) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
        }
      })
    );
  }

  private _builFormDataProductService(
    productService: ProductServiceRequest
  ): FormData {
    const formData = new FormData();
    formData.append("name", productService.name),
      formData.append("categoryId", productService.categoryId.toString()),
      formData.append("unitId", productService.unitId.toString()),
      formData.append("isService", productService.isService.toString()),
      formData.append("stockQuantity", productService.stockQuantity.toString()),
      formData.append("price", productService.price.toString()),
      formData.append("state", productService.state.toString()),
      formData.append("image", productService.image),
      formData.append("description", productService.description);

    return formData;
  }

  private _builFormDataProductServiceUpdate(
    productService: ProductServiceUpdateRequest
  ): FormData {
    const formData = new FormData();
    formData.append(
      "product-serviceId",
      productService.productServiceId.toString()
    ),
      formData.append("name", productService.name),
      formData.append("categoryId", productService.categoryId.toString()),
      formData.append("unitId", productService.unitId.toString()),
      formData.append("isService", productService.isService.toString()),
      formData.append("stockQuantity", productService.stockQuantity.toString()),
      formData.append("price", productService.price.toString()),
      formData.append("state", productService.state.toString()),
      formData.append("image", productService.image),
      formData.append("description", productService.description);

    return formData;
  }
}
