import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreditTypeRoutingModule } from './credit-type-routing.module';
import { CreditTypeManageComponent } from './components/credit-type-manage/credit-type-manage.component';
import { CreditTypeListComponent } from './components/credit-type-list/credit-type-list.component';
import { SharedModule } from '@shared/shared.module';
import { ListTableComponent } from '@shared/components/reusables/list-table/list-table.component';
import { SearchBoxMultipleComponent } from '@shared/components/reusables/search-box-multiple/search-box-multiple.component';
import { MenuComponent } from '@shared/components/reusables/menu/menu.component';
import { ExportExcelComponent } from '@shared/components/reusables/export-excel/export-excel.component';
import { FilterDateRangeYmdComponent } from '@shared/components/reusables/filter-date-range-ymd/filter-date-range-ymd.component';
import { ButtonResetFiltersComponent } from '@shared/components/reusables/button-reset-filters/button-reset-filters.component';
import { SelectAutocompleteComponent } from '@shared/components/reusables/select-autocomplete/select-autocomplete.component';


@NgModule({
  declarations: [
    CreditTypeManageComponent,
    CreditTypeListComponent
  ],
  imports: [
    CommonModule,
    CreditTypeRoutingModule,
    SharedModule,
    ListTableComponent,
    SearchBoxMultipleComponent,
    MenuComponent,
    ExportExcelComponent,
    FilterDateRangeYmdComponent,
    ButtonResetFiltersComponent,
    SelectAutocompleteComponent,
  ]
})
export class CreditTypeModule { }