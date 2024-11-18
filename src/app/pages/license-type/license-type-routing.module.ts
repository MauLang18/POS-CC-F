import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LicenseTypeListComponent } from "./components/license-type-list/license-type-list.component";

const routes: Routes = [
  {
    path: "",
    component: LicenseTypeListComponent,
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
export class LicenseTypeRoutingModule {}
