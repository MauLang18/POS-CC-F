import { Component, Inject, OnInit } from "@angular/core";
import { IconsService } from "@shared/services/icons.service";
import * as configs from "../../../../../static-data/configs";
import { DocumentType } from "@shared/models/document-type.interface";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertService } from "@shared/services/alert.service";
import { CategoryService } from "../../services/category.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "vex-category-manage",
  templateUrl: "./category-manage.component.html",
  styleUrls: ["./category-manage.component.scss"],
})
export class CategoryManageComponent implements OnInit {
  icClose = IconsService.prototype.getIcon("icClose");
  configs = configs;

  documentTypes: DocumentType[];
  form: FormGroup;

  initForm(): void {
    this.form = this._fb.group({
      categoryId: [0, [Validators.required]],
      name: ["", [Validators.required]],
      description: ["", [Validators.required]],
      state: ["", [Validators.required]],
    });
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _categoryService: CategoryService,
    public _dialogRef: MatDialogRef<CategoryManageComponent>,
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    if (this.data != null) {
      this.categoryById(this.data.data.categoryId);
    }
  }

  categoryById(categoryId: number): void {
    this._categoryService.categoryById(categoryId).subscribe((resp) => {
      this.form.reset({
        categoryId: resp.categoryId,
        name: resp.name,
        description: resp.description,
        state: resp.state,
      });
    });
  }

  categorySave(): void {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      });
    }

    const categoryId = this.form.get("categoryId").value;

    if (categoryId > 0) {
      this.categoryEdit();
    } else {
      this.categoryRegister();
    }
  }

  categoryRegister(): void {
    this._categoryService
      .categoryRegister(this.form.value)
      .subscribe((resp) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
          this._dialogRef.close(true);
        } else {
          this._alert.warn("Atención", resp.message);
        }
      });
  }

  categoryEdit(): void {
    this._categoryService
      .categoryEdit(this.form.value)
      .subscribe((resp) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
          this._dialogRef.close(true);
        }
      });
  }
}
