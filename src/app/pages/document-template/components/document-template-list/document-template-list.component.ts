import { Component, OnInit } from "@angular/core";
import { CustomTitleService } from "@shared/services/custom-title.service";
import { fadeInRight400ms } from "src/@vex/animations/fade-in-right.animation";
import { scaleIn400ms } from "src/@vex/animations/scale-in.animation";
import { stagger40ms } from "src/@vex/animations/stagger.animation";
import { DocumentTemplateService } from "../../services/document-template.service";
import { componentSettings } from "./document-template-list-config";
import { DateRange, FiltersBox } from "@shared/models/search-options.interface";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { DocumentTemplateManageComponent } from "../document-template-manage/document-template-manage.component";
import { DocumentTemplateResponse } from "../../models/document-template-response.interface";
import { RowClick } from "@shared/models/row-click.interface";
import Swal from "sweetalert2";

@Component({
  selector: "vex-document-template-list",
  templateUrl: "./document-template-list.component.html",
  styleUrls: ["./document-template-list.component.scss"],
  animations: [stagger40ms, scaleIn400ms, fadeInRight400ms],
})
export class DocumentTemplateListComponent implements OnInit {
  component: any;

  constructor(
    customTitle: CustomTitleService,
    public _documentTemplateService: DocumentTemplateService,
    public _dialog: MatDialog
  ) {
    customTitle.set("Plantillas de Documentos");
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
      .open(DocumentTemplateManageComponent, {
        disableClose: true,
        width: "400px",
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.setGetInputsDocumentTemplates(true);
        }
      });
  }

  rowClick(rowClick: RowClick<DocumentTemplateResponse>) {
    let action = rowClick.action;
    let documentTemplate = rowClick.row;

    switch (action) {
      case "edit":
        this.documentTemplateEdit(documentTemplate);
        break;
      case "remove":
        this.documentTemplateRemove(documentTemplate);
        break;
    }

    return false;
  }

  documentTemplateEdit(documentTemplateData: DocumentTemplateResponse) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = documentTemplateData;

    this._dialog
      .open(DocumentTemplateManageComponent, {
        data: dialogConfig,
        disableClose: true,
        width: "400px",
      })
      .afterClosed()
      .subscribe((resp) => {
        if (resp) {
          this.setGetInputsDocumentTemplates(true);
        }
      });
  }

  documentTemplateRemove(documentTemplateData: DocumentTemplateResponse) {
    Swal.fire({
      title: `¿Realmente deseas eliminar la categoria ${documentTemplateData.name}?`,
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
        this._documentTemplateService
          .documentTemplateRemove(documentTemplateData.documentTemplateId)
          .subscribe(() => this.setGetInputsDocumentTemplates(true));
      }
    });
  }

  setGetInputsDocumentTemplates(refresh: boolean) {
    this.component.filters.refresh = refresh;
    this.formatGetInputs();
  }

  get getDownloadUrl() {
    return `DocumentTemplate?Download=True`;
  }
}
