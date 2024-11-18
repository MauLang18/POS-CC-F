import { Component, Inject, OnInit } from "@angular/core";
import { IconsService } from "@shared/services/icons.service";
import * as configs from "../../../../../static-data/configs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertService } from "@shared/services/alert.service";
import { PaymentMethodService } from "../../services/payment-method.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { SelectAutoComplete } from "@shared/models/select-autocomplete.interface";
import { TemplateTypeSelectService } from "@shared/services/template-type-select.service";

@Component({
  selector: "vex-payment-method-manage",
  templateUrl: "./payment-method-manage.component.html",
  styleUrls: ["./payment-method-manage.component.scss"],
})
export class PaymentMethodManageComponent implements OnInit {
  icClose = IconsService.prototype.getIcon("icClose");
  configs = configs;

  emailTypeSelect: SelectAutoComplete[];
  templateTypeSelect: SelectAutoComplete[];
  form: FormGroup;

  initForm(): void {
    this.form = this._fb.group({
      paymentMethodId: [0, [Validators.required]],
      name: ["", [Validators.required]],
      state: ["", [Validators.required]],
    });
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _paymentMethodService: PaymentMethodService,
    private _templateTypeSelectService: TemplateTypeSelectService,
    public _dialogRef: MatDialogRef<PaymentMethodManageComponent>
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.listSelectTemplateType();
    if (this.data != null) {
      this.paymentMethodById(this.data.data.paymentMethodId);
    }
  }

  listSelectTemplateType(): void {
    this._templateTypeSelectService
      .listSelectTemplateTypes()
      .subscribe((resp) => {
        this.templateTypeSelect = resp;
      });
  }

  paymentMethodById(paymentMethodId: number): void {
    this._paymentMethodService
      .paymentMethodById(paymentMethodId)
      .subscribe((resp) => {
        this.form.reset({
          paymentMethodId: resp.paymentMethodId,
          name: resp.name,
          state: resp.state,
        });
      });
  }

  paymentMethodSave(): void {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      });
    }

    const paymentMethodId = this.form.get("paymentMethodId").value;

    if (paymentMethodId > 0) {
      this.paymentMethodEdit();
    } else {
      this.paymentMethodRegister();
    }
  }

  paymentMethodRegister(): void {
    this._paymentMethodService
      .paymentMethodRegister(this.form.value)
      .subscribe((resp) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
          this._dialogRef.close(true);
        } else {
          this._alert.warn("Atención", resp.message);
        }
      });
  }

  paymentMethodEdit(): void {
    this._paymentMethodService
      .paymentMethodEdit(this.form.value)
      .subscribe((resp) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
          this._dialogRef.close(true);
        }
      });
  }
}
