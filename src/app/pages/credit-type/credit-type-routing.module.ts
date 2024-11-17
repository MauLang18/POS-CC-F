import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreditTypeListComponent } from './components/credit-type-list/credit-type-list.component';

const routes: Routes = [
  {
    path: "",
    component: CreditTypeListComponent,
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
export class CreditTypeRoutingModule { }
