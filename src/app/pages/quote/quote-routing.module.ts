import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { QuoteListComponent } from "./components/quote-list/quote-list.component";
import { QuoteCreateComponent } from "./components/quote-create/quote-create.component";

const routes: Routes = [
  {
    path: "",
    component: QuoteListComponent,
    data: {
      scrollDisabled: true,
      toolbarShadowEnabled: true,
    },
  },
  {
    path: "crear",
    component: QuoteCreateComponent,
  },
  {
    path: "crear/:quoteId",
    component: QuoteCreateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuoteRoutingModule {}
