import { Component, Inject, OnInit } from "@angular/core";
import { IconsService } from "@shared/services/icons.service";
import * as configs from "../../../../../static-data/configs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertService } from "@shared/services/alert.service";
import { VoucherTypeService } from "../../services/voucher-type.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "vex-voucher-type-manage",
  templateUrl: "./voucher-type-manage.component.html",
  styleUrls: ["./voucher-type-manage.component.scss"],
})
export class VoucherTypeManageComponent implements OnInit {
  icClose = IconsService.prototype.getIcon("icClose");
  configs = configs;

  form: FormGroup;

  initForm(): void {
    this.form = this._fb.group({
      voucherTypeId: [0, [Validators.required]],
      name: ["", [Validators.required]],
      abbreviation: ["", [Validators.required]],
      state: ["", [Validators.required]],
    });
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _voucherTypeService: VoucherTypeService,
    public _dialogRef: MatDialogRef<VoucherTypeManageComponent>
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    if (this.data != null) {
      this.voucherTypeById(this.data.data.voucherTypeId);
    }
  }

  voucherTypeById(voucherTypeId: number): void {
    this._voucherTypeService
      .voucherTypeById(voucherTypeId)
      .subscribe((resp) => {
        this.form.reset({
          voucherTypeId: resp.voucherTypeId,
          name: resp.name,
          abbreviation: resp.abbreviation,
          state: resp.state,
        });
      });
  }

  voucherTypeSave(): void {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      });
    }

    const voucherTypeId = this.form.get("voucherTypeId").value;

    if (voucherTypeId > 0) {
      this.voucherTypeEdit();
    } else {
      this.voucherTypeRegister();
    }
  }

  voucherTypeRegister(): void {
    this._voucherTypeService
      .voucherTypeRegister(this.form.value)
      .subscribe((resp) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
          this._dialogRef.close(true);
        } else {
          this._alert.warn("Atención", resp.message);
        }
      });
  }

  voucherTypeEdit(): void {
    this._voucherTypeService
      .voucherTypeEdit(this.form.value)
      .subscribe((resp) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
          this._dialogRef.close(true);
        }
      });
  }
}
