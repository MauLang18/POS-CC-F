import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LicenseListComponent } from './components/license-list/license-list.component';

const routes: Routes = [
  {
    path: "",
    component: LicenseListComponent,
    data: {
      scrollDisabled: true,
      toolbarShadowEnabled: true,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LicenseRoutingModule { }
