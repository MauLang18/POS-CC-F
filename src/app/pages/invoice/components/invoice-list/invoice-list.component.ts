import { Component, OnInit } from "@angular/core";
import { CustomTitleService } from "@shared/services/custom-title.service";
import { fadeInRight400ms } from "src/@vex/animations/fade-in-right.animation";
import { scaleIn400ms } from "src/@vex/animations/scale-in.animation";
import { stagger40ms } from "src/@vex/animations/stagger.animation";
import { InvoiceService } from "../../services/invoice.service";
import { componentSettings } from "./invoice-list-config";
import { DateRange, FiltersBox } from "@shared/models/search-options.interface";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { InvoiceManageComponent } from "../invoice-manage/invoice-manage.component";
import { InvoiceResponse } from "../../models/invoice-response.interface";
import { RowClick } from "@shared/models/row-click.interface";
import Swal from "sweetalert2";
import { AlertService } from "@shared/services/alert.service";
import { InvoiceReportComponent } from "../invoice-report/invoice-report.component";

@Component({
  selector: "vex-invoice-list",
  templateUrl: "./invoice-list.component.html",
  styleUrls: ["./invoice-list.component.scss"],
  animations: [stagger40ms, scaleIn400ms, fadeInRight400ms],
})
export class InvoiceListComponent implements OnInit {
  component: any;

  constructor(
    customTitle: CustomTitleService,
    public _invoiceService: InvoiceService,
    private _alert: AlertService,
    public _dialog: MatDialog
  ) {
    customTitle.set("Facturas");
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
      .open(InvoiceManageComponent, {
        disableClose: true,
        width: "400px",
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.setGetInputsInvoices(true);
        }
      });
  }

  rowClick(rowClick: RowClick<InvoiceResponse>) {
    let action = rowClick.action;
    let invoice = rowClick.row;

    switch (action) {
      case "edit":
        this.invoiceEdit(invoice);
        break;
      case "report":
        this.invoiceReport(invoice);
        break;
    }

    return false;
  }

  invoiceEdit(invoiceData: InvoiceResponse) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = invoiceData;

    this._dialog
      .open(InvoiceManageComponent, {
        data: dialogConfig,
        disableClose: true,
        width: "400px",
      })
      .afterClosed()
      .subscribe((resp) => {
        if (resp) {
          this.setGetInputsInvoices(true);
        }
      });
  }

  invoiceReport(invoice: InvoiceResponse) {
    const dialogRef = this._dialog.open(InvoiceReportComponent, {
      width: "400px",
      data: invoice,
    });
  }

  setGetInputsInvoices(refresh: boolean) {
    this.component.filters.refresh = refresh;
    this.formatGetInputs();
  }

  get getDownloadUrl() {
    return `Invoice?Download=True`;
  }
}
