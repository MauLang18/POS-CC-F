import { Component, Inject, OnInit } from "@angular/core";
import { IconsService } from "@shared/services/icons.service";
import * as configs from "../../../../../static-data/configs";
import { DocumentType } from "@shared/models/document-type.interface";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertService } from "@shared/services/alert.service";
import { CreditTypeService } from "../../services/credit-type.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "vex-credit-type-manage",
  templateUrl: "./credit-type-manage.component.html",
  styleUrls: ["./credit-type-manage.component.scss"],
})
export class CreditTypeManageComponent implements OnInit {
  icClose = IconsService.prototype.getIcon("icClose");
  configs = configs;

  documentTypes: DocumentType[];
  form: FormGroup;

  initForm(): void {
    this.form = this._fb.group({
      creditTypeId: [0, [Validators.required]],
      name: ["", [Validators.required]],
      description: ["", [Validators.required]],
      state: ["", [Validators.required]],
    });
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _creditTypeService: CreditTypeService,
    public _dialogRef: MatDialogRef<CreditTypeManageComponent>,
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    if (this.data != null) {
      this.creditTypeById(this.data.data.creditTypeId);
    }
  }

  creditTypeById(creditTypeId: number): void {
    this._creditTypeService.creditTypeById(creditTypeId).subscribe((resp) => {
      this.form.reset({
        creditTypeId: resp.creditTypeId,
        name: resp.name,
        description: resp.description,
        state: resp.state,
      });
    });
  }

  creditTypeSave(): void {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      });
    }

    const creditTypeId = this.form.get("creditTypeId").value;

    if (creditTypeId > 0) {
      this.creditTypeEdit();
    } else {
      this.creditTypeRegister();
    }
  }

  creditTypeRegister(): void {
    this._creditTypeService
      .creditTypeRegister(this.form.value)
      .subscribe((resp) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
          this._dialogRef.close(true);
        } else {
          this._alert.warn("Atención", resp.message);
        }
      });
  }

  creditTypeEdit(): void {
    this._creditTypeService
      .creditTypeEdit(this.form.value)
      .subscribe((resp) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
          this._dialogRef.close(true);
        }
      });
  }
}
