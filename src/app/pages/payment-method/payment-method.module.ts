import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PaymentMethodRoutingModule } from "./payment-method-routing.module";
import { PaymentMethodListComponent } from "./components/payment-method-list/payment-method-list.component";
import { PaymentMethodManageComponent } from "./components/payment-method-manage/payment-method-manage.component";
import { SharedModule } from "@shared/shared.module";
import { ListTableComponent } from "@shared/components/reusables/list-table/list-table.component";
import { SearchBoxMultipleComponent } from "@shared/components/reusables/search-box-multiple/search-box-multiple.component";
import { MenuComponent } from "@shared/components/reusables/menu/menu.component";
import { ExportExcelComponent } from "@shared/components/reusables/export-excel/export-excel.component";
import { FilterDateRangeYmdComponent } from "@shared/components/reusables/filter-date-range-ymd/filter-date-range-ymd.component";
import { ButtonResetFiltersComponent } from "@shared/components/reusables/button-reset-filters/button-reset-filters.component";
import { SelectAutocompleteComponent } from "@shared/components/reusables/select-autocomplete/select-autocomplete.component";

@NgModule({
  declarations: [PaymentMethodListComponent, PaymentMethodManageComponent],
  imports: [
    CommonModule,
    PaymentMethodRoutingModule,
    SharedModule,
    ListTableComponent,
    SearchBoxMultipleComponent,
    MenuComponent,
    ExportExcelComponent,
    FilterDateRangeYmdComponent,
    ButtonResetFiltersComponent,
    SelectAutocompleteComponent,
  ],
})
export class PaymentMethodModule {}
