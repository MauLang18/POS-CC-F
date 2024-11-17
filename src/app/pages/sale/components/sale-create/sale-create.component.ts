import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { RowClick } from "@shared/models/row-click.interface";
import { FiltersBox } from "@shared/models/search-options.interface";
import { SelectAutoComplete } from "@shared/models/select-autocomplete.interface";
import { IconsService } from "@shared/services/icons.service";
//import { ClientSelectService } from "@shared/services/client-select.service";
//import { WarehouseSelectService } from "@shared/services/warehouse-select.service";
import { fadeInRight400ms } from "src/@vex/animations/fade-in-right.animation";
import { scaleIn400ms } from "src/@vex/animations/scale-in.animation";
import {
  ProductDetailsResponse,
  SaleByIdResponse,
} from "../../models/sale-response.interface";
import { SaleDetailService } from "../../services/sale-detail.service";
import { componentSettings } from "../sale-list/sale-list-config";
import { SaleRequest } from "../../models/sale-request.interface";
import { SaleService } from "../../services/sale.service";
import { AlertService } from "@shared/services/alert.service";
import { Observable } from "rxjs";
//import { VoucherDocumentTypeService } from "@shared/services/voucher-document-type.service";
import { VoucherDocumentType } from "@shared/models/voucher-document-type.interface";

@Component({
  selector: "vex-sale-create",
  templateUrl: "./sale-create.component.html",
  styleUrls: ["./sale-create.component.scss"],
  animations: [scaleIn400ms, fadeInRight400ms],
})
export class SaleCreateComponent implements OnInit {
  componentsaleDetail;

  voucherDocumentTypes: VoucherDocumentType[];
  clientSelect: SelectAutoComplete[];
  voucherSelect: SelectAutoComplete[];
  warehouseSelect: SelectAutoComplete[];
  form: FormGroup;
  numRecordsProducts: number = 3;

  icsale = IconsService.prototype.getIcon("icSales");
  icRemove = IconsService.prototype.getIcon("icDelete");

  cartDetails: any | ProductDetailsResponse[] = [];

  subtotal: number = 0;
  iva: number = 0;
  total: number = 0;

  saleId: number = 0;
  viewDetailRead: boolean = false;

  initForm(): void {
    this.form = this._fb.group({
      clientId: ["", Validators.required],
      warehouseId: ["", Validators.required],
      voucherDocumentTypeId: ["", Validators.required],
      voucherNumber: ["", Validators.required],
      observation: [""],
    });
  }

  constructor(
    private _fb: FormBuilder,
    //private _clientSelectService: ClientSelectService,
    //private _voucherDocumentTypeService: VoucherDocumentTypeService,
    //private _warehouseSelectService: WarehouseSelectService,
    public _saleDetailService: SaleDetailService,
    private _route: Router,
    private _saleService: SaleService,
    private _alert: AlertService,
    private _activatedRoute: ActivatedRoute
  ) {
    this.initForm();
    this._activatedRoute.params.subscribe((params) => {
      this.saleId = params["saleId"];
    });
  }

  ngOnInit(): void {
    //this.listSelectClients();
    //this.listSelectWarehouses();
    //this.listVoucherDocumentTypes();
    this.componentsaleDetail = componentSettings;

    if (this.saleId > 0) {
      this.saleById(this.saleId);
      this.viewDetailRead = true;
    }
  }

  /*listVoucherDocumentTypes(): void {
    this._voucherDocumentTypeService
      .listVoucherDocumentTypes()
      .subscribe((resp) => {
        this.voucherDocumentTypes = resp;
      });
  }*/

  saleById(saleId: number) {
    this._saleService.saleById(saleId).subscribe((resp) => {
      this.form.reset({
        clientId: resp.clientId,
        voucherNumber: resp.voucherNumber,
        voucherDocumentTypeId: resp.voucherDocumentTypeId,
        warehouseId: resp.warehouseId,
        observation: resp.observation,
      });
      this.cartDetails = resp.saleDetails;
      this.subtotal = resp.subTotal;
      this.iva = resp.iva;
      this.total = resp.totalAmount;
    });
  }

  /*listSelectClients(): void {
    this._clientSelectService
      .listSelectClients()
      .subscribe((resp) => (this.clientSelect = resp));
  }

  listSelectWarehouses(): void {
    this._warehouseSelectService
      .listSelectWarehouses()
      .subscribe((resp) => (this.warehouseSelect = resp));
  }*/

  search(data: FiltersBox) {
    this.componentsaleDetail.filters.numFilter = data.searchValue;
    this.componentsaleDetail.filters.textFilter = data.searchData;
    this.formatGetInputs();
  }

  formatGetInputs() {
    let str = "";

    if (this.componentsaleDetail.filters.textFilter != null) {
      str += `&numFilter=${this.componentsaleDetail.filters.numFilter}&textFilter=${this.componentsaleDetail.filters.textFilter}`;
    }

    this.componentsaleDetail.getInputs = str;
  }

  rowClick(rowClick: RowClick<ProductDetailsResponse>) {
    let action = rowClick.action;
    let products = rowClick.row;

    switch (action) {
      case "addDetail":
        this.addDetail(products);
        break;
    }

    return false;
  }

  back() {
    this._route.navigate(["proceso-ventas"]);
  }

  addDetail(products: ProductDetailsResponse) {
    if (products.totalAmount <= 0) {
      return;
    }

    const productCopy = { ...products };

    const existingProduct = this.cartDetails.find(
      (item) => item.code === productCopy.code
    );

    if (existingProduct) {
      existingProduct.quantity += productCopy.quantity;
      existingProduct.totalAmount =
        existingProduct.quantity * existingProduct.unitSalePrice;
    } else {
      this.cartDetails.push(productCopy);
    }

    this.calculateSubtotal();
    this.calculateIVA();
    this.calculateTotal();
  }

  calculateSubtotal() {
    this.subtotal = this.cartDetails.reduce(
      (acc, product) => acc + product.quantity * product.unitSalePrice,
      0
    );
  }

  calculateIVA() {
    //this.iva = this.subtotal * 0.13;
    this.iva = this.subtotal * 0.0;
  }

  calculateTotal() {
    this.total = this.subtotal + this.iva;
  }

  removeFromCart(product: ProductDetailsResponse) {
    const index = this.cartDetails.indexOf(product);

    if (index !== -1) {
      this.cartDetails.splice(index, 1);
    }

    this.calculateSubtotal();
    this.calculateIVA();
    this.calculateTotal();
  }

  saleSave() {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      });
    }

    const sale: SaleRequest = {
      observation: this.form.value.observation,
      warehouseId: this.form.value.warehouseId,
      clientId: this.form.value.clientId,
      voucherDocumentTypeId: this.form.value.voucherDocumentTypeId,
      voucherNumber: this.form.value.voucherNumber,
      subtotal: this.subtotal,
      iva: this.iva,
      totalAmount: this.total,
      saleDetails: this.cartDetails.map((product: ProductDetailsResponse) => ({
        productId: product.productId,
        quantity: product.quantity,
        unitSalePrice: product.unitSalePrice,
        total: product.totalAmount,
      })),
    };

    this._saleService.saleRegister(sale).subscribe((resp) => {
      if (resp.isSuccess) {
        this._alert.success("Excelente", resp.message);
        this._route.navigate(["proceso-ventas"]);
      } else {
        this._alert.success("Atención", resp.message);
      }
    });
  }
}
