import { Component, Inject, OnInit } from "@angular/core";
import { IconsService } from "@shared/services/icons.service";
import * as configs from "../../../../../static-data/configs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertService } from "@shared/services/alert.service";
import { EmailTemplateService } from "../../services/email-template.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { SelectAutoComplete } from "@shared/models/select-autocomplete.interface";
import { TemplateTypeSelectService } from "@shared/services/template-type-select.service";

@Component({
  selector: "vex-email-template-manage",
  templateUrl: "./email-template-manage.component.html",
  styleUrls: ["./email-template-manage.component.scss"],
})
export class EmailTemplateManageComponent implements OnInit {
  icClose = IconsService.prototype.getIcon("icClose");
  configs = configs;

  emailTypeSelect: SelectAutoComplete[];
  templateTypeSelect: SelectAutoComplete[];
  form: FormGroup;

  initForm(): void {
    this.form = this._fb.group({
      emailTemplateId: [0, [Validators.required]],
      subject: ["", [Validators.required]],
      templateTypeId: [0, [Validators.required]],
      body: ["", [Validators.required]],
      state: ["", [Validators.required]],
    });
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _emailTemplateService: EmailTemplateService,
    private _templateTypeSelectService: TemplateTypeSelectService,
    public _dialogRef: MatDialogRef<EmailTemplateManageComponent>
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.listSelectTemplateType();
    if (this.data != null) {
      this.emailTemplateById(this.data.data.emailTemplateId);
    }
  }

  listSelectTemplateType(): void {
    this._templateTypeSelectService.listSelectTemplateTypes().subscribe((resp) => {
      this.templateTypeSelect = resp;
    });
  }

  emailTemplateById(emailTemplateId: number): void {
    this._emailTemplateService.emailTemplateById(emailTemplateId).subscribe((resp) => {
      this.form.reset({
        emailTemplateId: resp.emailTemplateId,
        subject: resp.subject,
        templateTypeId: resp.templateTypeId,
        body: resp.body,
        state: resp.state,
      });
    });
  }

  emailTemplateSave(): void {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      });
    }

    const emailTemplateId = this.form.get("emailTemplateId").value;

    if (emailTemplateId > 0) {
      this.emailTemplateEdit();
    } else {
      this.emailTemplateRegister();
    }
  }

  emailTemplateRegister(): void {
    this._emailTemplateService
      .emailTemplateRegister(this.form.value)
      .subscribe((resp) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
          this._dialogRef.close(true);
        } else {
          this._alert.warn("Atención", resp.message);
        }
      });
  }

  emailTemplateEdit(): void {
    this._emailTemplateService.emailTemplateEdit(this.form.value).subscribe((resp) => {
      if (resp.isSuccess) {
        this._alert.success("Excelente", resp.message);
        this._dialogRef.close(true);
      }
    });
  }
}
