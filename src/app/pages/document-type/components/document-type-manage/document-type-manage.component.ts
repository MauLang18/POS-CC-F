import { Component, Inject, OnInit } from "@angular/core";
import { IconsService } from "@shared/services/icons.service";
import * as configs from "../../../../../static-data/configs";
import { DocumentType } from "@shared/models/document-type.interface";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertService } from "@shared/services/alert.service";
import { DocumentTypeService } from "../../services/document-type.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "vex-document-type-manage",
  templateUrl: "./document-type-manage.component.html",
  styleUrls: ["./document-type-manage.component.scss"],
})
export class DocumentTypeManageComponent implements OnInit {
  icClose = IconsService.prototype.getIcon("icClose");
  configs = configs;

  documentTypes: DocumentType[];
  form: FormGroup;

  initForm(): void {
    this.form = this._fb.group({
      documentTypeId: [0, [Validators.required]],
      name: ["", [Validators.required]],
      abbreviation: ["", [Validators.required]],
      state: ["", [Validators.required]],
    });
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _documentTypeService: DocumentTypeService,
    public _dialogRef: MatDialogRef<DocumentTypeManageComponent>,
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    if (this.data != null) {
      this.documentTypeById(this.data.data.documentTypeId);
    }
  }

  documentTypeById(documentTypeId: number): void {
    this._documentTypeService.documentTypeById(documentTypeId).subscribe((resp) => {
      this.form.reset({
        documentTypeId: resp.documentTypeId,
        name: resp.name,
        abbreviation: resp.abbreviation,
        state: resp.state,
      });
    });
  }

  documentTypeSave(): void {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      });
    }

    const documentTypeId = this.form.get("documentTypeId").value;

    if (documentTypeId > 0) {
      this.documentTypeEdit();
    } else {
      this.documentTypeRegister();
    }
  }

  documentTypeRegister(): void {
    this._documentTypeService
      .documentTypeRegister(this.form.value)
      .subscribe((resp) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
          this._dialogRef.close(true);
        } else {
          this._alert.warn("Atención", resp.message);
        }
      });
  }

  documentTypeEdit(): void {
    this._documentTypeService
      .documentTypeEdit(this.form.value)
      .subscribe((resp) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
          this._dialogRef.close(true);
        }
      });
  }
}
