import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TemplateTypeListComponent } from "./components/template-type-list/template-type-list.component";

const routes: Routes = [
  {
    path: "",
    component: TemplateTypeListComponent,
    data: {
      scrollDisabled: true,
      toolbarShadowEnabled: true,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TemplateTypeRoutingModule {}
