import { Component, Inject, OnInit } from "@angular/core";
import { IconsService } from "@shared/services/icons.service";
import * as configs from "../../../../../static-data/configs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertService } from "@shared/services/alert.service";
import { UserService } from "../../services/user.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "vex-user-manage",
  templateUrl: "./user-manage.component.html",
  styleUrls: ["./user-manage.component.scss"],
})
export class UserManageComponent implements OnInit {
  icClose = IconsService.prototype.getIcon("icClose");
  configs = configs;

  form: FormGroup;

  initForm(): void {
    this.form = this._fb.group({
      userId: [0, [Validators.required]],
      userName: ["", [Validators.required]],
      email: ["", [Validators.required]],
      password: [""],
      state: ["", [Validators.required]],
    });
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _userService: UserService,
    public _dialogRef: MatDialogRef<UserManageComponent>
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    if (this.data != null) {
      this.userById(this.data.data.userId);
    }
  }

  userById(userId: number): void {
    this._userService.userById(userId).subscribe((resp) => {
      this.form.reset({
        userId: resp.userId,
        userName: resp.userName,
        email: resp.email,
        state: resp.state,
      });
    });
  }

  userSave(): void {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      });
    }

    const userId = this.form.get("userId").value;

    if (userId > 0) {
      this.userEdit();
    } else {
      this.userRegister();
    }
  }

  userRegister(): void {
    this._userService.userRegister(this.form.value).subscribe((resp) => {
      if (resp.isSuccess) {
        this._alert.success("Excelente", resp.message);
        this._dialogRef.close(true);
      } else {
        this._alert.warn("Atención", resp.message);
      }
    });
  }

  userEdit(): void {
    this._userService.userEdit(this.form.value).subscribe((resp) => {
      if (resp.isSuccess) {
        this._alert.success("Excelente", resp.message);
        this._dialogRef.close(true);
      }
    });
  }
}
