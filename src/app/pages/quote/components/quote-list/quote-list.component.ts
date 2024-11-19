import { Component, OnInit } from "@angular/core";
import { CustomTitleService } from "@shared/services/custom-title.service";
import { fadeInRight400ms } from "src/@vex/animations/fade-in-right.animation";
import { scaleIn400ms } from "src/@vex/animations/scale-in.animation";
import { stagger40ms } from "src/@vex/animations/stagger.animation";
import { QuoteService } from "../../services/quote.service";
import { componentSettings } from "./quote-list-config";
import { DateRange, FiltersBox } from "@shared/models/search-options.interface";
import { Router } from "@angular/router";
import { RowClick } from "@shared/models/row-click.interface";
import { QuoteResponse } from "../../models/quote-response.interface";
import Swal from "sweetalert2";

@Component({
  selector: "vex-quote-list",
  templateUrl: "./quote-list.component.html",
  styleUrls: ["./quote-list.component.scss"],
  animations: [stagger40ms, scaleIn400ms, fadeInRight400ms],
})
export class QuoteListComponent implements OnInit {
  component;
  constructor(
    customTitle: CustomTitleService,
    public _quoteService: QuoteService,
    private _router: Router
  ) {
    customTitle.set("Cotizaciones");
  }

  ngOnInit(): void {
    this.component = componentSettings;
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

  rowClick(rowClick: RowClick<QuoteResponse>) {
    let action = rowClick.action;
    let quote = rowClick.row;

    switch (action) {
      case "viewDetail":
        this.quoteViewDetail(quote);
        break;
      case "report":
        this.quoteReport(quote);
        break;
      case "cancel":
        this.quoteCancel(quote);
        break;
    }

    return false;
  }

  quoteViewDetail(quote: QuoteResponse) {
    this._router.navigate(["/proceso-cotizacion/crear", quote.quoteId]);
  }

  quoteReport(quote: QuoteResponse) {
    this._quoteService.quoteReport(quote);
  }

  quoteCancel(quote: QuoteResponse) {
    Swal.fire({
      title: `Se anulará de forma permanente`,
      text: "¿Realmente deseas anular la Cotizacion?",
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
        this._quoteService
          .quoteCancel(quote.quoteId)
          .subscribe(() => this.setGetInputsQuote(true));
      }
    });
  }

  setGetInputsQuote(refresh: boolean) {
    this.component.filters.refresh = refresh;
    this.formatGetInputs();
  }

  get getDownloadUrl() {
    return `Quote?Download=True`;
  }

  newQuote() {
    this._router.navigate(["/proceso-cotizacion/crear"]);
  }
}
