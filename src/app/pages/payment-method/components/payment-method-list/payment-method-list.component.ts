import { Component, OnInit } from "@angular/core";
import { CustomTitleService } from "@shared/services/custom-title.service";
import { fadeInRight400ms } from "src/@vex/animations/fade-in-right.animation";
import { scaleIn400ms } from "src/@vex/animations/scale-in.animation";
import { stagger40ms } from "src/@vex/animations/stagger.animation";
import { PaymentMethodService } from "../../services/payment-method.service";
import { componentSettings } from "./payment-method-list-config";
import { DateRange, FiltersBox } from "@shared/models/search-options.interface";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { PaymentMethodManageComponent } from "../payment-method-manage/payment-method-manage.component";
import { PaymentMethodResponse } from "../../models/payment-method-response.interface";
import { RowClick } from "@shared/models/row-click.interface";
import Swal from "sweetalert2";

@Component({
  selector: "vex-payment-method-list",
  templateUrl: "./payment-method-list.component.html",
  styleUrls: ["./payment-method-list.component.scss"],
  animations: [stagger40ms, scaleIn400ms, fadeInRight400ms],
})
export class PaymentMethodListComponent implements OnInit {
  component: any;

  constructor(
    customTitle: CustomTitleService,
    public _paymentMethodService: PaymentMethodService,
    public _dialog: MatDialog
  ) {
    customTitle.set("Plantillas de Emails");
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
      .open(PaymentMethodManageComponent, {
        disableClose: true,
        width: "400px",
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.setGetInputsPaymentMethods(true);
        }
      });
  }

  rowClick(rowClick: RowClick<PaymentMethodResponse>) {
    let action = rowClick.action;
    let paymentMethod = rowClick.row;

    switch (action) {
      case "edit":
        this.paymentMethodEdit(paymentMethod);
        break;
      case "remove":
        this.paymentMethodRemove(paymentMethod);
        break;
    }

    return false;
  }

  paymentMethodEdit(paymentMethodData: PaymentMethodResponse) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = paymentMethodData;

    this._dialog
      .open(PaymentMethodManageComponent, {
        data: dialogConfig,
        disableClose: true,
        width: "400px",
      })
      .afterClosed()
      .subscribe((resp) => {
        if (resp) {
          this.setGetInputsPaymentMethods(true);
        }
      });
  }

  paymentMethodRemove(paymentMethodData: PaymentMethodResponse) {
    Swal.fire({
      title: `¿Realmente deseas eliminar el metodo de pago ${paymentMethodData.name}?`,
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
        this._paymentMethodService
          .paymentMethodRemove(paymentMethodData.paymentMethodId)
          .subscribe(() => this.setGetInputsPaymentMethods(true));
      }
    });
  }

  setGetInputsPaymentMethods(refresh: boolean) {
    this.component.filters.refresh = refresh;
    this.formatGetInputs();
  }

  get getDownloadUrl() {
    return `PaymentMethod?Download=True`;
  }
}
