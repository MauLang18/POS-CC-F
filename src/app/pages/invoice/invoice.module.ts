import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { InvoiceRoutingModule } from "./invoice-routing.module";
import { InvoiceListComponent } from "./components/invoice-list/invoice-list.component";
import { InvoiceManageComponent } from "./components/invoice-manage/invoice-manage.component";
import { SharedModule } from "@shared/shared.module";
import { ListTableComponent } from "@shared/components/reusables/list-table/list-table.component";
import { SearchBoxMultipleComponent } from "@shared/components/reusables/search-box-multiple/search-box-multiple.component";
import { MenuComponent } from "@shared/components/reusables/menu/menu.component";
import { ExportExcelComponent } from "@shared/components/reusables/export-excel/export-excel.component";
import { FilterDateRangeYmdComponent } from "@shared/components/reusables/filter-date-range-ymd/filter-date-range-ymd.component";
import { ButtonResetFiltersComponent } from "@shared/components/reusables/button-reset-filters/button-reset-filters.component";
import { SelectAutocompleteComponent } from "@shared/components/reusables/select-autocomplete/select-autocomplete.component";
import { InvoiceReportComponent } from "./components/invoice-report/invoice-report.component";

@NgModule({
  declarations: [
    InvoiceListComponent,
    InvoiceManageComponent,
    InvoiceReportComponent,
  ],
  imports: [
    CommonModule,
    InvoiceRoutingModule,
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
export class InvoiceModule {}
