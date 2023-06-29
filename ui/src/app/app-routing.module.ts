import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationsComponent } from './table-mgmt/reservations/reservations.component';
import { TablesComponent } from './table-mgmt/tables/tables.component';
import { TableMgmtComponent } from './table-mgmt/table-mgmt.component';

const routes: Routes = [
  {
    path:'',
    component: TableMgmtComponent,
    children: [
      {
        path: '',
        component: ReservationsComponent
      },
      {
        path: 'reservations',
        component: ReservationsComponent
      },
      {
        path: 'tables',
        component: TablesComponent
      }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
