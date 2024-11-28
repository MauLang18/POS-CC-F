import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ProjectService } from "../../services/project.service";
import { AlertService } from "@shared/services/alert.service";
import { CustomerSelectService } from "@shared/services/customer-select.service";
import { StatusSelectService } from "@shared/services/status-select.service";
import { CategorySelectService } from "@shared/services/category-select.service";
import { SelectAutoComplete } from "@shared/models/select-autocomplete.interface";
import {
  ProjectRequest,
  ProjectUpdateRequest,
} from "../../models/project-request.interface";
import { ProjectDetailByIdResponse } from "../../models/project-response.interface";
import { IconsService } from "@shared/services/icons.service";

@Component({
  selector: "vex-project-create",
  templateUrl: "./project-create.component.html",
  styleUrls: ["./project-create.component.scss"],
})
export class ProjectCreateComponent implements OnInit {
  customerSelect: SelectAutoComplete[] = [];
  categorySelect: SelectAutoComplete[] = [];
  statusSelect: SelectAutoComplete[] = [];

  form: FormGroup;
  requirementsForm: FormGroup;
  requirements: any | ProjectDetailByIdResponse[] = [];
  projectId: number = 0;
  editMode: boolean = false;
  selectedRequirement: any = null;
  selectedRequirementIndex: number | null = null;

  icRemove = IconsService.prototype.getIcon("icDelete");
  icEdit = IconsService.prototype.getIcon("icEdit");

  constructor(
    private _fb: FormBuilder,
    private _projectService: ProjectService,
    private _customerSelectService: CustomerSelectService,
    private _categorySelectService: CategorySelectService,
    private _statusSelectService: StatusSelectService,
    private _alert: AlertService,
    private _route: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    this.initForm();
    this._activatedRoute.params.subscribe((params) => {
      this.projectId = params["projectId"];
    });
  }

  ngOnInit(): void {
    this.listSelectCategory();
    this.listSelectCustomer();
    this.listSelectStatus();

    if (this.projectId > 0) {
      this.projectById(this.projectId);
    }
  }

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
    });

    this.requirementsForm = this._fb.group({
      requirement: ["", [Validators.required]],
      stateId: [0, [Validators.required]],
    });
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

  back() {
    this._route.navigate(["proceso-proyecto"]);
  }

  projectById(projectId: number) {
    this._projectService.projectById(projectId).subscribe((resp) => {
      const startDate = new Date(resp.startDate);
      const endDate = new Date(resp.endDate);

      this.form.reset({
        projectId: resp.projectId,
        internalName: resp.internalName,
        commercialName: resp.commercialName,
        customerId: resp.customerId,
        categoryId: resp.categoryId,
        statusId: resp.statusId,
        startDate: startDate.toISOString().slice(0, 10),
        endDate: endDate.toISOString().slice(0, 10),
      });
      this.requirements = resp.projectDetails;
    });
  }

  selectRequirement(requirement: any, index: number) {
    this.selectedRequirement = requirement;
    this.editMode = true;
    this.selectedRequirementIndex = index;

    this.requirementsForm.patchValue({
      requirement: requirement.requirement,
      stateId: requirement.stateId,
    });
  }

  saveRequirement() {
    if (this.editMode) {
      if (this.selectedRequirementIndex !== null) {
        this.requirements[this.selectedRequirementIndex] = {
          ...this.requirements[this.selectedRequirementIndex],
          ...this.requirementsForm.value,
        };
      }
    } else {
      this.requirements.push(this.requirementsForm.value);
    }

    this.requirementsForm.reset();
    this.editMode = false;
    this.selectedRequirement = null;
    this.selectedRequirementIndex = null;
  }

  removeRequirement(index: number): void {
    this.requirements.splice(index, 1);
  }

  projectSave(): void {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAsTouched();
      });
    }

    const projectId = this.projectId;
    if (projectId > 0) {
      this.projectEdit();
    } else {
      this.projectRegister();
    }
  }

  projectRegister(): void {
    const project: ProjectRequest = {
      internalName: this.form.value.internalName,
      commercialName: this.form.value.commercialName,
      customerId: this.form.value.customerId,
      categoryId: this.form.value.categoryId,
      statusId: this.form.value.statusId,
      startDate: this.form.value.startDate,
      endDate: this.form.value.endDate,
      projectDetails: this.requirements.map((data: any) => ({
        requirement: data.requirement,
        stateId: data.stateId,
      })),
    };

    this._projectService.projectRegister(project).subscribe((resp) => {
      if (resp.isSuccess) {
        this._alert.success("Proyecto registrado", resp.message);
        this._route.navigate(["proceso-proyecto"]);
      } else {
        this._alert.warn("Atención", resp.message);
      }
    });
  }

  projectEdit(): void {
    const project: ProjectUpdateRequest = {
      projectId: this.form.value.projectId,
      internalName: this.form.value.internalName,
      commercialName: this.form.value.commercialName,
      customerId: this.form.value.customerId,
      categoryId: this.form.value.categoryId,
      statusId: this.form.value.statusId,
      startDate: this.form.value.startDate,
      endDate: this.form.value.endDate,
      projectDetails: this.requirements.map((data: any) => ({
        requirement: data.requirement,
        stateId: data.stateId,
      })),
    };

    console.log(project);

    this._projectService.projectEdit(project).subscribe((resp) => {
      if (resp.isSuccess) {
        this._alert.success("Proyecto actualizado", resp.message);
        this._route.navigate(["proceso-proyecto"]);
      } else {
        this._alert.warn("Atención", resp.message);
      }
    });
  }

  getFormattedDate(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }
}
