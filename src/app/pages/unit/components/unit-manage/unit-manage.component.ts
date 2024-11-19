import { Component, Inject, OnInit } from "@angular/core";
import { IconsService } from "@shared/services/icons.service";
import * as configs from "../../../../../static-data/configs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertService } from "@shared/services/alert.service";
import { UnitService } from "../../services/unit.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "vex-unit-manage",
  templateUrl: "./unit-manage.component.html",
  styleUrls: ["./unit-manage.component.scss"],
})
export class UnitManageComponent implements OnInit {
  icClose = IconsService.prototype.getIcon("icClose");
  configs = configs;

  form: FormGroup;

  initForm(): void {
    this.form = this._fb.group({
      unitId: [0, [Validators.required]],
      name: ["", [Validators.required]],
      abbreviation: ["", [Validators.required]],
      state: ["", [Validators.required]],
    });
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _unitService: UnitService,
    public _dialogRef: MatDialogRef<UnitManageComponent>
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    if (this.data != null) {
      this.unitById(this.data.data.unitId);
    }
  }

  unitById(unitId: number): void {
    this._unitService.unitById(unitId).subscribe((resp) => {
      this.form.reset({
        unitId: resp.unitId,
        name: resp.name,
        abbreviation: resp.abbreviation,
        state: resp.state,
      });
    });
  }

  unitSave(): void {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      });
    }

    const unitId = this.form.get("unitId").value;

    if (unitId > 0) {
      this.unitEdit();
    } else {
      this.unitRegister();
    }
  }

  unitRegister(): void {
    this._unitService.unitRegister(this.form.value).subscribe((resp) => {
      if (resp.isSuccess) {
        this._alert.success("Excelente", resp.message);
        this._dialogRef.close(true);
      } else {
        this._alert.warn("Atención", resp.message);
      }
    });
  }

  unitEdit(): void {
    this._unitService.unitEdit(this.form.value).subscribe((resp) => {
      if (resp.isSuccess) {
        this._alert.success("Excelente", resp.message);
        this._dialogRef.close(true);
      }
    });
  }
}
