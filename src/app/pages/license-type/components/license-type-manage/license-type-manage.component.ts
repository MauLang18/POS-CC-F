import { Component, Inject, OnInit } from "@angular/core";
import { IconsService } from "@shared/services/icons.service";
import * as configs from "../../../../../static-data/configs";
import { DocumentType } from "@shared/models/document-type.interface";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertService } from "@shared/services/alert.service";
import { LicenseTypeService } from "../../services/license-type.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "vex-license-type-manage",
  templateUrl: "./license-type-manage.component.html",
  styleUrls: ["./license-type-manage.component.scss"],
})
export class LicenseTypeManageComponent implements OnInit {
  icClose = IconsService.prototype.getIcon("icClose");
  configs = configs;

  documentTypes: DocumentType[];
  form: FormGroup;

  initForm(): void {
    this.form = this._fb.group({
      licenseTypeId: [0, [Validators.required]],
      name: ["", [Validators.required]],
      description: ["", [Validators.required]],
      state: ["", [Validators.required]],
    });
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _licenseTypeService: LicenseTypeService,
    public _dialogRef: MatDialogRef<LicenseTypeManageComponent>
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    if (this.data != null) {
      this.licenseTypeById(this.data.data.licenseTypeId);
    }
  }

  licenseTypeById(licenseTypeId: number): void {
    this._licenseTypeService
      .licenseTypeById(licenseTypeId)
      .subscribe((resp) => {
        this.form.reset({
          licenseTypeId: resp.licenseTypeId,
          name: resp.name,
          description: resp.description,
          state: resp.state,
        });
      });
  }

  licenseTypeSave(): void {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      });
    }

    const licenseTypeId = this.form.get("licenseTypeId").value;

    if (licenseTypeId > 0) {
      this.licenseTypeEdit();
    } else {
      this.licenseTypeRegister();
    }
  }

  licenseTypeRegister(): void {
    this._licenseTypeService
      .licenseTypeRegister(this.form.value)
      .subscribe((resp) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
          this._dialogRef.close(true);
        } else {
          this._alert.warn("Atención", resp.message);
        }
      });
  }

  licenseTypeEdit(): void {
    this._licenseTypeService
      .licenseTypeEdit(this.form.value)
      .subscribe((resp) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
          this._dialogRef.close(true);
        }
      });
  }
}
