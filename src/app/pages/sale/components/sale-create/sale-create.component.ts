import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { RowClick } from "@shared/models/row-click.interface";
import { FiltersBox } from "@shared/models/search-options.interface";
import { SelectAutoComplete } from "@shared/models/select-autocomplete.interface";
import { IconsService } from "@shared/services/icons.service";
import { fadeInRight400ms } from "src/@vex/animations/fade-in-right.animation";
import { scaleIn400ms } from "src/@vex/animations/scale-in.animation";
import {
  ProductDetailsResponse,
  SaleByIdResponse,
  SaleResponse,
} from "../../models/sale-response.interface";
import { SaleDetailService } from "../../services/sale-detail.service";
import { componentSettings } from "../sale-list/sale-list-config";
import { SaleService } from "../../services/sale.service";
import { AlertService } from "@shared/services/alert.service";
import { VoucherTypeSelectService } from "@shared/services/voucher-type-select.service";
import { CustomerSelectService } from "@shared/services/customer-select.service";
import { PaymentMethodSelectService } from "@shared/services/payment-method-select.service";
import { StatusSelectService } from "@shared/services/status-select.service";
import { CustomerService } from "src/app/pages/customer/services/customer.service";
import { SaleRequest } from "../../models/sale-request.interface";
import { ProjectSelectService } from "@shared/services/project-select.service";
import { QuoteSelectService } from "@shared/services/quote-select.service";
import { QuoteService } from "src/app/pages/quote/services/quote.service";

@Component({
  selector: "vex-sale-create",
  templateUrl: "./sale-create.component.html",
  styleUrls: ["./sale-create.component.scss"],
  animations: [scaleIn400ms, fadeInRight400ms],
})
export class SaleCreateComponent implements OnInit {
  componentsaleDetail;

  customerSelect: SelectAutoComplete[];
  voucherTypeSelect: SelectAutoComplete[];
  projectSelect: SelectAutoComplete[];
  statusSelect: SelectAutoComplete[];
  quoteSelect: SelectAutoComplete[];

  form: FormGroup;
  numRecordsProducts: number = 3;

  icsale = IconsService.prototype.getIcon("icSales");
  icRemove = IconsService.prototype.getIcon("icDelete");

  cartDetails: any | ProductDetailsResponse[] = [];

  subtotal: number = 0;
  discount: number = 0;
  iva: number = 0;
  total: number = 0;

  saleId: number = 0;
  viewDetailRead: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _voucherTypeSelectService: VoucherTypeSelectService,
    private _customerSelectService: CustomerSelectService,
    private _projectSelectService: ProjectSelectService,
    private _statusSelectService: StatusSelectService,
    private _customerService: CustomerService,
    private _quoteSelectService: QuoteSelectService,
    private _quoteService: QuoteService,
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
    this.listVoucherTypes();
    this.listCustomer();
    this.listProject();
    this.listStatus();
    this.listQuote();
    this.componentsaleDetail = componentSettings;

    if (this.saleId > 0) {
      this.saleById(this.saleId);
      this.viewDetailRead = true;
    }

    // Escuchar cambios en el cliente seleccionado para actualizar descuento
    this.form.get("customerId")?.valueChanges.subscribe((customerId) => {
      if (customerId) {
        this._customerService
          .customerById(customerId)
          .subscribe((customerData) => {
            // Deserializamos la respuesta para obtener el descuento
            const discountPercent = customerData.discountPercent || 0;
            this.form.patchValue({ discountPercent });
            this.calculateSubtotal();
            this.calculateIVA();
            this.calculateTotal(); // Recalcula el total al cambiar el cliente
          });
      }
    });

    this.form.get("quoteId")?.valueChanges.subscribe((quoteId) => {
      if (quoteId) {
        this._quoteService.quoteById(quoteId).subscribe((quoteData) => {
          this.cartDetails = quoteData.quoteDetails.map((detail) => ({
            ...detail,
            total: detail.quantity * detail.price,
          }));
          this.calculateSubtotal();
          this.calculateIVA();
          this.calculateTotal();
        });
      }
    });
  }

  initForm(): void {
    this.form = this._fb.group({
      customerId: [0, Validators.required],
      voucherTypeId: [0, Validators.required],
      projectId: [],
      quoteId: [],
      statusId: [0, Validators.required],
      voucherNumber: [{ value: "", disabled: true }],
      applyIVA: [0, Validators.required],
      discountPercent: [0],
      observation: [""],
    });
  }

  listVoucherTypes(): void {
    this._voucherTypeSelectService
      .listSelectVoucherTypes()
      .subscribe((resp) => {
        this.voucherTypeSelect = resp;
      });
  }

  listCustomer(): void {
    this._customerSelectService.listSelectCustomers().subscribe((resp) => {
      this.customerSelect = resp;
    });
  }

  listProject(): void {
    this._projectSelectService.listSelectProjects().subscribe((resp) => {
      this.projectSelect = resp;
    });
  }

  listQuote(): void {
    this._quoteSelectService.listSelectQuotes().subscribe((resp) => {
      this.quoteSelect = resp;
    });
  }

  listStatus(): void {
    this._statusSelectService.listSelectStatuses().subscribe((resp) => {
      this.statusSelect = resp;
    });
  }

  saleById(saleId: number) {
    this._saleService.saleById(saleId).subscribe((resp) => {
      this.form.reset({
        customerId: resp.customerId,
        voucherTypeId: resp.voucherTypeId,
        projectId: resp.projectId,
        quoteId: resp.quoteId,
        voucherNumber: resp.voucherNumber,
        paymentMethodId: resp.paymentMethodId,
        statusId: resp.statusId,
        applyIVA: resp.applyIVA,
        observation: resp.observation,
      });
      this.cartDetails = resp.saleDetails;
      this.subtotal = resp.subTotal;
      this.discount = resp.discount;
      this.iva = resp.iva;
      this.total = resp.total;
    });
  }

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
    this._route.navigate(["proceso-venta"]);
  }

  addDetail(products: ProductDetailsResponse) {
    if (products.total <= 0) {
      return;
    }

    const productCopy = { ...products };

    const existingProduct = this.cartDetails.find(
      (item) => item.code === productCopy.code
    );

    if (existingProduct) {
      existingProduct.quantity += productCopy.quantity;
      existingProduct.total = existingProduct.quantity * existingProduct.price;
    } else {
      this.cartDetails.push(productCopy);
    }

    this.calculateSubtotal();
    this.calculateIVA();
    this.calculateTotal();
    this.calculateDiscount();
  }

  calculateSubtotal() {
    this.subtotal = this.cartDetails.reduce(
      (acc, product) => acc + product.quantity * product.price,
      0
    );
  }

  calculateIVA() {
    if (this.form.value.applyIva === 1) {
      this.iva = this.subtotal * 0.13;
    } else {
      this.iva = 0;
    }
  }

  calculateDiscount() {
    const discountPercent = this.form.value.discountPercent || 0;
    this.discount = this.subtotal * (discountPercent / 100);
  }

  calculateTotal() {
    this.calculateDiscount();
    this.calculateIVA();
    this.total = this.subtotal - this.discount + this.iva;
  }

  removeFromCart(product: ProductDetailsResponse) {
    const index = this.cartDetails.indexOf(product);

    if (index !== -1) {
      this.cartDetails.splice(index, 1);
    }

    this.calculateSubtotal();
    this.calculateTotal();
    this.calculateIVA();
    this.calculateDiscount();
  }

  saleSave() {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAsTouched();
      });
    }

    const sale: SaleRequest = {
      voucherTypeId: this.form.value.voucherTypeId,
      customerId: this.form.value.customerId,
      quoteId: this.form.value.quoteId,
      projectId: this.form.value.projectId,
      observation: this.form.value.observation,
      subtotal: this.subtotal,
      applyIVA: this.form.value.applyIVA,
      iva: this.iva,
      discount: this.discount,
      total: this.total,
      statusId: this.form.value.statusId,
      saleDetails: this.cartDetails.map((product: ProductDetailsResponse) => ({
        productServiceId: product.productServiceId,
        quantity: product.quantity,
        price: product.price,
        total: product.total,
      })),
    };

    this._saleService.saleRegister(sale).subscribe((resp) => {
      if (resp.isSuccess) {
        this._alert.success("Excelente", resp.message);
        this._route.navigate(["proceso-venta"]);
      } else {
        this._alert.warn("Atención", resp.message);
      }
    });
  }
}
