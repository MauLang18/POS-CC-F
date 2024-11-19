import { Component, Inject, OnInit } from "@angular/core";
import { IconsService } from "@shared/services/icons.service";
import * as configs from "../../../../../static-data/configs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertService } from "@shared/services/alert.service";
import { SaleService } from "../../services/sale.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { SelectAutoComplete } from "@shared/models/select-autocomplete.interface";
import { StatusSelectService } from "@shared/services/status-select.service";

@Component({
  selector: "vex-sale-change",
  templateUrl: "./sale-change.component.html",
  styleUrls: ["./sale-change.component.scss"],
})
export class SaleChangeComponent implements OnInit {
  icClose = IconsService.prototype.getIcon("icClose");
  configs = configs;

  statusSelect: SelectAutoComplete[];
  form: FormGroup;

  initForm(): void {
    this.form = this._fb.group({
      saleId: [0, [Validators.required]],
      voucherNumber: [{ value: "", disabled: true }],
      statusId: [0, [Validators.required]],
    });
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _saleService: SaleService,
    private _statusSelectService: StatusSelectService,
    public _dialogRef: MatDialogRef<SaleChangeComponent>
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.listSelectStatus();
    if (this.data != null) {
      this.saleById(this.data.data.saleId);
    }
  }

  listSelectStatus(): void {
    this._statusSelectService.listSelectStatuses().subscribe((resp) => {
      this.statusSelect = resp;
    });
  }

  saleById(saleId: number): void {
    this._saleService.saleById(saleId).subscribe((resp) => {
      this.form.reset({
        saleId: resp.saleId,
        voucherNumber: resp.voucherNumber,
        statusId: resp.statusId,
      });
    });
  }

  saleSave(): void {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      });
    }

    const saleId = this.form.get("saleId").value;

    if (saleId > 0) {
      this.saleEdit();
    }
  }

  saleEdit(): void {
    this._saleService.saleEdit(this.form.value).subscribe((resp) => {
      if (resp.isSuccess) {
        this._alert.success("Excelente", resp.message);
        this._dialogRef.close(true);
      }
    });
  }
}
