import { Component, Inject, OnInit } from "@angular/core";
import { IconsService } from "@shared/services/icons.service";
import * as configs from "../../../../../static-data/configs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertService } from "@shared/services/alert.service";
import { DocumentTemplateService } from "../../services/document-template.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { SelectAutoComplete } from "@shared/models/select-autocomplete.interface";
import { TemplateTypeSelectService } from "@shared/services/template-type-select.service";

@Component({
  selector: "vex-document-template-manage",
  templateUrl: "./document-template-manage.component.html",
  styleUrls: ["./document-template-manage.component.scss"],
})
export class DocumentTemplateManageComponent implements OnInit {
  icClose = IconsService.prototype.getIcon("icClose");
  configs = configs;

  documentTypeSelect: SelectAutoComplete[];
  templateTypeSelect: SelectAutoComplete[];
  form: FormGroup;

  initForm(): void {
    this.form = this._fb.group({
      documentTemplateId: [0, [Validators.required]],
      name: ["", [Validators.required]],
      templateTypeId: [0, [Validators.required]],
      content: ["", [Validators.required]],
      state: ["", [Validators.required]],
    });
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _documentTemplateService: DocumentTemplateService,
    private _templateTypeSelectService: TemplateTypeSelectService,
    public _dialogRef: MatDialogRef<DocumentTemplateManageComponent>
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.listSelectTemplateType();
    if (this.data != null) {
      this.documentTemplateById(this.data.data.documentTemplateId);
    }
  }

  listSelectTemplateType(): void {
    this._templateTypeSelectService.listSelectTemplateTypes().subscribe((resp) => {
      this.templateTypeSelect = resp;
    });
  }

  documentTemplateById(documentTemplateId: number): void {
    this._documentTemplateService.documentTemplateById(documentTemplateId).subscribe((resp) => {
      this.form.reset({
        documentTemplateId: resp.documentTemplateId,
        name: resp.name,
        templateTypeId: resp.templateTypeId,
        content: resp.content,
        state: resp.state,
      });
    });
  }

  documentTemplateSave(): void {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      });
    }

    const documentTemplateId = this.form.get("documentTemplateId").value;

    if (documentTemplateId > 0) {
      this.documentTemplateEdit();
    } else {
      this.documentTemplateRegister();
    }
  }

  documentTemplateRegister(): void {
    this._documentTemplateService
      .documentTemplateRegister(this.form.value)
      .subscribe((resp) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
          this._dialogRef.close(true);
        } else {
          this._alert.warn("Atención", resp.message);
        }
      });
  }

  documentTemplateEdit(): void {
    this._documentTemplateService.documentTemplateEdit(this.form.value).subscribe((resp) => {
      if (resp.isSuccess) {
        this._alert.success("Excelente", resp.message);
        this._dialogRef.close(true);
      }
    });
  }
}
