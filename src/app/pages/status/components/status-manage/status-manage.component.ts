import { Component, Inject, OnInit } from "@angular/core";
import { IconsService } from "@shared/services/icons.service";
import * as configs from "../../../../../static-data/configs";
import { DocumentType } from "@shared/models/document-type.interface";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertService } from "@shared/services/alert.service";
import { StatusService } from "../../services/status.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "vex-status-manage",
  templateUrl: "./status-manage.component.html",
  styleUrls: ["./status-manage.component.scss"],
})
export class StatusManageComponent implements OnInit {
  icClose = IconsService.prototype.getIcon("icClose");
  configs = configs;

  documentTypes: DocumentType[];
  form: FormGroup;

  initForm(): void {
    this.form = this._fb.group({
      statusId: [0, [Validators.required]],
      name: ["", [Validators.required]],
      description: ["", [Validators.required]],
      state: ["", [Validators.required]],
    });
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _statusService: StatusService,
    public _dialogRef: MatDialogRef<StatusManageComponent>
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    if (this.data != null) {
      this.statusById(this.data.data.statusId);
    }
  }

  statusById(statusId: number): void {
    this._statusService.statusById(statusId).subscribe((resp) => {
      this.form.reset({
        statusId: resp.statusId,
        name: resp.name,
        description: resp.description,
        state: resp.state,
      });
    });
  }

  statusSave(): void {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      });
    }

    const statusId = this.form.get("statusId").value;

    if (statusId > 0) {
      this.statusEdit();
    } else {
      this.statusRegister();
    }
  }

  statusRegister(): void {
    this._statusService.statusRegister(this.form.value).subscribe((resp) => {
      if (resp.isSuccess) {
        this._alert.success("Excelente", resp.message);
        this._dialogRef.close(true);
      } else {
        this._alert.warn("Atención", resp.message);
      }
    });
  }

  statusEdit(): void {
    this._statusService.statusEdit(this.form.value).subscribe((resp) => {
      if (resp.isSuccess) {
        this._alert.success("Excelente", resp.message);
        this._dialogRef.close(true);
      }
    });
  }
}
