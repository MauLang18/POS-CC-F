import { Component, OnInit } from "@angular/core";
import { CustomTitleService } from "@shared/services/custom-title.service";
import { fadeInRight400ms } from "src/@vex/animations/fade-in-right.animation";
import { scaleIn400ms } from "src/@vex/animations/scale-in.animation";
import { stagger40ms } from "src/@vex/animations/stagger.animation";
import { DocumentTypeService } from "../../services/document-type.service";
import { componentSettings } from "./document-type-list-config";
import { DateRange, FiltersBox } from "@shared/models/search-options.interface";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { DocumentTypeManageComponent } from "../document-type-manage/document-type-manage.component";
import { DocumentTypeResponse } from "../../models/document-type-response.interface";
import { RowClick } from "@shared/models/row-click.interface";
import Swal from "sweetalert2";

@Component({
  selector: "vex-document-type-list",
  templateUrl: "./document-type-list.component.html",
  styleUrls: ["./document-type-list.component.scss"],
  animations: [stagger40ms, scaleIn400ms, fadeInRight400ms],
})
export class DocumentTypeListComponent implements OnInit {
  component: any;

  constructor(
    customTitle: CustomTitleService,
    public _documentTypeService: DocumentTypeService,
    public _dialog: MatDialog
  ) {
    customTitle.set("Tipos de Documentos");
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
      .open(DocumentTypeManageComponent, {
        disableClose: true,
        width: "400px",
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.setGetInputsDocumentTypes(true);
        }
      });
  }

  rowClick(rowClick: RowClick<DocumentTypeResponse>) {
    let action = rowClick.action;
    let documentType = rowClick.row;

    switch (action) {
      case "edit":
        this.documentTypeEdit(documentType);
        break;
      case "remove":
        this.documentTypeRemove(documentType);
        break;
    }

    return false;
  }

  documentTypeEdit(documentTypeData: DocumentTypeResponse) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = documentTypeData;

    this._dialog
      .open(DocumentTypeManageComponent, {
        data: dialogConfig,
        disableClose: true,
        width: "400px",
      })
      .afterClosed()
      .subscribe((resp) => {
        if (resp) {
          this.setGetInputsDocumentTypes(true);
        }
      });
  }

  documentTypeRemove(documentTypeData: DocumentTypeResponse) {
    Swal.fire({
      title: `¿Realmente deseas eliminar el tipo de documento ${documentTypeData.name}?`,
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
        this._documentTypeService
          .documentTypeRemove(documentTypeData.documentTypeId)
          .subscribe(() => this.setGetInputsDocumentTypes(true));
      }
    });
  }

  setGetInputsDocumentTypes(refresh: boolean) {
    this.component.filters.refresh = refresh;
    this.formatGetInputs();
  }

  get getDownloadUrl() {
    return `DocumentType?Download=True`;
  }
}
