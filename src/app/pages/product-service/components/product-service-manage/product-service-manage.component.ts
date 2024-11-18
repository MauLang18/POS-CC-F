import { Component, Inject, OnInit } from "@angular/core";
import { IconsService } from "@shared/services/icons.service";
import * as configs from "../../../../../static-data/configs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertService } from "@shared/services/alert.service";
import { ProductServiceService } from "../../services/product-service.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { SelectAutoComplete } from "@shared/models/select-autocomplete.interface";
import { UnitSelectService } from "@shared/services/unit-select.service";
import { CategorySelectService } from "@shared/services/category-select.service";

@Component({
  selector: "vex-product-service-manage",
  templateUrl: "./product-service-manage.component.html",
  styleUrls: ["./product-service-manage.component.scss"],
})
export class ProductServiceManageComponent implements OnInit {
  icClose = IconsService.prototype.getIcon("icClose");
  configs = configs;

  unitSelect: SelectAutoComplete[];
  categorySelect: SelectAutoComplete[];
  form: FormGroup;

  initForm(): void {
    this.form = this._fb.group({
      productServiceId: [0, [Validators.required]],
      code: [{ value: "", disabled: true }],
      name: ["", [Validators.required]],
      categoryId: [0, [Validators.required]],
      stockQuantity: [0, [Validators.required]],
      unitId: [0, [Validators.required]],
      isService: ["", [Validators.required]],
      price: [0, [Validators.required]],
      description: [""],
      image: [""],
      state: ["", [Validators.required]],
    });
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _productServiceService: ProductServiceService,
    private _unitSelectService: UnitSelectService,
    private _categorySelectService: CategorySelectService,
    public _dialogRef: MatDialogRef<ProductServiceManageComponent>
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.listSelectCategory();
    this.listSelectUnit();
    if (this.data != null) {
      this.productServiceById(this.data.data.productServiceId);
    }
  }

  listSelectUnit(): void {
    this._unitSelectService.listSelectUnits().subscribe((resp) => {
      this.unitSelect = resp;
    });
  }

  listSelectCategory(): void {
    this._categorySelectService.listSelectCategories().subscribe((resp) => {
      this.categorySelect = resp;
    });
  }

  productServiceById(productServiceId: number): void {
    this._productServiceService
      .productServiceById(productServiceId)
      .subscribe((resp) => {
        this.form.reset({
          productServiceId: resp.productServiceId,
          code: resp.code,
          name: resp.name,
          categoryId: resp.categoryId,
          stockQuantity: resp.stockQuantity,
          unitId: resp.unitId,
          isService: resp.isService,
          price: resp.price,
          description: resp.description,
          image: resp.image,
          state: resp.state,
        });
      });
  }

  selectedImage(file: File) {
    this.form.get("image").setValue(file);
  }

  productServiceSave(): void {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      });
    }

    const productServiceId = this.form.get("productServiceId").value;

    if (productServiceId > 0) {
      this.productServiceEdit();
    } else {
      this.productServiceRegister();
    }
  }

  productServiceRegister(): void {
    this._productServiceService
      .productServiceRegister(this.form.value)
      .subscribe((resp) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
          this._dialogRef.close(true);
        } else {
          this._alert.warn("Atención", resp.message);
        }
      });
  }

  productServiceEdit(): void {
    this._productServiceService
      .productServiceEdit(this.form.value)
      .subscribe((resp) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
          this._dialogRef.close(true);
        }
      });
  }
}
