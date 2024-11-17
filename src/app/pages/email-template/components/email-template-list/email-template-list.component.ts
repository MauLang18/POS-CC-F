import { Component, OnInit } from "@angular/core";
import { CustomTitleService } from "@shared/services/custom-title.service";
import { fadeInRight400ms } from "src/@vex/animations/fade-in-right.animation";
import { scaleIn400ms } from "src/@vex/animations/scale-in.animation";
import { stagger40ms } from "src/@vex/animations/stagger.animation";
import { EmailTemplateService } from "../../services/email-template.service";
import { componentSettings } from "./email-template-list-config";
import { DateRange, FiltersBox } from "@shared/models/search-options.interface";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { EmailTemplateManageComponent } from "../email-template-manage/email-template-manage.component";
import { EmailTemplateResponse } from "../../models/email-template-response.interface";
import { RowClick } from "@shared/models/row-click.interface";
import Swal from "sweetalert2";

@Component({
  selector: "vex-email-template-list",
  templateUrl: "./email-template-list.component.html",
  styleUrls: ["./email-template-list.component.scss"],
  animations: [stagger40ms, scaleIn400ms, fadeInRight400ms],
})
export class EmailTemplateListComponent implements OnInit {
  component: any;

  constructor(
    customTitle: CustomTitleService,
    public _emailTemplateService: EmailTemplateService,
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
      .open(EmailTemplateManageComponent, {
        disableClose: true,
        width: "400px",
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.setGetInputsEmailTemplates(true);
        }
      });
  }

  rowClick(rowClick: RowClick<EmailTemplateResponse>) {
    let action = rowClick.action;
    let emailTemplate = rowClick.row;

    switch (action) {
      case "edit":
        this.emailTemplateEdit(emailTemplate);
        break;
      case "remove":
        this.emailTemplateRemove(emailTemplate);
        break;
    }

    return false;
  }

  emailTemplateEdit(emailTemplateData: EmailTemplateResponse) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = emailTemplateData;

    this._dialog
      .open(EmailTemplateManageComponent, {
        data: dialogConfig,
        disableClose: true,
        width: "400px",
      })
      .afterClosed()
      .subscribe((resp) => {
        if (resp) {
          this.setGetInputsEmailTemplates(true);
        }
      });
  }

  emailTemplateRemove(emailTemplateData: EmailTemplateResponse) {
    Swal.fire({
      title: `¿Realmente deseas eliminar la plantilla de email ${emailTemplateData.subject}?`,
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
        this._emailTemplateService
          .emailTemplateRemove(emailTemplateData.emailTemplateId)
          .subscribe(() => this.setGetInputsEmailTemplates(true));
      }
    });
  }

  setGetInputsEmailTemplates(refresh: boolean) {
    this.component.filters.refresh = refresh;
    this.formatGetInputs();
  }

  get getDownloadUrl() {
    return `EmailTemplate?Download=True`;
  }
}
