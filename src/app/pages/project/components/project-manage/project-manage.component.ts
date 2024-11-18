import { Component, Inject, OnInit } from "@angular/core";
import { IconsService } from "@shared/services/icons.service";
import * as configs from "../../../../../static-data/configs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertService } from "@shared/services/alert.service";
import { ProjectService } from "../../services/project.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { SelectAutoComplete } from "@shared/models/select-autocomplete.interface";
import { CustomerSelectService } from "@shared/services/customer-select.service";
import { CategorySelectService } from "@shared/services/category-select.service";
import { StatusSelectService } from "@shared/services/status-select.service";

@Component({
  selector: "vex-project-manage",
  templateUrl: "./project-manage.component.html",
  styleUrls: ["./project-manage.component.scss"],
})
export class ProjectManageComponent implements OnInit {
  icClose = IconsService.prototype.getIcon("icClose");
  configs = configs;

  customerSelect: SelectAutoComplete[];
  categorySelect: SelectAutoComplete[];
  statusSelect: SelectAutoComplete[];
  form: FormGroup;

  initForm(): void {
    this.form = this._fb.group({
      projectId: [0, [Validators.required]],
      internalName: ["", [Validators.required]],
      commercialName: ["", [Validators.required]],
      customerId: [0, [Validators.required]],
      categoryId: [0, [Validators.required]],
      startDate: [this.getFormattedDate()],
      endDate: [this.getFormattedDate()],
      statusId: [0, [Validators.required]],
      state: ["", [Validators.required]],
    });
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _projectService: ProjectService,
    private _customerSelectService: CustomerSelectService,
    private _categorySelectService: CategorySelectService,
    private _statusSelectService: StatusSelectService,
    public _dialogRef: MatDialogRef<ProjectManageComponent>
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.listSelectCategory();
    this.listSelectCustomer();
    this.listSelectStatus();
    if (this.data != null) {
      this.projectById(this.data.data.projectId);
    }
  }

  listSelectCustomer(): void {
    this._customerSelectService.listSelectCustomers().subscribe((resp) => {
      this.customerSelect = resp;
    });
  }

  listSelectCategory(): void {
    this._categorySelectService.listSelectCategories().subscribe((resp) => {
      this.categorySelect = resp;
    });
  }

  listSelectStatus(): void {
    this._statusSelectService.listSelectStatuses().subscribe((resp) => {
      this.statusSelect = resp;
    });
  }

  projectById(projectId: number): void {
    this._projectService.projectById(projectId).subscribe((resp) => {
      const startDate = new Date(resp.startDate);
      const endDate = new Date(resp.endDate);

      this.form.reset({
        projectId: resp.projectId,
        internalName: resp.internalName,
        commercialName: resp.commercialName,
        customerId: resp.customerId,
        categoryId: resp.categoryId,
        startDate: startDate.toISOString().slice(0, 10),
        endDate: endDate.toISOString().slice(0, 10),
        statusId: resp.statusId,
        state: resp.state,
      });
    });
  }

  projectSave(): void {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      });
    }

    const projectId = this.form.get("projectId").value;

    if (projectId > 0) {
      this.projectEdit();
    } else {
      this.projectRegister();
    }
  }

  projectRegister(): void {
    this._projectService.projectRegister(this.form.value).subscribe((resp) => {
      if (resp.isSuccess) {
        this._alert.success("Excelente", resp.message);
        this._dialogRef.close(true);
      } else {
        this._alert.warn("Atención", resp.message);
      }
    });
  }

  projectEdit(): void {
    this._projectService.projectEdit(this.form.value).subscribe((resp) => {
      if (resp.isSuccess) {
        this._alert.success("Excelente", resp.message);
        this._dialogRef.close(true);
      }
    });
  }

  getFormattedDate(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // +1 porque enero es 0
    const day = String(now.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }
}
