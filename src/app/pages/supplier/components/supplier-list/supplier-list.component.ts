import { Component, OnInit } from "@angular/core";
import { CustomTitleService } from "@shared/services/custom-title.service";
import { fadeInRight400ms } from "src/@vex/animations/fade-in-right.animation";
import { scaleIn400ms } from "src/@vex/animations/scale-in.animation";
import { stagger40ms } from "src/@vex/animations/stagger.animation";
import { SupplierService } from "../../services/supplier.service";
import { componentSettings } from "./supplier-list-config";
import { DateRange, FiltersBox } from "@shared/models/search-options.interface";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { SupplierManageComponent } from "../supplier-manage/supplier-manage.component";
import { SupplierResponse } from "../../models/supplier-response.interface";
import { RowClick } from "@shared/models/row-click.interface";
import Swal from "sweetalert2";

@Component({
  selector: "vex-supplier-list",
  templateUrl: "./supplier-list.component.html",
  styleUrls: ["./supplier-list.component.scss"],
  animations: [stagger40ms, scaleIn400ms, fadeInRight400ms],
})
export class SupplierListComponent implements OnInit {
  component: any;

  constructor(
    customTitle: CustomTitleService,
    public _supplierService: SupplierService,
    public _dialog: MatDialog
  ) {
    customTitle.set("Proveedores");
  }

  ngOnInit(): void {
    this.component = componentSettings;
  }

  setMenu(value: number) {
    this.component.filters.stateFilter = value;
    this.formatGetInputs();
  }

  search(data: FiltersBox) {
    this.component.filters.numFilter = data.searchValue;
    this.component.filters.textFilter = data.searchData;
    this.formatGetInputs();
  }

  searchDateRange(date: DateRange) {
    this.component.filters.startDate = date.startDate;
    this.component.filters.endDate = date.endDate;
    this.formatGetInputs();
  }

  resetFilters() {
    this.component.filters = { ...this.component.resetFilters };
    this.formatGetInputs();
  }

  formatGetInputs() {
    let str = "";

    if (this.component.filters.textFilter != null) {
      str += `&numFilter=${this.component.filters.numFilter}&textFilter=${this.component.filters.textFilter}`;
    }

    if (this.component.filters.stateFilter != null) {
      str += `&stateFilter=${this.component.filters.stateFilter}`;
    }

    if (
      this.component.filters.startDate != "" &&
      this.component.filters.endDate != ""
    ) {
      str += `&startDate=${this.component.filters.startDate}`;
      str += `&endDate=${this.component.filters.endDate}`;
    }

    if (this.component.filters.refresh) {
      let random = Math.random();
      str += `&refresh=${random}`;
      this.component.filters.refresh = false;
    }

    this.component.getInputs = str;
  }

  openDialogRegister() {
    this._dialog
      .open(SupplierManageComponent, {
        disableClose: true,
        width: "400px",
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.setGetInputsSuppliers(true);
        }
      });
  }

  rowClick(rowClick: RowClick<SupplierResponse>) {
    let action = rowClick.action;
    let supplier = rowClick.row;

    switch (action) {
      case "edit":
        this.supplierEdit(supplier);
        break;
      case "remove":
        this.supplierRemove(supplier);
        break;
    }

    return false;
  }

  supplierEdit(supplierData: SupplierResponse) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = supplierData;

    this._dialog
      .open(SupplierManageComponent, {
        data: dialogConfig,
        disableClose: true,
        width: "400px",
      })
      .afterClosed()
      .subscribe((resp) => {
        if (resp) {
          this.setGetInputsSuppliers(true);
        }
      });
  }

  supplierRemove(supplierData: SupplierResponse) {
    Swal.fire({
      title: `¿Realmente deseas eliminar la categoria ${supplierData.name}?`,
      text: "Se borrará de forma permanente!",
      icon: "warning",
      showCancelButton: true,
      focusCancel: true,
      confirmButtonColor: "rgb(210, 155, 253)",
      cancelButtonColor: "rgb(79, 109, 253)",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      width: 430,
    }).then((result) => {
      if (result.isConfirmed) {
        this._supplierService
          .supplierRemove(supplierData.supplierId)
          .subscribe(() => this.setGetInputsSuppliers(true));
      }
    });
  }

  setGetInputsSuppliers(refresh: boolean) {
    this.component.filters.refresh = refresh;
    this.formatGetInputs();
  }

  get getDownloadUrl() {
    return `Supplier?Download=True`;
  }
}
