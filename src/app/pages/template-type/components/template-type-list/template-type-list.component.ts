import { Component, OnInit } from "@angular/core";
import { CustomTitleService } from "@shared/services/custom-title.service";
import { fadeInRight400ms } from "src/@vex/animations/fade-in-right.animation";
import { scaleIn400ms } from "src/@vex/animations/scale-in.animation";
import { stagger40ms } from "src/@vex/animations/stagger.animation";
import { TemplateTypeService } from "../../services/template-type.service";
import { componentSettings } from "./template-type-list-config";
import { DateRange, FiltersBox } from "@shared/models/search-options.interface";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { TemplateTypeManageComponent } from "../template-type-manage/template-type-manage.component";
import { TemplateTypeResponse } from "../../models/template-type-response.interface";
import { RowClick } from "@shared/models/row-click.interface";
import Swal from "sweetalert2";

@Component({
  selector: "vex-template-type-list",
  templateUrl: "./template-type-list.component.html",
  styleUrls: ["./template-type-list.component.scss"],
  animations: [stagger40ms, scaleIn400ms, fadeInRight400ms],
})
export class TemplateTypeListComponent implements OnInit {
  component: any;

  constructor(
    customTitle: CustomTitleService,
    public _templateTypeService: TemplateTypeService,
    public _dialog: MatDialog
  ) {
    customTitle.set("Tipos de Plantillas");
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
      .open(TemplateTypeManageComponent, {
        disableClose: true,
        width: "400px",
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.setGetInputsTemplateTypes(true);
        }
      });
  }

  rowClick(rowClick: RowClick<TemplateTypeResponse>) {
    let action = rowClick.action;
    let templateType = rowClick.row;

    switch (action) {
      case "edit":
        this.templateTypeEdit(templateType);
        break;
      case "remove":
        this.templateTypeRemove(templateType);
        break;
    }

    return false;
  }

  templateTypeEdit(templateTypeData: TemplateTypeResponse) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = templateTypeData;

    this._dialog
      .open(TemplateTypeManageComponent, {
        data: dialogConfig,
        disableClose: true,
        width: "400px",
      })
      .afterClosed()
      .subscribe((resp) => {
        if (resp) {
          this.setGetInputsTemplateTypes(true);
        }
      });
  }

  templateTypeRemove(templateTypeData: TemplateTypeResponse) {
    Swal.fire({
      title: `¿Realmente deseas eliminar el tipo de templateo ${templateTypeData.name}?`,
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
        this._templateTypeService
          .templateTypeRemove(templateTypeData.templateTypeId)
          .subscribe(() => this.setGetInputsTemplateTypes(true));
      }
    });
  }

  setGetInputsTemplateTypes(refresh: boolean) {
    this.component.filters.refresh = refresh;
    this.formatGetInputs();
  }

  get getDownloadUrl() {
    return `TemplateType?Download=True`;
  }
}
