import { Component, Inject, OnInit } from "@angular/core";
import { IconsService } from "@shared/services/icons.service";
import * as configs from "../../../../../static-data/configs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertService } from "@shared/services/alert.service";
import { InvoiceService } from "../../services/invoice.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { SelectAutoComplete } from "@shared/models/select-autocomplete.interface";
import { TemplateTypeSelectService } from "@shared/services/template-type-select.service";
import { VoucherTypeSelectService } from "@shared/services/voucher-type-select.service";
import { SaleSelectService } from "@shared/services/sale-select.service";
import { StatusSelectService } from "@shared/services/status-select.service";
import { PaymentMethodSelectService } from "@shared/services/payment-method-select.service";

@Component({
  selector: "vex-invoice-manage",
  templateUrl: "./invoice-manage.component.html",
  styleUrls: ["./invoice-manage.component.scss"],
})
export class InvoiceManageComponent implements OnInit {
  icClose = IconsService.prototype.getIcon("icClose");
  configs = configs;

  voucherTypeSelect: SelectAutoComplete[];
  saleSelect: SelectAutoComplete[];
  statusSelect: SelectAutoComplete[];
  paymentMethodSelect: SelectAutoComplete[];
  form: FormGroup;

  initForm(): void {
    this.form = this._fb.group({
      invoiceId: [0, [Validators.required]],
      saleId: [0, [Validators.required]],
      voucherNumber: [{ value: '', disabled: true }],
      voucherTypeId: [0, [Validators.required]],
      statusId: [0, [Validators.required]],
      paymentMethodId: [0, [Validators.required]],
      installmentsCount: [0, [Validators.required]],
      issueDate: [this.getFormattedDate()],
      paymentDate: [this.getFormattedDate()],
    });
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _invoiceService: InvoiceService,
    private _voucherTypeSelectService: VoucherTypeSelectService,
    private _saleSelectService: SaleSelectService,
    private _statusSelectService: StatusSelectService,
    private _paymentMethodSelectService: PaymentMethodSelectService,
    public _dialogRef: MatDialogRef<InvoiceManageComponent>
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.listSelectVoucherType();
    this.listSelectSale();
    this.listSelectStatus();
    this.listSelectPaymentMethod();
    if (this.data != null) {
      this.invoiceById(this.data.data.invoiceId);
    }
  }

  listSelectVoucherType(): void {
    this._voucherTypeSelectService.listSelectVoucherTypes().subscribe((resp) => {
      this.voucherTypeSelect = resp;
    });
  }

  listSelectSale(): void {
    this._saleSelectService.listSelectSales().subscribe((resp) => {
      this.saleSelect = resp;
    });
  }

  listSelectStatus(): void {
    this._statusSelectService.listSelectStatuses().subscribe((resp) => {
      this.statusSelect = resp;
    });
  }

  listSelectPaymentMethod(): void {
    this._paymentMethodSelectService.listSelectPaymentMethod().subscribe((resp) => {
      this.paymentMethodSelect = resp;
    });
  }

  invoiceById(invoiceId: number): void {
    this._invoiceService.invoiceById(invoiceId).subscribe((resp) => {
      const issueDate = new Date(resp.issueDate);
      const paymentDate = new Date(resp.paymentDate);

      this.form.reset({
        invoiceId: resp.invoiceId,
        saleId: resp.saleId,
        voucherNumber: resp.voucherNumber,
        voucherTypeId: resp.voucherTypeId,
        statusId: resp.statusId,
        installmentsCount: resp.installmentsCount,
        paymentMethodId: resp.paymentMethodId,
        issueDate: issueDate.toISOString().slice(0, 10),
        paymentDate: paymentDate.toISOString().slice(0, 10),
      });
    });
  }

  invoiceSave(): void {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      });
    }

    const invoiceId = this.form.get("invoiceId").value;

    if (invoiceId > 0) {
      this.invoiceEdit();
    } else {
      this.invoiceRegister();
    }
  }

  invoiceRegister(): void {
    this._invoiceService
      .invoiceRegister(this.form.value)
      .subscribe((resp) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
          this._dialogRef.close(true);
        } else {
          this._alert.warn("Atención", resp.message);
        }
      });
  }

  invoiceEdit(): void {
    this._invoiceService.invoiceEdit(this.form.value).subscribe((resp) => {
      if (resp.isSuccess) {
        this._alert.success("Excelente", resp.message);
        this._dialogRef.close(true);
      }
    });
  }

  getFormattedDate(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // +1 porque enero es 0
    const day = String(now.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }
}
