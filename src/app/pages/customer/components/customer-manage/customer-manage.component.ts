import { Component, Inject, OnInit } from "@angular/core";
import { IconsService } from "@shared/services/icons.service";
import * as configs from "../../../../../static-data/configs";
import { DocumentType } from "@shared/models/document-type.interface";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertService } from "@shared/services/alert.service";
import { CustomerService } from "../../services/customer.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { SelectAutoComplete } from "@shared/models/select-autocomplete.interface";
import { DocumentTypeSelectService } from "@shared/services/document-type-select.service";
import { CreditTypeSelectService } from "@shared/services/credit-type-select.service";

@Component({
  selector: "vex-customer-manage",
  templateUrl: "./customer-manage.component.html",
  styleUrls: ["./customer-manage.component.scss"],
})
export class CustomerManageComponent implements OnInit {
  icClose = IconsService.prototype.getIcon("icClose");
  configs = configs;

  documentTypeSelect: SelectAutoComplete[];
  creditTypeSelect: SelectAutoComplete[];
  form: FormGroup;

  initForm(): void {
    this.form = this._fb.group({
      customerId: [0, [Validators.required]],
      documentTypeId: [0, [Validators.required]],
      documentNumber: ["", [Validators.required]],
      name: ["", [Validators.required]],
      email: ["", [Validators.required]],
      contactName: ["", [Validators.required]],
      phone: ["", [Validators.required]],
      address: ["", [Validators.required]],
      creditTypeId: [0, [Validators.required]],
      discountPercent: [0.0, [Validators.required]],
      creditInterestRate: [0.0, [Validators.required]],
      creditLimit: [0.0, [Validators.required]],
      state: ["", [Validators.required]],
    });
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _customerService: CustomerService,
    private _documentTypeSelectService: DocumentTypeSelectService,
    private _creditTypeSelectService: CreditTypeSelectService,
    public _dialogRef: MatDialogRef<CustomerManageComponent>
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.listSelectCreditType();
    this.listSelectDocumentType();
    if (this.data != null) {
      this.customerById(this.data.data.customerId);
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

  customerById(customerId: number): void {
    this._customerService.customerById(customerId).subscribe((resp) => {
      this.form.reset({
        customerId: resp.customerId,
        documentTypeId: resp.documentTypeId,
        documentNumber: resp.documentNumber,
        name: resp.name,
        email: resp.email,
        contactName: resp.contactName,
        phone: resp.phone,
        address: resp.address,
        creditTypeId: resp.creditTypeId,
        discountPercent: resp.discountPercent,
        creditInterestRate: resp.creditInterestRate,
        creditLimit: resp.creditLimit,
        state: resp.state,
      });
    });
  }

  customerSave(): void {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      });
    }

    const customerId = this.form.get("customerId").value;

    if (customerId > 0) {
      this.customerEdit();
    } else {
      this.customerRegister();
    }
  }

  customerRegister(): void {
    this._customerService
      .customerRegister(this.form.value)
      .subscribe((resp) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
          this._dialogRef.close(true);
        } else {
          this._alert.warn("Atención", resp.message);
        }
      });
  }

  customerEdit(): void {
    this._customerService.customerEdit(this.form.value).subscribe((resp) => {
      if (resp.isSuccess) {
        this._alert.success("Excelente", resp.message);
        this._dialogRef.close(true);
      }
    });
  }
}
