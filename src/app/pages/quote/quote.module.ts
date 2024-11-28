import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { QuoteRoutingModule } from "./quote-routing.module";
import { QuoteListComponent } from "./components/quote-list/quote-list.component";
import { QuoteCreateComponent } from "./components/quote-create/quote-create.component";
import { SharedModule } from "@shared/shared.module";
import { ListTableComponent } from "@shared/components/reusables/list-table/list-table.component";
import { MenuComponent } from "@shared/components/reusables/menu/menu.component";
import { SearchBoxMultipleComponent } from "@shared/components/reusables/search-box-multiple/search-box-multiple.component";
import { ExportExcelComponent } from "@shared/components/reusables/export-excel/export-excel.component";
import { FilterDateRangeYmdComponent } from "@shared/components/reusables/filter-date-range-ymd/filter-date-range-ymd.component";
import { ButtonResetFiltersComponent } from "@shared/components/reusables/button-reset-filters/button-reset-filters.component";
import { SelectAutocompleteComponent } from "@shared/components/reusables/select-autocomplete/select-autocomplete.component";
import { QuoteChangeComponent } from "./components/quote-change/quote-change.component";
import { QuoteReportComponent } from "./components/quote-report/quote-report.component";

@NgModule({
  declarations: [
    QuoteListComponent,
    QuoteCreateComponent,
    QuoteChangeComponent,
    QuoteReportComponent,
  ],
  imports: [
    CommonModule,
    QuoteRoutingModule,
    SharedModule,
    ListTableComponent,
    MenuComponent,
    SearchBoxMultipleComponent,
    ExportExcelComponent,
    FilterDateRangeYmdComponent,
    ButtonResetFiltersComponent,
    SelectAutocompleteComponent,
  ],
})
export class QuoteModule {}
