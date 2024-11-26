import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProjectListComponent } from "./components/project-list/project-list.component";
import { ProjectCreateComponent } from "./components/project-create/project-create.component";

const routes: Routes = [
  {
    path: "",
    component: ProjectListComponent,
    data: {
      scrollDisabled: true,
      toolbarShadowEnabled: true,
    },
  },
  {
    path: "crear",
    component: ProjectCreateComponent,
  },
  {
    path: "crear/:projectId",
    component: ProjectCreateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectRoutingModule {}
