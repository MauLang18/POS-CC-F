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
  QuoteByIdResponse,
  QuoteResponse,
} from "../../models/quote-response.interface";
import { QuoteDetailService } from "../../services/quote-detail.service";
import { componentSettings } from "../quote-list/quote-list-config";
import { QuoteService } from "../../services/quote.service";
import { AlertService } from "@shared/services/alert.service";
import { VoucherTypeSelectService } from "@shared/services/voucher-type-select.service";
import { CustomerSelectService } from "@shared/services/customer-select.service";
import { PaymentMethodSelectService } from "@shared/services/payment-method-select.service";
import { StatusSelectService } from "@shared/services/status-select.service";
import { CustomerService } from "src/app/pages/customer/services/customer.service";
import { QuoteRequest } from "../../models/quote-request.interface";

@Component({
  selector: "vex-quote-create",
  templateUrl: "./quote-create.component.html",
  styleUrls: ["./quote-create.component.scss"],
  animations: [scaleIn400ms, fadeInRight400ms],
})
export class QuoteCreateComponent implements OnInit {
  componentquoteDetail;

  customerSelect: SelectAutoComplete[];
  voucherTypeSelect: SelectAutoComplete[];
  paymentMethodSelect: SelectAutoComplete[];
  statusSelect: SelectAutoComplete[];

  form: FormGroup;
  numRecordsProducts: number = 3;

  icquote = IconsService.prototype.getIcon("icQuotes");
  icRemove = IconsService.prototype.getIcon("icDelete");

  cartDetails: any | ProductDetailsResponse[] = [];

  subtotal: number = 0;
  discount: number = 0;
  iva: number = 0;
  total: number = 0;

  quoteId: number = 0;
  viewDetailRead: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _voucherTypeSelectService: VoucherTypeSelectService,
    private _customerSelectService: CustomerSelectService,
    private _paymentMethodSelectService: PaymentMethodSelectService,
    private _statusSelectService: StatusSelectService,
    private _customerService: CustomerService,
    public _quoteDetailService: QuoteDetailService,
    private _route: Router,
    private _quoteService: QuoteService,
    private _alert: AlertService,
    private _activatedRoute: ActivatedRoute
  ) {
    this.initForm();
    this._activatedRoute.params.subscribe((params) => {
      this.quoteId = params["quoteId"];
    });
  }

  ngOnInit(): void {
    this.listVoucherTypes();
    this.listCustomer();
    this.listPaymentMethod();
    this.listStatus();
    this.componentquoteDetail = componentSettings;

    if (this.quoteId > 0) {
      this.quoteById(this.quoteId);
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
  }

  initForm(): void {
    this.form = this._fb.group({
      customerId: [0, Validators.required],
      paymentMethodId: [0, Validators.required],
      voucherTypeId: [0, Validators.required],
      statusId: [0, Validators.required],
      voucherNumber: [{ value: "", disabled: true }],
      applyIVA: [0, Validators.required],
      discountPercent: [0], // Campo para manejar el descuento del cliente
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

  listPaymentMethod(): void {
    this._paymentMethodSelectService
      .listSelectPaymentMethod()
      .subscribe((resp) => {
        this.paymentMethodSelect = resp;
      });
  }

  listStatus(): void {
    this._statusSelectService.listSelectStatuses().subscribe((resp) => {
      this.statusSelect = resp;
    });
  }

  quoteById(quoteId: number) {
    this._quoteService.quoteById(quoteId).subscribe((resp) => {
      this.form.reset({
        customerId: resp.customerId,
        voucherTypeId: resp.voucherTypeId,
        voucherNumber: resp.voucherNumber,
        paymentMethodId: resp.paymentMethodId,
        statusId: resp.statusId,
        applyIVA: resp.applyIVA,
        observation: resp.observation,
      });
      this.cartDetails = resp.quoteDetails;
      this.subtotal = resp.subTotal;
      this.discount = resp.discount;
      this.iva = resp.iva;
      this.total = resp.total;
    });
  }

  search(data: FiltersBox) {
    this.componentquoteDetail.filters.numFilter = data.searchValue;
    this.componentquoteDetail.filters.textFilter = data.searchData;
    this.formatGetInputs();
  }

  formatGetInputs() {
    let str = "";

    if (this.componentquoteDetail.filters.textFilter != null) {
      str += `&numFilter=${this.componentquoteDetail.filters.numFilter}&textFilter=${this.componentquoteDetail.filters.textFilter}`;
    }

    this.componentquoteDetail.getInputs = str;
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
    this._route.navigate(["proceso-cotizacion"]);
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

  quoteSave() {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAsTouched();
      });
    }

    const quote: QuoteRequest = {
      voucherTypeId: this.form.value.voucherTypeId,
      customerId: this.form.value.customerId,
      paymentMethodId: this.form.value.paymentMethodId,
      observation: this.form.value.observation,
      subtotal: this.subtotal,
      applyIVA: this.form.value.applyIVA,
      iva: this.iva,
      discount: this.discount,
      total: this.total,
      statusId: this.form.value.statusId,
      quoteDetails: this.cartDetails.map((product: ProductDetailsResponse) => ({
        productServiceId: product.productServiceId,
        quantity: product.quantity,
        price: product.price,
        total: product.total,
      })),
    };

    this._quoteService.quoteRegister(quote).subscribe((resp) => {
      if (resp.isSuccess) {
        this._alert.success("Excelente", resp.message);
        this._alert.confirm({
          title: "¿Qué acción deseas realizar?",
          message:
            "¿Quieres solo descargar el archivo o descargar y enviarlo por correo?",
          buttons: [
            {
              text: "Solo descargar",
              action: () => {
                this.downloadQuoteReport(resp.data);
              },
            },
            {
              text: "Descargar y enviar por correo",
              action: () => {
                this.downloadAndSendQuoteEmailReport(resp.data);
              },
            },
          ],
        });
      } else {
        this._alert.warn("Atención", resp.message);
      }
    });
  }

  downloadQuoteReport(quote: QuoteResponse) {
    this._quoteService.quoteReport(quote);
  }

  downloadAndSendQuoteEmailReport(quote: QuoteResponse) {
    this._quoteService.quoteEmailReport(quote);
  }
}
