import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { VoucherTypeListComponent } from "./components/voucher-type-list/voucher-type-list.component";

const routes: Routes = [
  {
    path: "",
    component: VoucherTypeListComponent,
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
export class VoucherTypeRoutingModule {}
