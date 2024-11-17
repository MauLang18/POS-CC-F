import { Component, Inject, OnInit } from "@angular/core";
import { IconsService } from "@shared/services/icons.service";
import * as configs from "../../../../../static-data/configs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertService } from "@shared/services/alert.service";
import { InventoryService } from "../../services/inventory.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { SelectAutoComplete } from "@shared/models/select-autocomplete.interface";

@Component({
  selector: "vex-inventory-manage",
  templateUrl: "./inventory-manage.component.html",
  styleUrls: ["./inventory-manage.component.scss"],
})
export class InventoryManageComponent implements OnInit {
  icClose = IconsService.prototype.getIcon("icClose");
  configs = configs;

  equipmentTypeSelect: SelectAutoComplete[];
  form: FormGroup;

  initForm(): void {
    this.form = this._fb.group({
      inventoryId: [0, [Validators.required]],
      code: [{ value: '', disabled: true }],
      active: [{ value: '', disabled: true }],
      brand: ["", [Validators.required]],
      series: ["", [Validators.required]],
      equipmentTypeId: [0, [Validators.required]],
      model: ["", [Validators.required]],
      price: [0],
      details: [""],
      image: [""],
      state: ["", [Validators.required]],
    });
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _inventoryService: InventoryService,
    public _dialogRef: MatDialogRef<InventoryManageComponent>,
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    if (this.data != null) {
      //this.inventoryById(this.data.data.inventoryId);
    }
  }

  /*listSelectEquipmentType(): void {
    this._equipmentTypeSelectService.listSelectEquipmentTypes().subscribe((resp) => {
      this.equipmentTypeSelect = resp;
    });
  }

  inventoryById(inventoryId: number): void {
    this._inventoryService.inventoryById(inventoryId).subscribe((resp) => {
      this.form.reset({
        inventoryId: resp.inventoryId,
        code: resp.code,
        active: resp.active,
        brand: resp.brand,
        series: resp.series,
        equipmentTypeId: resp.equipmentTypeId,
        model: resp.model,
        price: resp.price,
        details: resp.details,
        image: resp.image,
        state: resp.state,
      });
    });
  }

  selectedImage(file: File) {
    this.form.get("image").setValue(file);
  }

  inventorySave(): void {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      });
    }

    const inventoryId = this.form.get("inventoryId").value;

    if (inventoryId > 0) {
      this.inventoryEdit();
    } else {
      this.inventoryRegister();
    }
  }

  inventoryRegister(): void {
    this._inventoryService
      .inventoryRegister(this.form.value)
      .subscribe((resp) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
          this._dialogRef.close(true);
        } else {
          this._alert.warn("Atención", resp.message);
        }
      });
  }

  inventoryEdit(): void {
    this._inventoryService
      .inventoryEdit(this.form.value)
      .subscribe((resp) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
          this._dialogRef.close(true);
        }
      });
  }*/
}