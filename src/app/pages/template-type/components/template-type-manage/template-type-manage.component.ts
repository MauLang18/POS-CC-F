import { Component, Inject, OnInit } from "@angular/core";
import { IconsService } from "@shared/services/icons.service";
import * as configs from "../../../../../static-data/configs";
import { DocumentType } from "@shared/models/document-type.interface";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertService } from "@shared/services/alert.service";
import { TemplateTypeService } from "../../services/template-type.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "vex-template-type-manage",
  templateUrl: "./template-type-manage.component.html",
  styleUrls: ["./template-type-manage.component.scss"],
})
export class TemplateTypeManageComponent implements OnInit {
  icClose = IconsService.prototype.getIcon("icClose");
  configs = configs;

  documentTypes: DocumentType[];
  form: FormGroup;

  initForm(): void {
    this.form = this._fb.group({
      templateTypeId: [0, [Validators.required]],
      name: ["", [Validators.required]],
      description: ["", [Validators.required]],
      state: ["", [Validators.required]],
    });
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _templateTypeService: TemplateTypeService,
    public _dialogRef: MatDialogRef<TemplateTypeManageComponent>
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    if (this.data != null) {
      this.templateTypeById(this.data.data.templateTypeId);
    }
  }

  templateTypeById(templateTypeId: number): void {
    this._templateTypeService
      .templateTypeById(templateTypeId)
      .subscribe((resp) => {
        this.form.reset({
          templateTypeId: resp.templateTypeId,
          name: resp.name,
          description: resp.description,
          state: resp.state,
        });
      });
  }

  templateTypeSave(): void {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      });
    }

    const templateTypeId = this.form.get("templateTypeId").value;

    if (templateTypeId > 0) {
      this.templateTypeEdit();
    } else {
      this.templateTypeRegister();
    }
  }

  templateTypeRegister(): void {
    this._templateTypeService
      .templateTypeRegister(this.form.value)
      .subscribe((resp) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
          this._dialogRef.close(true);
        } else {
          this._alert.warn("Atención", resp.message);
        }
      });
  }

  templateTypeEdit(): void {
    this._templateTypeService
      .templateTypeEdit(this.form.value)
      .subscribe((resp) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
          this._dialogRef.close(true);
        }
      });
  }
}
