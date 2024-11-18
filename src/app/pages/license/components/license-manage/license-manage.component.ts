import { Component, Inject, OnInit } from "@angular/core";
import { IconsService } from "@shared/services/icons.service";
import * as configs from "../../../../../static-data/configs";
import { DocumentType } from "@shared/models/document-type.interface";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertService } from "@shared/services/alert.service";
import { LicenseService } from "../../services/license.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { SelectAutoComplete } from "@shared/models/select-autocomplete.interface";
import { DocumentTypeSelectService } from "@shared/services/document-type-select.service";
import { CreditTypeSelectService } from "@shared/services/credit-type-select.service";
import { LicenseTypeSelectService } from "@shared/services/license-type-select.service";
import { ProjectSelectService } from "@shared/services/project-select.service";

@Component({
  selector: "vex-license-manage",
  templateUrl: "./license-manage.component.html",
  styleUrls: ["./license-manage.component.scss"],
})
export class LicenseManageComponent implements OnInit {
  icClose = IconsService.prototype.getIcon("icClose");
  configs = configs;

  licenseTypeSelect: SelectAutoComplete[];
  projectSelect: SelectAutoComplete[];
  form: FormGroup;

  initForm(): void {
    this.form = this._fb.group({
      licenseId: [0, [Validators.required]],
      licenseKey: [{ value: "", disabled: true }],
      licenseTypeId: [0, [Validators.required]],
      projectId: [0, [Validators.required]],
      issueDate: [this.getFormattedDate()],
      expirationDate: [this.getFormattedDate()],
      state: ["", [Validators.required]],
    });
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _licenseService: LicenseService,
    private _licenseTypeSelectService: LicenseTypeSelectService,
    private _projectSelectService: ProjectSelectService,
    public _dialogRef: MatDialogRef<LicenseManageComponent>
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.listSelectProject();
    this.listSelectLicenseType();
    if (this.data != null) {
      this.licenseById(this.data.data.licenseId);
    }
  }

  listSelectLicenseType(): void {
    this._licenseTypeSelectService
      .listSelectLicenseTypes()
      .subscribe((resp) => {
        this.licenseTypeSelect = resp;
      });
  }

  listSelectProject(): void {
    this._projectSelectService.listSelectProjects().subscribe((resp) => {
      this.projectSelect = resp;
    });
  }

  licenseById(licenseId: number): void {
    this._licenseService.licenseById(licenseId).subscribe((resp) => {
      const issueDate = new Date(resp.issueDate);
      const expirationDate = new Date(resp.expirationDate);

      this.form.reset({
        licenseId: resp.licenseId,
        licenseKey: resp.licenseKey,
        licenseTypeId: resp.licenseTypeId,
        projectId: resp.projectId,
        issueDate: issueDate.toISOString().slice(0, 10),
        expirationDate: expirationDate.toISOString().slice(0, 10),
        state: resp.state,
      });
    });
  }

  licenseSave(): void {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      });
    }

    const licenseId = this.form.get("licenseId").value;

    if (licenseId > 0) {
      this.licenseEdit();
    } else {
      this.licenseRegister();
    }
  }

  licenseRegister(): void {
    this._licenseService.licenseRegister(this.form.value).subscribe((resp) => {
      if (resp.isSuccess) {
        this._alert.success("Excelente", resp.message);
        this._dialogRef.close(true);
      } else {
        this._alert.warn("Atención", resp.message);
      }
    });
  }

  licenseEdit(): void {
    this._licenseService.licenseEdit(this.form.value).subscribe((resp) => {
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
