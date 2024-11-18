import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LicenseRoutingModule } from './license-routing.module';
import { SelectAutocompleteComponent } from '@shared/components/reusables/select-autocomplete/select-autocomplete.component';
import { ButtonResetFiltersComponent } from '@shared/components/reusables/button-reset-filters/button-reset-filters.component';
import { FilterDateRangeYmdComponent } from '@shared/components/reusables/filter-date-range-ymd/filter-date-range-ymd.component';
import { ExportExcelComponent } from '@shared/components/reusables/export-excel/export-excel.component';
import { MenuComponent } from '@shared/components/reusables/menu/menu.component';
import { SearchBoxMultipleComponent } from '@shared/components/reusables/search-box-multiple/search-box-multiple.component';
import { ListTableComponent } from '@shared/components/reusables/list-table/list-table.component';
import { SharedModule } from '@shared/shared.module';
import { LicenseManageComponent } from './components/license-manage/license-manage.component';
import { LicenseListComponent } from './components/license-list/license-list.component';


@NgModule({
  declarations: [
    LicenseManageComponent,
    LicenseListComponent
  ],
  imports: [
    CommonModule,
    LicenseRoutingModule,
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
export class LicenseModule { }
