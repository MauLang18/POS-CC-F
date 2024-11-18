import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PaymentMethodListComponent } from "./components/payment-method-list/payment-method-list.component";

const routes: Routes = [
  {
    path: "",
    component: PaymentMethodListComponent,
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
export class PaymentMethodRoutingModule {}
