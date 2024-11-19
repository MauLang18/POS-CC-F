import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UnitListComponent } from "./components/unit-list/unit-list.component";

const routes: Routes = [
  {
    path: "",
    component: UnitListComponent,
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
export class UnitRoutingModule {}
