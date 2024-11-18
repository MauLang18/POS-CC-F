import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ProductServiceRoutingModule } from "./product-service-routing.module";
import { ProductServiceListComponent } from "./components/product-service-list/product-service-list.component";
import { ProductServiceManageComponent } from "./components/product-service-manage/product-service-manage.component";
import { SharedModule } from "@shared/shared.module";
import { ListTableComponent } from "@shared/components/reusables/list-table/list-table.component";
import { SearchBoxMultipleComponent } from "@shared/components/reusables/search-box-multiple/search-box-multiple.component";
import { MenuComponent } from "@shared/components/reusables/menu/menu.component";
import { ExportExcelComponent } from "@shared/components/reusables/export-excel/export-excel.component";
import { FilterDateRangeYmdComponent } from "@shared/components/reusables/filter-date-range-ymd/filter-date-range-ymd.component";
import { ButtonResetFiltersComponent } from "@shared/components/reusables/button-reset-filters/button-reset-filters.component";
import { SelectAutocompleteComponent } from "@shared/components/reusables/select-autocomplete/select-autocomplete.component";
import { ImgSelectorComponent } from "@shared/components/reusables/img-selector/img-selector.component";

@NgModule({
  declarations: [ProductServiceListComponent, ProductServiceManageComponent],
  imports: [
    CommonModule,
    ProductServiceRoutingModule,
    SharedModule,
    ListTableComponent,
    SearchBoxMultipleComponent,
    MenuComponent,
    ExportExcelComponent,
    FilterDateRangeYmdComponent,
    ButtonResetFiltersComponent,
    SelectAutocompleteComponent,
    ImgSelectorComponent,
  ],
})
export class ProductServiceModule {}
