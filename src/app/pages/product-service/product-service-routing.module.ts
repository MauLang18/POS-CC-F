import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductServiceListComponent } from "./components/product-service-list/product-service-list.component";

const routes: Routes = [
  {
    path: "",
    component: ProductServiceListComponent,
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
export class ProductServiceRoutingModule {}
