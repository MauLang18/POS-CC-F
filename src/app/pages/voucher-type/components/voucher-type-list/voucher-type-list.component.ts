import { Component, OnInit } from "@angular/core";
import { CustomTitleService } from "@shared/services/custom-title.service";
import { fadeInRight400ms } from "src/@vex/animations/fade-in-right.animation";
import { scaleIn400ms } from "src/@vex/animations/scale-in.animation";
import { stagger40ms } from "src/@vex/animations/stagger.animation";
import { VoucherTypeService } from "../../services/voucher-type.service";
import { componentSettings } from "./voucher-type-list-config";
import { DateRange, FiltersBox } from "@shared/models/search-options.interface";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { VoucherTypeManageComponent } from "../voucher-type-manage/voucher-type-manage.component";
import { VoucherTypeResponse } from "../../models/voucher-type-response.interface";
import { RowClick } from "@shared/models/row-click.interface";
import Swal from "sweetalert2";

@Component({
  selector: "vex-voucher-type-list",
  templateUrl: "./voucher-type-list.component.html",
  styleUrls: ["./voucher-type-list.component.scss"],
  animations: [stagger40ms, scaleIn400ms, fadeInRight400ms],
})
export class VoucherTypeListComponent implements OnInit {
  component: any;

  constructor(
    customTitle: CustomTitleService,
    public _voucherTypeService: VoucherTypeService,
    public _dialog: MatDialog
  ) {
    customTitle.set("Tipos de Vouchers");
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
      .open(VoucherTypeManageComponent, {
        disableClose: true,
        width: "400px",
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.setGetInputsVoucherTypes(true);
        }
      });
  }

  rowClick(rowClick: RowClick<VoucherTypeResponse>) {
    let action = rowClick.action;
    let voucherType = rowClick.row;

    switch (action) {
      case "edit":
        this.voucherTypeEdit(voucherType);
        break;
      case "remove":
        this.voucherTypeRemove(voucherType);
        break;
    }

    return false;
  }

  voucherTypeEdit(voucherTypeData: VoucherTypeResponse) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = voucherTypeData;

    this._dialog
      .open(VoucherTypeManageComponent, {
        data: dialogConfig,
        disableClose: true,
        width: "400px",
      })
      .afterClosed()
      .subscribe((resp) => {
        if (resp) {
          this.setGetInputsVoucherTypes(true);
        }
      });
  }

  voucherTypeRemove(voucherTypeData: VoucherTypeResponse) {
    Swal.fire({
      title: `¿Realmente deseas eliminar el tipo de vouchero ${voucherTypeData.name}?`,
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
        this._voucherTypeService
          .voucherTypeRemove(voucherTypeData.voucherTypeId)
          .subscribe(() => this.setGetInputsVoucherTypes(true));
      }
    });
  }

  setGetInputsVoucherTypes(refresh: boolean) {
    this.component.filters.refresh = refresh;
    this.formatGetInputs();
  }

  get getDownloadUrl() {
    return `VoucherType?Download=True`;
  }
}
