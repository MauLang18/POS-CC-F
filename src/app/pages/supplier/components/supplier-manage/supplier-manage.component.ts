import { Component, Inject, OnInit } from "@angular/core";
import { IconsService } from "@shared/services/icons.service";
import * as configs from "../../../../../static-data/configs";
import { DocumentType } from "@shared/models/document-type.interface";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertService } from "@shared/services/alert.service";
import { SupplierService } from "../../services/supplier.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { SelectAutoComplete } from "@shared/models/select-autocomplete.interface";
import { DocumentTypeSelectService } from "@shared/services/document-type-select.service";
import { CreditTypeSelectService } from "@shared/services/credit-type-select.service";

@Component({
  selector: "vex-supplier-manage",
  templateUrl: "./supplier-manage.component.html",
  styleUrls: ["./supplier-manage.component.scss"],
})
export class SupplierManageComponent implements OnInit {
  icClose = IconsService.prototype.getIcon("icClose");
  configs = configs;

  documentTypeSelect: SelectAutoComplete[];
  creditTypeSelect: SelectAutoComplete[];
  form: FormGroup;

  initForm(): void {
    this.form = this._fb.group({
      supplierId: [0, [Validators.required]],
      documentTypeId: [0, [Validators.required]],
      documentNumber: ["", [Validators.required]],
      name: ["", [Validators.required]],
      email: ["", [Validators.required]],
      contactName: ["", [Validators.required]],
      phone: ["", [Validators.required]],
      address: ["", [Validators.required]],
      state: ["", [Validators.required]],
    });
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _supplierService: SupplierService,
    private _documentTypeSelectService: DocumentTypeSelectService,
    private _creditTypeSelectService: CreditTypeSelectService,
    public _dialogRef: MatDialogRef<SupplierManageComponent>
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.listSelectCreditType();
    this.listSelectDocumentType();
    if (this.data != null) {
      this.supplierById(this.data.data.supplierId);
    }
  }

  listSelectDocumentType(): void {
    this._documentTypeSelectService
      .listSelectDocumentTypes()
      .subscribe((resp) => {
        this.documentTypeSelect = resp;
      });
  }

  listSelectCreditType(): void {
    this._creditTypeSelectService.listSelectCreditTypes().subscribe((resp) => {
      this.creditTypeSelect = resp;
    });
  }

  supplierById(supplierId: number): void {
    this._supplierService.supplierById(supplierId).subscribe((resp) => {
      this.form.reset({
        supplierId: resp.supplierId,
        documentTypeId: resp.documentTypeId,
        documentNumber: resp.documentNumber,
        name: resp.name,
        email: resp.email,
        contactName: resp.contactName,
        phone: resp.phone,
        address: resp.address,
        state: resp.state,
      });
    });
  }

  supplierSave(): void {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      });
    }

    const supplierId = this.form.get("supplierId").value;

    if (supplierId > 0) {
      this.supplierEdit();
    } else {
      this.supplierRegister();
    }
  }

  supplierRegister(): void {
    this._supplierService
      .supplierRegister(this.form.value)
      .subscribe((resp) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
          this._dialogRef.close(true);
        } else {
          this._alert.warn("Atención", resp.message);
        }
      });
  }

  supplierEdit(): void {
    this._supplierService.supplierEdit(this.form.value).subscribe((resp) => {
      if (resp.isSuccess) {
        this._alert.success("Excelente", resp.message);
        this._dialogRef.close(true);
      }
    });
  }
}
