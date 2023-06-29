import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReservationsComponent } from './table-mgmt/reservations/reservations.component';
import { TablesComponent } from './table-mgmt/tables/tables.component';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { TableMgmtComponent } from './table-mgmt/table-mgmt.component';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonCellRendererComponent } from './shared/button-cell-renderer/button-cell-renderer.component';
import { AddModifyReservationComponent } from './table-mgmt/reservations/add-modify-reservation/add-modify-reservation.component';
import { AddModifyTableComponent } from './table-mgmt/tables/add-modify-table/add-modify-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MultiSelectModule } from 'primeng/multiselect';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [
    AppComponent,
    ReservationsComponent,
    TablesComponent,
    TableMgmtComponent,
    ButtonCellRendererComponent,
    AddModifyReservationComponent,
    AddModifyTableComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbNavModule,
    AgGridModule,
    ReactiveFormsModule,
    NgbModule,
    MultiSelectModule,
    SweetAlert2Module.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
