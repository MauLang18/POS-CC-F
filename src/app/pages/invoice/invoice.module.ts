import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvoiceListComponent } from './components/invoice-list/invoice-list.component';
import { InvoiceManageComponent } from './components/invoice-manage/invoice-manage.component';


@NgModule({
  declarations: [
    InvoiceListComponent,
    InvoiceManageComponent
  ],
  imports: [
    CommonModule,
    InvoiceRoutingModule
  ]
})
export class InvoiceModule { }
