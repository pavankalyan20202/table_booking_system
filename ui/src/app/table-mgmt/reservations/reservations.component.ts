import { Component, ViewChild } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';
import { Observable } from 'rxjs';
import { CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddModifyReservationComponent } from './add-modify-reservation/add-modify-reservation.component';
import { ButtonCellRendererComponent } from 'src/app/shared/button-cell-renderer/button-cell-renderer.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent {

  public rowData$!: Observable<any[]>;
  gridOptions: any;
  public columnDefs: ColDef[] = [
    { field: 'id', width: 100},
    { field: 'customerName', width:250},
    { field: 'reservationDate', width: 250 },
    { field: 'actions', width: 200, 
    cellRenderer: ButtonCellRendererComponent, 
    cellRendererParams: {
      clicked: function(data:any, that:any) {
        Swal.fire({
          title: 'Do you want to cancel this reservation?',
          showDenyButton: false,
          showCancelButton: true,
          confirmButtonText: 'Yes',
          denyButtonText: 'No',
          customClass: {
            actions: 'my-actions',
            cancelButton: 'order-1 right-gap',
            confirmButton: 'order-2',
            denyButton: 'order-3',
          }
        }).then((result) => {
          if (result.isConfirmed) {
            //delete'
            that.cancelReservation(data).subscribe((_res:any)=>{
              that.rowData$ = that.reservService.getAllReservations();
              Swal.fire('Cancellation Successful!', '', 'success')
            }, (_err:any)=>{
              Swal.fire('Failed Cancellation', '', 'error')
            })
          } 
        })
      }
    }
  },
    { field: 'tableBooked', width: 300}
  ];

  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

   // For accessing the Grid's API
   @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  

  constructor(private reservService:ReservationService, 
    private http: HttpClient,
    private modalService: NgbModal) {
      this.gridOptions = {
        context: {
            componentParent: this
        }
    };
  }

  // Example load data from server
  onGridReady(params: GridReadyEvent) {
    //this.rowData$ = this.http.get<any[]>('https://www.ag-grid.com/example-assets/row-data.json');
   this.rowData$ = this.reservService.getAllReservations();
  }

  // Example of consuming Grid Event
  onCellClicked( e: CellClickedEvent): void {
    console.log('cellClicked', e);
  }

  // Example using Grid's API
  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }

  newReservation(){
    const modalRef = this.modalService.open(AddModifyReservationComponent);
		modalRef.componentInstance.completeEmitter.subscribe((_res:any)=>{
      this.rowData$ = this.reservService.getAllReservations();
      modalRef.close();

    })
  }

  cancelReservation(data:any){
    return this.reservService.delete(data.id);
  }

}
